import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";
import Link from "next/link";

const FilterCategory = async () => {
  const categories = await db.category.findMany();

  return (
    <div className="bg-stone-600 h-16 w-full flex justify-center">
      <Carousel className="flex items-center justify-center w-fit">
        <CarouselPrevious />
        <CarouselContent className="max-w-7xl">
          {categories.map((category: Category) => (
            <CarouselItem key={category.id} className="basis-1/6">
              <Link href={`/${category.name}`}>
                <Button variant="orange" className="w-full h-8">
                  {category.name}
                </Button>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FilterCategory;
