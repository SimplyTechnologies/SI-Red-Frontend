export function getUserStatus(status: string) {
  return status === "Pending"
    ? "bg-[#FFF8E0] text-[#F2A626]"
    : "bg-[#E5FAF5] text-[#04B78A]";
}
