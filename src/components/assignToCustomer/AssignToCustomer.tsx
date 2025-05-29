import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AssignToCustomerDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[516px] sm:rounded-[16px] sm:px-8 sm:py-8 px-4 py-6 gap-6 sm:gap-8 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-[20px] font-semibold text-[#1C1C36]">
            Assign to Customer
          </DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm text-[#1C1C36]">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter Email"
              className="h-[48px] rounded-md border border-[#E4E4E7] placeholder:text-muted-foreground text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="firstName" className="text-sm text-[#1C1C36]">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Enter Name"
                className="h-[48px] rounded-md border border-[#E4E4E7] placeholder:text-muted-foreground text-sm"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="lastName" className="text-sm text-[#1C1C36]">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Enter Last Name"
                className="h-[48px] rounded-md border border-[#E4E4E7] placeholder:text-muted-foreground text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-sm text-[#1C1C36]">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="+1-XXX-XXX-XXXX"
              className="h-[48px] rounded-md border border-[#E4E4E7] placeholder:text-muted-foreground text-sm"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[48px] rounded-md bg-[#403C89] text-white hover:bg-[#2f2e78]"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
