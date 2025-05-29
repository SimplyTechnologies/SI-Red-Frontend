import { Skeleton } from "@/components/ui/skeleton";

export default function VehiclesTabListSkeleton() {
    return (
        <div className="w-full py-5 flex justify-between gap-2 border-b">
            <div className="flex w-3/4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="ml-3 space-y-2 flex flex-col justify-center">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-40 h-4" />
                    <Skeleton className="w-48 h-4" />
                </div>
            </div>
            <div className="flex items-start w-1/3 md:w-1/5 justify-between">
                <Skeleton className="w-16 h-6 rounded-md" />
                <Skeleton className="w-6 h-6 rounded-full" />
            </div>
        </div>
    );
}
