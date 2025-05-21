import { cn } from "@/lib/utils";

interface SimpleTooltipProps {
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function SimpleTooltip({
  label,
  side = "right",
  className = "",
}: SimpleTooltipProps) {
  const base =
    "absolute z-50 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300";

  const sidePosition = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover:translate-y-[-4px]",
    bottom:
      "top-full left-1/2 -translate-x-1/2 mt-2 group-hover:translate-y-[4px]",
    left: "right-full top-1/2 -translate-y-1/2 mr-2 group-hover:translate-x-[-4px]",
    right:
      "left-full top-1/2 -translate-y-1/2 ml-2 group-hover:translate-x-[4px]",
  };

  return (
    <span className={cn(base, sidePosition[side], className)}>{label}</span>
  );
}
