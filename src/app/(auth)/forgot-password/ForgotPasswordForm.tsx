"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import AOS from "aos";
import { Mail } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
          const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success(data.message || "Password reset link sent!");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to send reset link");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-lg mx-auto p-5"
      aria-labelledby="forgot-password-heading"
    >
      <div data-aos="fade-down" className="mb-10 text-center">
        <h1
          id="forgot-password-heading"
          className="text-black text-5xl font-light font-lora mb-3"
        >
          Forgot Password
        </h1>
        <p className="text-gray-700 text-lg font-roboto">
          Enter your email address to receive a password reset link.
        </p>
      </div>

      {/* Email Input */}
      <div data-aos="fade-up" data-aos-delay="100" className="mb-6">
        <div className="flex items-center border border-gray-600 rounded-lg p-4 focus-within:ring-1 focus-within:ring-purple-800 transition focus-within:border-0">
          <Mail className="text-gray-500 mr-2 w-6 h-6" />
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full outline-none font-roboto text-black text-xl"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`bg-purple-800 text-xl text-white p-5 rounded-lg font-roboto transition-all duration-300 hover:bg-purple-600 flex items-center justify-center ${
          loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {loading ? <ClipLoader color="#fff" size={24} /> : "Send Reset Link"}
      </button>
    </form>
  );
}