"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import { User, Mail, Smartphone, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import "./input.css";
import { ClipLoader } from "react-spinners";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, subject, message }),
          },
        );
      setLoading(false);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to send message");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full"
    >
      {/* Full Name */}
      <div data-aos="fade-up" className="mb-4 col-span-2">
        <div className="flex items-center border border-gray-600 rounded-lg p-4 focus-within:ring-1 focus-within:ring-purple-800 transition">
          <User className="text-gray-500 mr-2 w-6 h-6" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full outline-none font-roboto text-black text-xl"
          />
        </div>
      </div>

      {/* Email */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="mb-4 col-span-2 xl:col-span-1"
      >
        <div className="flex items-center border border-gray-600 rounded-lg p-4 focus-within:ring-1 focus-within:ring-purple-800 transition">
          <Mail className="text-gray-500 mr-2 w-6 h-6" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full outline-none font-roboto text-black text-xl"
          />
        </div>
      </div>

      {/* Phone */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="mb-4 z-20 col-span-2 xl:col-span-1"
      >
        <div
          className=" relative
            flex items-center
            border border-gray-600 rounded-lg py-2 px-4
            focus-within:ring-1 focus-within:ring-purple-800
            transition focus-within:border-0
          "
        >
          <PhoneInput
            defaultCountry="ng"
            value={phone}
            onChange={setPhone}
            inputProps={{
              required: true,
              placeholder: "Phone Number",
            }}
            className="phone-input flex items-center w-full"
            inputClassName="
              w-full outline-none font-roboto text-black text-xl bg-transparent
            "
            countrySelectorStyleProps={{
              buttonClassName:
                "phone-input flex items-center gap-2 pr-3 mr-3 border-r border-gray-300 shrink-0",
            }}
          />
        </div>
      </div>

      {/* Subject */}
      <div data-aos="fade-up" data-aos-delay="300" className="mb-4 col-span-2">
        <div className="flex items-center border border-gray-600 rounded-lg p-4 focus-within:ring-1 focus-within:ring-purple-800 transition">
          <MessageSquare className="text-gray-500 mr-2 w-6 h-6" />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full outline-none font-roboto text-black text-xl"
          />
        </div>
      </div>

      {/* Message */}
      <div data-aos="fade-up" data-aos-delay="400" className="mb-6 col-span-2">
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="w-full border border-gray-600 rounded-lg p-4 outline-none font-roboto text-black text-xl focus:ring-1 focus:ring-purple-800 transition"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`col-span-2 bg-purple-800 text-xl text-white p-5 rounded-lg font-roboto transition-all duration-300 hover:bg-purple-600 flex items-center justify-center ${
          loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {loading ? <ClipLoader color="#fff" size={24} /> : "Send Message"}
      </button>
    </form>
  );
}