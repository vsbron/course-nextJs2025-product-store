import { Suspense } from "react";

import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/FeaturedProducts";

import Hero from "@/components/home/Hero";

function HomePage() {
  // Returned JSX
  return (
    <main>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

export default HomePage;
