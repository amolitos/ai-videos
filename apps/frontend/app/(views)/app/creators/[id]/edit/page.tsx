import { Suspense } from "react";
import { CreatorFormWrapper } from "@/components/private/creators/CreatorFormWrapper";
import { CreatorFormSkeleton } from "@/components/private/creators/CreatorFormSkeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCreatorPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="h-screen min-w-0 flex flex-col py-12 px-20">
      <Suspense fallback={<CreatorFormSkeleton />}>
        <CreatorFormWrapper creatorId={id} />
      </Suspense>
    </div>
  );
}
