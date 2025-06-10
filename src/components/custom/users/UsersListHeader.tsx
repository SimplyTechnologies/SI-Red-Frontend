import { useEffect, useState } from "react";
import SearchBar from "@/components/custom/customers/SearchBar";
import UserFormDialog from "@/components/assignToCustomerCreateUserDialog/FormDialog";
import UserForm from "@/components/assignToCustomerCreateUserDialog/Form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useCreateUserWithToast } from "@/hooks/useCreateUserWithToast";
import { toast } from "@/hooks/use-toast";

type Props = {
  search: string;
  setSearch: (val: string) => void;
};

export default function UsersListHeader({ search, setSearch }: Props) {
  const { userFormOpen, setUserFormOpen } = useUserStore();
  const [externalErrors, setExternalErrors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (userFormOpen) {
      setExternalErrors({});
    }
  }, [userFormOpen]);

  const createUserMutation = useCreateUserWithToast();

  return (
    <div className="flex justify-between items-center">
      <SearchBar search={search} setSearch={setSearch} />
      <Button
        onClick={() => setUserFormOpen(true)}
        className="h-[40px] w-[143px] px-[18px] py-[10px] rounded-[8px] gap-[6px] my-4 mb-5 flex items-center"
      >
        <Plus size={16} />
        Add New User
      </Button>
      <UserFormDialog
        open={userFormOpen}
        onOpenChange={setUserFormOpen}
        title={"Add New User"}
      >
        <UserForm
          onSubmit={(data) => {
            createUserMutation.mutate(
              { data },
              {
                onError: (error: any) => {
                  const response = error?.data;
                  const rawFieldErrors = response?.errors;

                  if (Array.isArray(rawFieldErrors)) {
                    const mappedErrors: Record<string, string> = {};
                    rawFieldErrors.forEach((err: any) => {
                      if (err?.path && err?.msg) {
                        mappedErrors[err.path] = err.msg;
                      }
                    });

                    if (Object.keys(mappedErrors).length > 0) {
                      setExternalErrors(mappedErrors);
                      return;
                    }
                  }

                  toast({
                    title: "User creation failed",
                    description: response?.message || "Something went wrong",
                    variant: "destructive",
                  });
                },
              }
            );
          }}
          externalErrors={externalErrors}
          submitLabel="Save"
        />
      </UserFormDialog>
    </div>
  );
}
