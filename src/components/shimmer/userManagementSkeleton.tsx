import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Shimmer animation component
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
  />
);

// Custom shimmer animation keyframes (add to your global CSS)
const shimmerStyles = `
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
`;

// Skeleton row component for table
const SkeletonTableRow = () => (
  <TableRow>
    <TableCell className="font-medium">
      <Shimmer className="h-4 w-24 sm:w-32" />
    </TableCell>
    <TableCell>
      <Shimmer className="h-4 w-32 sm:w-48" />
    </TableCell>
    <TableCell>
      <Shimmer className="h-6 w-16 sm:w-20 rounded-full" />
    </TableCell>
    <TableCell>
      <Shimmer className="h-4 w-20 sm:w-28" />
    </TableCell>
    <TableCell className="text-right">
      <div className="flex items-center justify-end gap-2">
        <Shimmer className="h-8 w-16 sm:w-20 rounded-md" />
        <Shimmer className="h-8 w-16 sm:w-20 rounded-md" />
      </div>
    </TableCell>
  </TableRow>
);

// Single tab skeleton for verified users (only revoke button)
const SkeletonVerifiedTableRow = () => (
  <TableRow>
    <TableCell className="font-medium">
      <Shimmer className="h-4 w-24 sm:w-32" />
    </TableCell>
    <TableCell>
      <Shimmer className="h-4 w-32 sm:w-48" />
    </TableCell>
    <TableCell>
      <Shimmer className="h-6 w-16 sm:w-20 rounded-full" />
    </TableCell>
    <TableCell>
      <Shimmer className="h-4 w-20 sm:w-28" />
    </TableCell>
    <TableCell className="text-right">
      <Shimmer className="h-8 w-24 sm:w-32 rounded-md" />
    </TableCell>
  </TableRow>
);

export default function UserManagementSkeleton() {
  return (
    <>
      {/* Add shimmer styles to head */}
      <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />

      <Card>
        <CardHeader>
          <CardTitle>
            <Shimmer className="h-6 w-32 sm:w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="pending"
                className="flex items-center gap-2 cursor-default pointer-events-none"
              >
                <Shimmer className="h-4 w-4 rounded" />
                <Shimmer className="h-4 w-16 sm:w-20" />
              </TabsTrigger>
              <TabsTrigger
                value="verified"
                className="flex items-center gap-2 cursor-default pointer-events-none"
              >
                <Shimmer className="h-4 w-4 rounded" />
                <Shimmer className="h-4 w-16 sm:w-20" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Shimmer className="h-4 w-12 sm:w-16" />
                      </TableHead>
                      <TableHead>
                        <Shimmer className="h-4 w-12 sm:w-16" />
                      </TableHead>
                      <TableHead>
                        <Shimmer className="h-4 w-20 sm:w-24" />
                      </TableHead>
                      <TableHead>
                        <Shimmer className="h-4 w-12 sm:w-16" />
                      </TableHead>
                      <TableHead className="text-right">
                        <Shimmer className="h-4 w-16 sm:w-20 ml-auto" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Generate 5 skeleton rows for pending users */}
                    {Array.from({ length: 5 }).map((_, index) => (
                      <SkeletonTableRow key={`pending-${index}`} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="verified" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Shimmer className="h-4 w-12 sm:w-16" />
                      </TableHead>
                      <TableHead>
                        <Shimmer className="h-4 w-12 sm:w-16" />
                      </TableHead>
                      <TableHead>
                        <Shimmer className="h-4 w-20 sm:w-24" />
                      </TableHead>
                      <TableHead>
                        <Shimmer className="h-4 w-12 sm:w-16" />
                      </TableHead>
                      <TableHead className="text-right">
                        <Shimmer className="h-4 w-16 sm:w-20 ml-auto" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Generate 3 skeleton rows for verified users */}
                    {Array.from({ length: 3 }).map((_, index) => (
                      <SkeletonVerifiedTableRow key={`verified-${index}`} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
