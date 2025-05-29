import { Input } from "@/components/ui/input";
import SearchIcon from "@/assets/icons/search.svg?react";
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex w-full items-center mb-5">
      <div className="flex items-center h-[42px] w-[327px] border border-[#DBDDE1] rounded-[8px] px-2.5 pl-6 bg-white">
        <SearchIcon className="mr-2 min-w-[16px] text-[#858C98] w-4 h-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search..."
          className="w-full border-0 p-0 text-sm text-[#192252] placeholder:text-[#858C98] focus-visible:ring-0 focus-visible:outline-none"
        />
      </div>
    </div>
  );
}
