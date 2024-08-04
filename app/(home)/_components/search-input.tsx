"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Deal } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SearchItem from "./search-item";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [showResults, setShowResults] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("api/deals/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm: debouncedSearchTerm }),
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
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-slate-500" />
      <Input
        className="sm:focus:w-fit w-[60vw] sm:w-fit rounded-full px-9 transition-all duration-100"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onFocus={() => {
          if (searchResults.length > 0) {
            setShowResults(true);
          }
        }}
      />
      {showResults && searchResults.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-10 flex flex-col gap-1 items-center bg-white overflow-hidden rounded-md shadow-lg w-full"
        >
          {searchResults.map((deal: Deal) => (
            <SearchItem key={deal.id} deal={deal} />
          ))}
          <Link href={`/search-results?query=${debouncedSearchTerm}`}>
            <Button className="justify-self-center w-4/5 m-2" variant="orange">
              See all results
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
