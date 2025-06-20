import type { VehicleResponse } from "@/api/schemas";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import ImageGalleryModal from "./ImageGalleryModal";

interface Props {
  selectedVehicle: VehicleResponse | null;
}

export function VehiclesImagesCarousel({ selectedVehicle }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = selectedVehicle?.images!?.length > 1;

  return (
    <>
      <div className="w-full max-w-lg mx-auto my-6 relative">
        <Carousel>
          <CarouselContent className="ml-0 px-2">
            {selectedVehicle?.images?.map((img, index) => (
              <CarouselItem
                key={img.id}
                className="basis-full shrink-0 grow-0 px-6 transition-all"
              >
                <Card className="rounded-xl overflow-hidden border border-muted bg-background">
                  <CardContent className="p-0">
                    <img
                      src={img.image_url}
                      alt="Vehicle"
                      className="w-full h-[260px] sm:h-[220px] object-cover rounded-xl"
                      onClick={() => {
                        setActiveIndex(index);
                        setOpen(true);
                      }}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {hasMultipleImages && (
            <>
              <CarouselPrevious className="left-1" />
              <CarouselNext className="right-1" />
            </>
          )}
        </Carousel>
      </div>

      <ImageGalleryModal
        open={open}
        onOpenChange={setOpen}
        images={selectedVehicle?.images || []}
        initialIndex={activeIndex}
      />
    </>
  );
}
