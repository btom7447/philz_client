import {
  LayoutDashboard,
  Home,
  Map,
  Users,
  MessageSquareQuote,
  Mail,
  CreditCard,
  Settings,
  Calendar,
} from "lucide-react";

export const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Home },
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
