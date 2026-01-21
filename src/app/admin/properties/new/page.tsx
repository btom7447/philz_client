import PropertyFormWrapper from "@/components/admin/properties/PropertyFormWrapper";

export const metadata = {
  title: "Add Property | Admin | Philz Properties",
  description: "Fill out the form below to add a new property listing.",
};

export default function AddPropertyPage() {
  return <PropertyFormWrapper mode="create" />;
}