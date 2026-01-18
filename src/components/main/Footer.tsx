"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-purple-50 pt-20 pb-5 relative">
      <div className="max-w-7xl mx-auto px-5 xl:px-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[320px_320px_1fr_1fr] gap-10">
        {/* Column 1: Logo + Mission + Socials */}
        <div className="flex flex-col gap-5">
          <div className="w-35 h-35 relative">
            <Image
              src="/footer_logo.png"
              alt="Philz Properties Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Your trusted partner in real estate. Delivering exceptional service
            and expert guidance to help you find your dream property.
          </p>
          <div className="mt-10">
            <h4 className="text-2xl font-semibold mb-3">
              Follow Us on Social Media
            </h4>
            <div className="flex gap-5">
              {[
                {
                  href: "#",
                  icon: (
                    <Facebook
                      className="w-8 h-8 text-purple-500 hover:text-purple-800"
                      strokeWidth={1}
                    />
                  ),
                },
                {
                  href: "#",
                  icon: (
                    <Twitter
                      className="w-8 h-8 text-purple-500 hover:text-purple-800"
                      strokeWidth={1}
                    />
                  ),
                },
                {
                  href: "#",
                  icon: (
                    <Instagram
                      className="w-8 h-8 text-purple-500 hover:text-purple-800"
                      strokeWidth={1}
                    />
                  ),
                },
                {
                  href: "#",
                  icon: (
                    <Linkedin
                      className="w-8 h-8 text-purple-500 hover:text-purple-800"
                      strokeWidth={1}
                    />
                  ),
                },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  aria-label={`Follow us on ${social.href}`}
                  className="hover:text-purple-700 transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Address + Customer Care + Email */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-2xl font-semibold mb-5">Address</h4>
            <div className="flex items-center gap-5">
              <MapPin className="w-10 h-10 text-purple-700" strokeWidth={1} />
              <address className="not-italic text-gray-700 text-lg leading-relaxed">
                Ewet Housing Estate, Akwa Ibom, Nigeria
              </address>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <h4 className="text-2xl font-semibold mb">Emails</h4>
            <div className="flex items-center gap-5">
              <Mail className="w-10 h-10 mt-1 text-purple-700" strokeWidth={1} />
              <div className="flex flex-col items-start gap-3">
                <Link
                  href="mailto:contact@philzproperties.com"
                  className="text-gray-700 text-lg leading-relaxed hover:text-purple-700 transition-colors"
                >
                  contact@philzproperties.com
                </Link>
                <Link
                  href="mailto:support@philzproperties.com"
                  className="text-gray-700 text-lg leading-relaxed hover:text-purple-700 transition-colors"
                >
                  support@philzproperties.com
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <h4 className="text-2xl font-semibold">Call Line</h4>
            <div className="flex items-center gap-5">
              <Phone className="w-10 h-10 mt-1 text-purple-700" strokeWidth={1} />
              <div className="flex flex-col items-start gap-3">
                <Link
                  href="tel:+1234567890"
                  className="text-gray-700 text-lg leading-relaxed hover:text-purple-700 transition-colors"
                >
                  +1 234-567-890
                </Link>
                <Link
                  href="tel:+1234567890"
                  className="text-gray-700 text-lg leading-relaxed hover:text-purple-700 transition-colors"
                >
                  +1 234-567-890
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Pages */}
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl font-semibold mb-5">Pages</h4>
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/properties", label: "Properties" },
          ].map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="mb-5 text-gray-700 text-lg leading-relaxed hover:text-purple-700 transition-colors"
            >
              {page.label}
            </Link>
          ))}
        </div>

        {/* Column 4: Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl font-semibold mb-5">Quick Links</h4>
          {[
            { href: "/faqs", label: "FAQs" },
            { href: "/terms-of-use", label: "Terms of Use" },
            { href: "/privacy-policy", label: "Privacy Policy" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mb-5 text-gray-700 text-lg leading-relaxed hover:text-purple-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-200 pt-4  px-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {currentYear} Philz Properties. All rights reserved.</p>
        <Link
          href="https://kmini-tech.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-700 transition-colors"
        >
          By Kmini Technologies
        </Link>
      </div>
    </footer>
  );
}