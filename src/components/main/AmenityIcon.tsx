import { FC } from "react";
import { AMENITY_ICONS } from "@/app/utils/icons";
import { HelpCircle } from "lucide-react";

interface Props {
  amenity: string;
}

const AmenityIcon: FC<Props> = ({ amenity }) => {
  const lower = amenity.toLowerCase();

  // find the first key whose keywords match
  const matched = Object.values(AMENITY_ICONS).find(({ keywords }) =>
    keywords.some((k) => lower.includes(k)),
  );

  const icon = matched?.icon ?? <HelpCircle size={18} strokeWidth={1} />;

  return (
    <div
      className="flex items-center gap-2 text-base text-gray-500"
      title={amenity}
    >
      <span className="text-purple-700">{icon}</span>
      <span className="capitalize">{amenity}</span>
    </div>
  );
};

export default AmenityIcon;