export function getUserStatus(status: boolean) {
  return status
    ? "bg-[#E5FAF5] text-[#04B78A]" // Activated
    : "bg-[#FFF8E0] text-[#F2A626]"; // Pending
}
