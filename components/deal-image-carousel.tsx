import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const DealImageCarousel = ({ imageUrls }) => {
  return (
    <Carousel>
      <CarouselContent>
        {imageUrls.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-64"></div>
            <Image
              src={imageUrl}
              alt={`Deal Image ${index}`}
              fill
              objectFit="contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default DealImageCarousel;
