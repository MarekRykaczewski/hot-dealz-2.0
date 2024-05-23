"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Deal } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SearchItem from "./search-item";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("api/deals/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm }),
        });

        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.deals);
        } else {
          console.error("Error searching deals:", res.statusText);
        }
      } catch (error) {
        console.error("Error searching deals:", error);
      }
    };

    if (debouncedSearchTerm) {
      fetchDeals();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, searchTerm]);

  return (
    <div className="relative">
      <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-slate-500" />
      <Input
        className="sm:focus:w-fit w-[70vw] sm:w-fit rounded-full px-9 transition-all duration-100"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      {searchResults.length > 0 && (
        <div className="absolute z-10 bg-white mt-1 py-1 rounded-md shadow-lg w-full">
          {searchResults.map((deal: Deal) => (
            <SearchItem key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
