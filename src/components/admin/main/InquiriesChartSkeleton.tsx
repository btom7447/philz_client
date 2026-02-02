"use client";

const InquiriesChartSkeleton = () => {
  const slices = [0, 120, 240]; // 3 slices

  return (
    <div className="rounded-xl border p-4 flex flex-col items-center">
      <h3 className="mb-4 font-semibold bg-muted h-6 w-1/2 rounded animate-pulse"></h3>
      <div className="relative w-64 h-64 rounded-full overflow-hidden">
        {slices.map((rotate, i) => (
          <div
            key={i}
            className="bg-muted absolute top-0 left-0 w-full h-full origin-center animate-pulse"
            style={{
              clipPath: "polygon(50% 50%, 100% 0, 100% 100%)",
              transform: `rotate(${rotate}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InquiriesChartSkeleton;