"use client";

const TourChartSkeleton = () => {
  const bars = [1, 2, 3, 4, 5, 6];

  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 font-semibold bg-muted h-6 w-1/3 rounded animate-pulse"></h3>
      <div className="relative w-full h-64 flex items-end gap-2 mt-4">
        {bars.map((_, i) => (
          <div
            key={i}
            className="bg-muted animate-pulse rounded-sm"
            style={{
              width: `${100 / bars.length - 5}%`,
              height: `${30 + i * 20}px`, // fixed scaling but in skeleton style
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TourChartSkeleton;