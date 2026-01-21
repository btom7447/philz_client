"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import AOS from "aos";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useAuthStore } from "app/store/useAuthStore";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  const [nextPage, setNextPage] = useState("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPage(params.get("next") || "/");
  }, []);


  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Logged in successfully!");
        // Save user to zustand store
        setUser(data.user);
        router.push(nextPage);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-lg mx-auto p-5"
      aria-labelledby="login-heading"
    >
      {/* Heading */}
      <div data-aos="fade-down" className="mb-10 text-center">
        <h1
          id="login-heading"
          className="text-black text-5xl font-light font-lora mb-3"
        >
          Welcome Back!
        </h1>
        <p className="text-gray-700 text-lg font-roboto">
          Securely access your verified property and continue your journey with
          confidence.
        </p>
      </div>

      {/* Email Input */}
      <div data-aos="fade-up" data-aos-delay="100" className="mb-4">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <div className="flex items-center border border-gray-600 rounded-lg p-4 focus-within:ring-1 focus-within:ring-purple-800 transition focus-within:border-0">
          <Mail className="text-gray-500 mr-2 w-6 h-6" />
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            className="w-full outline-none font-roboto text-black text-xl"
          />
        </div>
      </div>

      {/* Password Input */}
      <div data-aos="fade-up" data-aos-delay="200" className="mb-4">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="flex items-center border border-gray-600 rounded-lg p-4 focus-within:ring-1 focus-within:ring-purple-800 transition focus-within:border-0">
          <Lock className="text-gray-500 mr-2 w-6 h-6" />
          <input
            id="password"
            type={showPassword ? "text" : "password"} // <-- toggle type
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            className="w-full outline-none font-roboto text-black text-xl"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="flex items-center justify-between mb-6"
      >
        <label className="flex items-center text-gray-700 text-md font-roboto cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2 w-4 h-4 accent-purple-800"
          />
          Remember Me
        </label>
        <Link
          href="/forgot-password"
          className="text-purple-800 font-roboto hover:underline text-md"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`bg-purple-800 text-xl text-white p-5 rounded-lg font-roboto transition-all duration-300 hover:bg-purple-600 flex items-center justify-center ${
          loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {loading ? <ClipLoader color="#fff" size={24} /> : "Login"}
      </button>

      {/* Signup Link */}
      <p
        data-aos="fade-up"
        data-aos-delay="500"
        className="mt-5 text-center font-roboto text-gray-700 text-md"
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-md text-purple-800 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
