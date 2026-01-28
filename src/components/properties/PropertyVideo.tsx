// "use client";

// import { IProperty } from "@/app/types/Properties";

// interface Props {
//   property: IProperty;
// }

// export default function PropertyVideos({ property }: Props) {
//   if (!property.videos.length) return null;

//   return (
//     <section className="py-10">
//       <h2 className="text-2xl font-semibold mb-4">Property Videos</h2>
//       <div className="flex flex-col gap-4">
//         {property.videos.map((video) => (
//           <video key={video._id} controls className="w-full max-w-lg rounded">
//             <source src={video.url} type="video/mp4" />
//           </video>
//         ))}
//       </div>
//     </section>
//   );
// }