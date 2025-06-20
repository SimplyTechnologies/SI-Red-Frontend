import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { VehicleImageResponse } from "@/api/schemas";
import { DialogDescription } from "@radix-ui/react-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: VehicleImageResponse[];
  initialIndex: number;
}

export default function ImageGalleryModal({
  open,
  onOpenChange,
  images,
  initialIndex,
}: Props) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    if (open) setCurrent(initialIndex);
  }, [initialIndex, open]);

  const prev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const next = () => {
    setCurrent((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      

      <DialogContent className="w-full max-w-[100vw] max-h-[100vh] bg-black/60 border-none text-white p-0 overflow-hidden rounded-none">
      <DialogTitle />
        <div className="relative w-full h-screen flex items-center justify-center">
          <img
            src={images[current].image_url}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain"
          />

          {images.length > 1 && current > 0 && (
            <button
              onClick={prev}
              className="absolute left-2 sm:left-6 text-white hover:bg-black/80 p-2 sm:p-3 rounded-full z-50"
            >
              <ChevronLeft size={32} />
            </button>
          )}
          {images.length > 1 && current < images.length - 1 && (
            <button
              onClick={next}
              className="absolute right-2 sm:right-6 text-white hover:bg-black/80 p-2 sm:p-3 rounded-full z-50"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
