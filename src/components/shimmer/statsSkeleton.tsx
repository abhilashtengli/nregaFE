import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Shimmer animation component
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
  />
);

export default function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Users Card Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Shimmer className="h-4 w-20 sm:w-24" />
          </CardTitle>
          <Shimmer className="h-4 w-4 rounded" />
        </CardHeader>
        <CardContent>
          <Shimmer className="h-8 w-12 sm:w-16 mb-2" />
          <Shimmer className="h-3 w-24 sm:w-32" />
        </CardContent>
      </Card>

      {/* Pending Requests Card Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Shimmer className="h-4 w-24 sm:w-32" />
          </CardTitle>
          <Shimmer className="h-4 w-4 rounded" />
        </CardHeader>
        <CardContent>
          <Shimmer className="h-8 w-12 sm:w-16 mb-2" />
          <Shimmer className="h-3 w-28 sm:w-36" />
        </CardContent>
      </Card>

      {/* Verified Users Card Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Shimmer className="h-4 w-24 sm:w-28" />
          </CardTitle>
          <Shimmer className="h-4 w-4 rounded" />
        </CardHeader>
        <CardContent>
          <Shimmer className="h-8 w-12 sm:w-16 mb-2" />
          <Shimmer className="h-3 w-20 sm:w-28" />
        </CardContent>
      </Card>
    </div>
  );
}
