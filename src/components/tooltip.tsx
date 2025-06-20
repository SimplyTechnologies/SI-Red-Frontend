import { cn } from "@/lib/utils";

interface SimpleTooltipProps {
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "reversed";
}

export default function SimpleTooltip({
  label,
  side = "right",
  className = "",
  children,
  variant = "default",
}: SimpleTooltipProps) {
  const base =
    "absolute z-50 whitespace-nowrap rounded-[10px] px-3 py-2 text-sm text-white bg-[#3F328C] shadow-md pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200";

  const sidePosition = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover:translate-y-[-4px]",
    bottom:
      "top-full left-1/2 -translate-x-1/2 mt-2 group-hover:translate-y-[4px]",
    left: "right-full top-1/2 -translate-y-1/2 mr-2 group-hover:translate-x-[-4px]",
    right:
      "left-full top-1/2 -translate-y-1/2 ml-2 group-hover:translate-x-[4px]",
  };

  const variantStyles =
    variant === "reversed"
      ? "bg-white text-heading"
      : "bg-[#3F328C] text-white";

  return (
    <div className="relative group inline-block">
      {children}
      <span className={cn(base, sidePosition[side], variantStyles, className)}>{label}</span>
    </div>
  );
}
