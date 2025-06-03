import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

type AddNewUserProps = {
  title: string
};

export default function AddNewUserDialog({title}: AddNewUserProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-[40px] w-[143px] px-[18px] py-[10px] rounded-[8px] gap-[6px] my-4 mb-5 flex items-center">
          <Plus size={16} />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form action=""></form>
      </DialogContent>
    </Dialog>
  );
}
