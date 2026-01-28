// "use client";

// import { IProperty } from "@/app/types/Properties";

// interface Props {
//   property: IProperty;
// }

// export default function PropertyFloorPlans({ property }: Props) {
//   if (!property?.floorPlans.length) return null;

//   return (
//     <section className="py-10">
//       <h2 className="text-2xl font-semibold mb-4">Floor Plans</h2>
//       <div className="flex gap-4 overflow-x-auto">
//         {property?.floorPlans.map((plan) => (
//           <img
//             key={plan?._id}
//             src={plan.url}
//             alt="Floor Plan"
//             className="w-64 h-48 object-cover rounded"
//           />
//         ))}
//       </div>
//     </section>
//   );
// }
