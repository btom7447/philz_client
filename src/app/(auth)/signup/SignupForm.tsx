"use client";

import "./input.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AOS from "aos";
import {
  Mail,
  Lock,
  User,
  Smartphone,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password validation state
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false,
    number: false,
  });

  // Show checklist only after user types something
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  // Update validations on password change
  useEffect(() => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const number = /[1-9]/.test(password);

    setValidations({ length, uppercase, lowercase, special, number });
    setShowChecklist(password.length > 0); // show checklist if password is typed
  }, [password]);

  const passwordStrength = Object.values(validations).filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordStrength < 4) {
      toast.error("Password does not meet all requirements.");
      return;
    }

    setLoading(true);
    try {
          const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, password }),
        },
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to create account");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong. Try again.");
    }
  };

  const validationItem = (label: string, valid: boolean) => (
    <div className="flex items-center gap-2 text-sm mb-1">
      {valid ? (
        <Check className="text-green-500 w-4 h-4" />
      ) : (
        <X className="text-red-500 w-4 h-4" />
      )}
      <span
        className={`font-roboto ${valid ? "text-green-500" : "text-red-500"}`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-lg mx-auto p-5"
      aria-labelledby="signup-heading"
    >
      {/* Heading */}
      <div data-aos="fade-down" className="mb-10 text-center">
        <h1
          id="signup-heading"
          className="text-black text-5xl font-light font-lora mb-3"
        >
          Create Your Account
        </h1>
        <p className="text-gray-700 text-lg font-roboto">
          Join a trusted platform where property verification meets
          transparency.
        </p>
      </div>

      {/* Name Input */}
      <div data-aos="fade-up" data-aos-delay="100" className="mb-4">
        <div className="flex items-center border border-gray-600 rounded-lg p-4 focus-within:ring-1 focus-within:ring-purple-800 transition focus-within:border-0">
          <User className="text-gray-500 mr-2 w-6 h-6" />
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full outline-none font-roboto text-black text-xl"
          />
        </div>
      </div>

      {/* Email Input */}
      <div data-aos="fade-up" data-aos-delay="200" className="mb-4">
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

    {/* Phone Input */}
      <div data-aos="fade-up" data-aos-delay="300" className="mb-4 z-20">
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

      {/* Password Input */}
      <div data-aos="fade-up" data-aos-delay="400" className="mb-2 z-1">
        <div className="flex items-center border border-gray-600 rounded-lg p-4 focus-within:ring-1 focus-within:ring-purple-800 transition focus-within:border-0">
          <Lock className="text-gray-500 mr-2 w-6 h-6" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

      {/* Password checklist (accordion) */}
      <div
        className={`overflow-hidden transition-all duration-300 mt-2 ${
          showChecklist ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {validationItem("At least 1 number", validations.number)}
        {validationItem("minimum of 8 characters", validations.length)}
        {validationItem("At least 1 uppercase letter", validations.uppercase)}
        {validationItem("At least 1 lowercase letter", validations.lowercase)}
        {validationItem("At least 1 special character", validations.special)}
      </div>

      {/* Password strength bar */}
      <div
        className={`mb-10 mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden transition-all duration-300 ${
          showChecklist ? "opacity-100 max-h-2" : "opacity-0 max-h-0"
        }`}
      >
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            passwordStrength <= 1
              ? "w-1/4 bg-red-500"
              : passwordStrength === 2
                ? "w-1/2 bg-yellow-400"
                : passwordStrength === 3
                  ? "w-3/4 bg-blue-500"
                  : "w-full bg-green-500"
          }`}
        ></div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`bg-purple-800 text-xl text-white p-5 rounded-lg font-roboto transition-all duration-300 hover:bg-purple-600 flex items-center justify-center ${
          loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {loading ? <ClipLoader color="#fff" size={24} /> : "Sign Up"}
      </button>

      {/* Login Link */}
      <p className="mt-5 text-center font-roboto text-gray-700 text-md">
        Already have an account?{" "}
        <Link href="/login" className="text-md text-purple-800 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}