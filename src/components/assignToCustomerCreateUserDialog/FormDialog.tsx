import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export default function FormDialog({
  open,
  onOpenChange,
  title,
  children,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogDescription>
        <DialogContent className="w-full max-w-[516px] sm:rounded-lg sm:px-8 sm:py-8 px-4 py-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-heading">
              {title}
            </DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
