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
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const threshold = documentHeight / 2 - windowHeight / 2;
      setIsVisible(scrollTop > threshold);

      setShowScrollTop(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToPage = (page: number) => {
    router.push(`/?page=${page}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
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

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 p-2 bg-blue-600 text-white rounded-full shadow-lg transition-opacity duration-300"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default DealsPagination;
