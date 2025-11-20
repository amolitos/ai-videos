import { Skeleton } from "@/components/ui/skeleton";

export const CreatorsListSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-72 rounded-xl mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};
