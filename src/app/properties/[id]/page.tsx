import Breadcrumb from "@/components/main/Breadcrumb";
import PropertyDetailsClient from ".";
import { IProperty } from "@/app/types/Properties";

interface Props {
  params: Promise<{ id: string }>; // unwrap this
}

export const metadata = {
  title: "Property Details | Philz Properties",
  description:
    "View detailed information about this property on Philz Properties, including price, location, features, and amenities to help you make the right decision.",
};

const getPropertyById = async (id: string): Promise<IProperty> => {
  const res = await fetch(
    `https://philz-server.onrender.com/api/properties/${id}`,
    { cache: "no-store" },
  );
  return res.json();
};

export default async function PropertyDetailsPage({ params }: Props) {
  const { id } = await params; // unwrap the Promise

  const property = await getPropertyById(id);

  return (
    <>
      <Breadcrumb
        title={property.title}
        current={property.title}
        parent={{
          label: "Properties",
          href: "/properties",
        }}
        backgroundImage="/breadcrumb/listing.jpg"
      />
      <div className="w-full">
        <PropertyDetailsClient property={property} />
      </div>
    </>
  );
}
