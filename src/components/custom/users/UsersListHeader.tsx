import SearchBar from "@/components/custom/customers/SearchBar";
import UserFormDialog from "@/components/assignToCustomerCreateUserDialog/FormDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserForm from "@/components/assignToCustomerCreateUserDialog/Form";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";

export default function UsersListHeader () {
    const [search, setSearch] = useState("");
    const { userFormOpen, setUserFormOpen } = useUserStore();

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
              onSubmit={() => {
                setUserFormOpen(false);
              }}
              submitLabel="Save"
            />
          </UserFormDialog>
        </div>
    )
}
