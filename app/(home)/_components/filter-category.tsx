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

const FilterCategory = async () => {
  const categories = await db.category.findMany();

  return (
    <div className="bg-stone-600 w-full flex justify-center">
      <Carousel className="flex items-center w-fit py-2">
        <CarouselPrevious />
        <CarouselContent>
          {categories.map((category: Category) => (
            <CarouselItem key={category.id} className="basis-1/6">
              <Button variant="orange" className="w-full">
                {category.name}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FilterCategory;
