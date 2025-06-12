import { Button } from "@/components/ui/button";

export default function ExpiredLinkScreen() {
  return (
    <div className="flex flex-col py-24">
      <h2
        className="font-bold text-2xl md:text-[36px] leading-[1.2] font-dm-sans mb-[50px]"
        style={{
          maxWidth: "269px",
          letterSpacing: "0px",
          textTransform: "none",
          color: "#192252",
        }}
      >
        Link Expired
      </h2>
      <p className="mb-6 text-[#192252] font-[14px] mb-[53px]">
        The link you followed has expired, or you might not have a permission.
      </p>
      <Button
        type="submit"
        className="w-full h-[56px] text-[18px] bg-[#3E368E] hover:bg-[#2F2B6A]"
        onClick={() => (window.location.href = "/")}
      >
        Continue to Dealer Desk
      </Button>
    </div>
  );
}
