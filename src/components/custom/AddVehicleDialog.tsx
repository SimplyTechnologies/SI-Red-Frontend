import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import VehicleFormBody from "./vehicleModal/VehicleFormBody";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

export function AddVehicleDialog({ open, onOpenChange, title }: Props) {

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
      }}
    >
      <DialogDescription>
        <DialogContent className="h-[95vh] max-h-[800px] overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] bg-white rounded-[12px] px-[24px] py-[20px] shadow-md">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-bold text-center text-heading font-dm-sans">
              {title} Vehicle
            </DialogTitle>
          </DialogHeader>
          <VehicleFormBody onSuccess={() => onOpenChange(false)} title={title} />
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
