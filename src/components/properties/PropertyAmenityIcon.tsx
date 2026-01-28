import { FC, ReactElement, cloneElement } from "react";
import { AMENITY_ICONS } from "@/app/utils/icons";
import { Sparkle } from "lucide-react";

interface Props {
  amenity: string;
  size?: number; // optional, default
}

const PropertyAmenityIcon: FC<Props> = ({ amenity, size = 15 }) => {
  const lower = amenity.toLowerCase();

  // find matching amenity
  const matched = Object.values(AMENITY_ICONS).find(({ keywords }) =>
    keywords.some((k) => lower.includes(k)),
  );

  // cast matched.icon to ReactElement with size prop
  const icon: ReactElement = matched?.icon ? (
    cloneElement(
      matched.icon as ReactElement<{ size?: number; strokeWidth?: number }>,
      { size },
    )
  ) : (
    <Sparkle size={size} strokeWidth={1} />
  );

  return (
    <div
      className="flex items-center gap-2 text-base text-gray-500"
      title={amenity}
    >
      <span className="text-purple-700">{icon}</span>
      <span className="capitalize text-lg">{amenity}</span>
    </div>
  );
};

export default PropertyAmenityIcon;