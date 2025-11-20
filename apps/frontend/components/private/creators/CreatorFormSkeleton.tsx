import { Skeleton } from "@/components/ui/skeleton";

export const CreatorFormSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-8 w-full rounded-xl" />
      <Skeleton className="h-4 w-72 rounded-xl mt-8" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-72 rounded-xl mt-3" />
      <Skeleton className="h-52 w-full" />
      <Skeleton className="h-4 w-72 rounded-xl mt-3" />
      <Skeleton className="h-52 w-full" />
    </div>
  );
};
