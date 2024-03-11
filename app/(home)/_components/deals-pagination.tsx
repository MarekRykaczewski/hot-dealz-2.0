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

interface DealsPaginationProps {
  currentPage: number;
  totalPages: number;
}

const DealsPagination = ({ currentPage, totalPages }: DealsPaginationProps) => {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <Pagination>
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
