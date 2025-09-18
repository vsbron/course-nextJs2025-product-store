"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  // Returned JSX
  return (
    <section className="grid md:grid-cols-2 gap-4 mt-6">
      <ReviewLoadingCartComponent />
    </section>
  );
}

function ReviewLoadingCartComponent() {
  // Returned JSX
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center p-3 pt-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-[150px] h-4 mb-2" />
            <Skeleton className="w-[150px] h-4" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default loading;
