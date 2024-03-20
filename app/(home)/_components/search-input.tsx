"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Deal } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const router = useRouter();

  const handleDealClick = (dealId: string) => {
    router.push(`/deals/${dealId}`);
  };

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
      <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-orange-600"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults.length > 0 && (
        <ul className="absolute z-10 bg-white mt-1 py-1 rounded-md shadow-lg w-full">
          {searchResults.map((deal: Deal) => (
            <li
              key={deal.id}
              className="px-3 py-2 cursor-pointer"
              onClick={() => handleDealClick(deal.id)}
            >
              {deal.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
