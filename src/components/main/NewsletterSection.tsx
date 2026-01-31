"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    // Placeholder: Add real submission logic later
    setEmail("");
  };

  return (
    <section className="w-full my-28">
      <div className="max-w-3xl mx-auto px-5 xl:px-0 text-center">
        {/* Title */}
        <h2 className="text-4xl font-lora font-light text-black mb-3">
          Subscribe our Newsletter
        </h2>
        {/* Subtext */}
        <h6 className="text-xl text-gray-600 mb-10">
          We don't send spam so don't worry
        </h6>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 bg-white rounded-lg flex flex-col sm:flex-row items-center overflow-hidden"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 placeholder-gray-400 bg-transparent border-none focus:outline-none rounded-lg border p-4 font-roboto text-black text-xl outline-none
            transition focus-within:ring-purple-800 focus-within:border-0"
          />
          <button
            type="submit"
            className="px-12 py-4 rounded-lg bg-purple-700 text-white text-xl  hover:bg-purple-800 transition cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}