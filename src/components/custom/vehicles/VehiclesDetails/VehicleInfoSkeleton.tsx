import { Skeleton } from "@/components/ui/skeleton";

export default function VehicleInfoSkeleton() {
  return (
    <div className="py-5 flex gap-2 w-full">
      <Skeleton className="w-8 h-8 rounded-full" />

      <div className="flex w-[350px]">
        <div className="text-[14px] ml-3 w-full space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-44 h-4" /> 
          <Skeleton className="w-60 h-4" /> 
          <Skeleton className="w-48 h-4" /> 
          <Skeleton className="w-40 h-4" /> 
          <Skeleton className="w-52 h-4" /> 
        </div>
      </div>
    </div>
  );
}
