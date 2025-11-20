import { Suspense } from "react";
import { CreatorFormWrapper } from "@/components/private/creators/CreatorFormWrapper";
import { CreatorFormSkeleton } from "@/components/private/creators/CreatorFormSkeleton";

export default async function NewCreatorPage() {
  return (
    <div className="h-screen min-w-0 flex flex-col py-12 px-20">
      <Suspense fallback={<CreatorFormSkeleton />}>
        <CreatorFormWrapper />
      </Suspense>
    </div>
  );
}
