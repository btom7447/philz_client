// "use client";

// import { useMemo } from "react";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import { useInquiries } from "@/app/admin/hooks/useAdminData";
// import InquiriesChartSkeleton from "../main/InquiriesChartSkeleton";

// const InquiriesPieChart = () => {
//   const { data, isLoading } = useInquiries();

//   type PieDataItem = {
//     name: string;
//     value: number;
//   };

//   const chartData: PieDataItem[] = useMemo(() => {
//     if (!data) return [];
//     return data.map((i) => ({ name: i.title || "Inquiry", value: 1 }));
//   }, [data]);

//   if (isLoading) return <InquiriesChartSkeleton />;

//   const COLORS = ["#4B5563", "#6B7280", "#9CA3AF", "#D1D5DB"]; // gray tones

//   return (
//     <div className="rounded-xl border p-4">
//       <h3 className="mb-4 font-semibold">Inquiries Overview</h3>
//       <div style={{ height: 260 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={chartData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               fill="#4B5563"
//             >
//               {chartData.map((_: PieDataItem, index: number) => (
//                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default InquiriesPieChart;