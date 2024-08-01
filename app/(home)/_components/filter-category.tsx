"use client";
import { Category } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

const FilterCategory = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sort_by = searchParams.get("sort_by");

  const ref = useRef<HTMLDivElement | null>(null);

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams({
      category: categoryName,
      sort_by: sort_by || "",
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const categoriesMap = categories
    ? categories.map((category) => (
        <button
          className="flex text-md leading-6 gap-1 h-10 min-w-fit px-6 items-center justify-center bg-orange-600 rounded-lg text-white font-semibold hover:bg-orange-500 transition"
          key={category.name}
          onClick={() => handleCategoryClick(category.name)}
        >
          {category.name}
        </button>
      ))
    : null;

  const onScrollLeftClick = () => scroll(-150);
  const onScrollRightClick = () => scroll(150);

  return (
    <>
      <div className="flex items-center justify-center w-full mx-auto">
        <button
          onClick={onScrollLeftClick}
          className="flex item-center justify-center p-2"
        >
          <ArrowLeft fontSize="1.5em" className="text-white" />
        </button>
        <div
          ref={ref}
          className="flex flex-row w-fit overflow-x-hidden scroll-smooth gap-4 p-1"
        >
          {categoriesMap}
        </div>
        <button
          onClick={onScrollRightClick}
          className="flex item-center justify-center p-2"
        >
          <ArrowRight fontSize="1.5em" className="text-white" />
        </button>
      </div>
    </>
  );
};

export default FilterCategory;
