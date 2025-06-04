export function getUserStatus(status: string) {
  const statusStyles: Record<string, string> = {
    Pending: "bg-[#FFF8E0] text-[#F2A626]",
    Activated: "bg-[#E5FAF5] text-[#04B78A]",
  };

  return statusStyles[status] || "bg-gray-100 text-gray-500"; // default fallback
}
