"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DealsPaginationProps {
  currentPage: number;
  totalPages: number;
}

const DealsPagination = ({ currentPage, totalPages }: DealsPaginationProps) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const threshold = documentHeight / 2 - windowHeight / 2;
      setIsVisible(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToPage = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <Pagination
      className={`fixed bottom-0 left-0 right-0 border-t py-2 bg-white z-10 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <PaginationContent>
        <PaginationItem>
          <button
            onClick={() => {
              if (currentPage > 1) goToPage(currentPage - 1);
            }}
          >
            <PaginationPrevious href="#" />
          </button>
        </PaginationItem>

        {[...Array(totalPages).keys()].map((index) => (
          <PaginationItem key={index}>
            <button onClick={() => goToPage(index + 1)}>
              <PaginationLink href="#" isActive={currentPage === index + 1}>
                {index + 1}
              </PaginationLink>
            </button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <button
            onClick={() => {
              if (currentPage < totalPages) goToPage(currentPage + 1);
            }}
          >
            <PaginationNext href="#" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DealsPagination;
