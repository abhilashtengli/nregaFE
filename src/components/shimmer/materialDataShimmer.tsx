// Shimmer animation component
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
  />
);

// Compact skeleton row
const CompactSkeletonRow = () => (
  <tr className="h-12">
    <td className="w-16 px-3 py-2">
      <Shimmer className="h-3 w-3 rounded" />
    </td>
    <td className="w-64 px-3 py-2">
      <Shimmer className="h-3 w-40" />
    </td>
    <td className="w-24 px-3 py-2">
      <Shimmer className="h-3 w-12" />
    </td>
    <td className="w-32 px-3 py-2">
      <Shimmer className="h-6 w-full rounded-md" />
    </td>
    <td className="w-48 px-3 py-2">
      <Shimmer className="h-6 w-full rounded-md" />
    </td>
    <td className="w-48 px-3 py-2">
      <Shimmer className="h-6 w-full rounded-md" />
    </td>
    <td className="w-48 px-3 py-2">
      <Shimmer className="h-6 w-full rounded-md" />
    </td>
  </tr>
);

export default function MaterialDataSkeleton() {
  return (
    <div className="space-y-3">
      {/* Compact Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
        <div className="space-y-1">
          <Shimmer className="h-3 w-16" />
          <Shimmer className="h-8 w-full rounded-md" />
        </div>
        <div className="space-y-1">
          <Shimmer className="h-3 w-14" />
          <Shimmer className="h-8 w-full rounded-md" />
        </div>
      </div>

      {/* Compact Select All */}
      <div className="flex items-center space-x-2">
        <Shimmer className="h-3 w-3 rounded" />
        <Shimmer className="h-3 w-32" />
      </div>

      {/* Compact Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50">
              <tr className="h-10">
                <th className="w-16 px-3 py-2">
                  <Shimmer className="h-3 w-8" />
                </th>
                <th className="w-64 px-3 py-2">
                  <Shimmer className="h-3 w-12" />
                </th>
                <th className="w-24 px-3 py-2">
                  <Shimmer className="h-3 w-12" />
                </th>
                <th className="w-32 px-3 py-2">
                  <Shimmer className="h-3 w-10" />
                </th>
                <th className="w-48 px-3 py-2">
                  <div className="space-y-1">
                    <Shimmer className="h-3 w-24" />
                    <Shimmer className="h-6 w-full rounded-md" />
                  </div>
                </th>
                <th className="w-48 px-3 py-2">
                  <div className="space-y-1">
                    <Shimmer className="h-3 w-24" />
                    <Shimmer className="h-6 w-full rounded-md" />
                  </div>
                </th>
                <th className="w-48 px-3 py-2">
                  <div className="space-y-1">
                    <Shimmer className="h-3 w-28" />
                    <Shimmer className="h-6 w-full rounded-md" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Generate 5 compact skeleton rows */}
              {Array.from({ length: 5 }).map((_, index) => (
                <CompactSkeletonRow key={`compact-material-${index}`} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compact Submit Button */}
      <div className="flex justify-center pt-3">
        <Shimmer className="h-8 w-48 rounded-md" />
      </div>
    </div>
  );
}
