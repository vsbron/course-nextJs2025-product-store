import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";
import hero4 from "@/public/images/hero4.jpg";

// Create an array of images
const carouselImages = [hero1, hero2, hero3, hero4];

// The Hero carousel component
function HeroCarousel() {
  // Returned JSX
  return (
    <div className="hidden lg:block ">
      <Carousel>
        <CarouselPrevious />
        <CarouselContent>
          {carouselImages.map((image, i) => (
            <CarouselItem key={i}>
              <Card>
                <CardContent className="p-2">
                  <Image
                    src={image}
                    alt="Hero"
                    className="w-full h-[24rem] rounded-md object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
