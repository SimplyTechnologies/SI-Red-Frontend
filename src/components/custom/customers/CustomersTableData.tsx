import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Avatar from "@/assets/icons/avatar.svg?react";
import {
  getGetAllCustomersQueryKey,
  useDeleteCustomer,
} from "@/api/customer/customer";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmationDialog from "../ConfirmationDialog";
import { DELETE_TITLE } from "@/constants/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, FileText, Trash2 } from "lucide-react";

interface Vehicle {
  vin: string;
  model: string;
  assignedDate?: string;
}

interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  assignedDate: string;
  vehicles: Vehicle[];
  documents?: Array<{
    id: string;
    name: string;
    fileUrl: string;
    mimeType?: string;
    size?: number;
  }>;
}

function formatDateTime(dateString: string | undefined) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function CustomersTableData({
  customer,
  page,
  setPage,
  totalCustomers,
}: {
  customer: Customer;
  page: number;
  setPage: (page: number) => void;
  totalCustomers: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const extraVehicleCount = customer.vehicles.length - 1;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate: deleteCustomer } = useDeleteCustomer({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Customer deleted",
          description: "Customer deleted.",
          variant: "success",
        });
        if (totalCustomers === 1 && page > 1) {
          setPage(page - 1);
        } else {
          queryClient.invalidateQueries({
            queryKey: getGetAllCustomersQueryKey(),
          });
        }
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete customer.",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setExpanded((prev) => !prev)}
              disabled={extraVehicleCount <= 0}
              className={`transition-transform ${
                expanded ? "rotate-180" : ""
              } ${
                extraVehicleCount <= 0 ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              <ChevronDown />
            </button>
            <Avatar />
            <div>
              <p className="font-bold text-[#192252]">{customer.name}</p>
            </div>
          </div>
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-2">
            <div>
              <p className="text-primary font-medium text-[#192252]">
                {customer.vehicles[0]?.vin ?? "No Vehicle"}
              </p>
              <p className="text-sm">{customer.vehicles[0]?.model ?? "N/A"}</p>
            </div>

            {extraVehicleCount > 0 && (
              <div className="rounded-full bg-[#E8F0FE] text-[#1A73E8] px-2 py-0.5 text-xs font-semibold select-none">
                +{extraVehicleCount}
              </div>
            )}
          </div>
        </TableCell>

        <TableCell>
          {customer.vehicles[0]
            ? formatDateTime(customer.vehicles[0].assignedDate)
            : "N/A"}
        </TableCell>

        <TableCell className="font-bold">{customer.email}</TableCell>
        <TableCell>{customer.phoneNumber}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {/* File viewer icon */}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="hover:bg-accent p-2 rounded-md transition-colors"
                  title="View Documents"
                >
                  <FileText className="text-text-muted opacity-50 hover:text-heading hover:opacity-100 transition duration-300 ease-in-out h-5 w-5" />

                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Customer Documents</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {customer.documents && customer.documents.length > 0 ? (
                    customer.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 bg-accent/50 rounded-md hover:bg-accent"
                      >
                        <div className="flex flex-col overflow-hidden mr-2">
                          <span
                            className="font-medium text-sm truncate"
                            title={doc.name}
                          >
                            {doc.name}
                          </span>
                          {doc.size && (
                            <span className="text-xs text-muted-foreground">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          )}
                        </div>
                        <button
                          onClick={async () => {
                            try {
                              const response = await fetch(doc.fileUrl);

                              if (!response.ok) {
                                throw new Error(
                                  `Download failed with status ${response.status}`
                                );
                              }

                              const contentDisposition = response.headers.get(
                                "Content-Disposition"
                              );
                              const filename =
                                contentDisposition?.match(
                                  /filename="(.+)"/
                                )?.[1] || doc.name;

                              const blob = await response.blob();
                              const url = window.URL.createObjectURL(blob);

                              const link = document.createElement("a");
                              link.href = url;
                              link.download = filename;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              window.URL.revokeObjectURL(url);

                              toast({
                                title: "Download complete",
                                description: `${filename} downloaded successfully.`,
                                variant: "success",
                              });
                            } catch (error) {
                              console.error("Download error:", error);
                              toast({
                                title: "Download failed",
                                description:
                                  "We couldn’t download the file. Please check your internet or try again later.",
                                variant: "destructive",
                              });
                            }
                          }}
                          className="hover:bg-background p-2 rounded-md transition-colors"
                          title="Download file"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No documents available</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>


            {/* Existing delete button */}
            <ConfirmationDialog
              onConfirm={(id) => deleteCustomer({ id })}
              title={`Delete ${DELETE_TITLE.CUSTOMER}`}
              description="Are you sure that you would like to delete this customer? This action cannot be undone."
              open={isOpen}
              onOpenChange={setIsOpen}
              showTrigger={true}
              iconClassName="text-[#FA5087] bg-[#FFE0EA]"
              triggerContent={
                <Trash2 className="text-text-muted opacity-50 hover:text-heading hover:opacity-100 transition duration-300 ease-in-out" />
              }
              onConfirmArgs={[customer.id]}
            />
          </div>
        </TableCell>
      </TableRow>

      {expanded &&
        customer.vehicles.slice(1).map((vehicle) => (
          <TableRow key={vehicle.vin} className="bg-[#F9FAFB] transition-all">
            <TableCell />
            <TableCell>
              <p className="text-primary font-medium">{vehicle.vin}</p>
              <p className="text-sm">{vehicle.model}</p>
            </TableCell>
            <TableCell>{formatDateTime(vehicle.assignedDate)}</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        ))}
    </>
  );
}
