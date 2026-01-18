"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export default function GetInTouch() {
  return (
    <div className="">
      <h2 className="text-4xl font-light font-lora text-black mb-6">
        Get In Touch
      </h2>

      <p className="text-gray-700 text-lg font-roboto mb-8">
        Have questions, feedback or just want to say hello? Fill out the contact
        form, and we'll get back to you as soon as possible.
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <h4 className="text-2xl mb-5">Reach Us</h4>
          <div className="flex items-center gap-5">
            <MapPin className="w-10 h-10 text-purple-700" strokeWidth={1} />
            <address className="not-italic text-gray-700 text-lg leading-relaxed">
              Ewet Housing Estate, Akwa Ibom, Nigeria
            </address>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <h4 className="text-2xl mb">Drop a Mail</h4>
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
          <h4 className="text-2xl">Call Us</h4>
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
      <div className="mt-10">
        <h4 className="text-2xl mb-3">Follow Us</h4>
        <div className="flex gap-6">
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
  );
}