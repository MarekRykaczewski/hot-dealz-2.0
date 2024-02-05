"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="relative">
      <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-orange-600"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
