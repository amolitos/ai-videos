import { Suspense } from "react";
import { CreatorsList } from "@/components/private/creators/CreatorsList";
import { CreatorsListSkeleton } from "@/components/private/creators/CreatorsListSkeleton";

export default async function AllCreatorsPage() {
  return (
    <div className="min-w-0 py-12 px-20">
      <Suspense fallback={<CreatorsListSkeleton />}>
        <CreatorsList />
      </Suspense>
    </div>
  );
}
