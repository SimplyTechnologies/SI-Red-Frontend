import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AssignToCustomerForm from "./AssignToCustomerForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AssignToCustomerDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogDescription className="sr-only">
        <DialogContent className="w-full max-w-[516px] sm:rounded-lg sm:px-8 sm:py-8 px-4 py-6 gap-6 sm:gap-8 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-center text-lg sm:text-xl font-semibold text-heading">
              Assign to Customer
            </DialogTitle>
          </DialogHeader>
          <AssignToCustomerForm />
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
