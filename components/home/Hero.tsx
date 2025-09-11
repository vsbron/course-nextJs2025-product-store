import Link from "next/link";

import { Button } from "@/components/ui/button";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  // Returned JSX
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground mb-10">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam,
          debitis. Id aut perferendis maiores maxime magni ab quae saepe
          corrupti!
        </p>
        <Button asChild size="lg">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
