import { Building2, Logs, LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Home,
  Calendar,
  Users,
  MessageSquareQuote,
  Mail,
  CreditCard,
  Settings,
  HousePlus,
  CheckCircle,
} from "lucide-react";

export type AdminLink =
  | {
      name: string;
      href: string;
      icon: LucideIcon;
    }
  | {
      name: string;
      icon: LucideIcon;
      children: { name: string; href: string; icon: LucideIcon }[];
    };

export const adminLinks: AdminLink[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Properties",
    icon: Building2,
    children: [
      {
        name: "Manage Properties",
        href: "/admin/properties",
        icon: Logs,
      },
      {
        name: "Add New Property",
        href: "/admin/properties/new",
        icon: HousePlus,
      },
      {
        name: "Sold Properties",
        href: "/admin/properties/sold",
        icon: CheckCircle,
      },
    ],
  },
  { name: "Tours", href: "/admin/tours", icon: Calendar },
  { name: "Users", href: "/admin/users", icon: Users },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  { name: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];