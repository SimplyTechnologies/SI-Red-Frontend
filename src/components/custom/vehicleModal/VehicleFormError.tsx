export function VehicleFormError({ data }: { data: string }) {
  return (
    <p
      className={`text-xs text-red-500 mt-1 transition-opacity duration-200 h-[16px] ${
        data ? "opacity-100" : "opacity-0"
      }`}
    >
      {data || "⠀"}
    </p>
  );
}
