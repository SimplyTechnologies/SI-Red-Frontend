import type { VehicleImageResponse } from "@/api/schemas";

type Props = {
  imageIcon: VehicleImageResponse;
  status: string;
};

export default function VehicleImageIcon({ imageIcon, status }: Props) {
  const borderColor =
    status.toLowerCase() === "in stock" ? "#0DCF89" : "#23A1E9";

  return (
    <div
      className="h-[48px] w-[48px] rounded-full overflow-hidden shrink-0"
      style={{ border: `3px solid ${borderColor}` }}
    >
      <img
        src={imageIcon.image_url}
        alt="Vehicle thumbnail"
        className="object-cover w-full h-full"
      />
    </div>
  );
}
