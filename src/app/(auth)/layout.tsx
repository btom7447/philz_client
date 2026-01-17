import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden flex flex-col md:flex-row">
      {/* Left column: fixed image */}
      <div
        className="hidden md:flex flex-3 bg-cover bg-center"
        style={{ backgroundImage: "url('/auth/auth-bg.jpg')" }}
      />

      {/* Right column: auth content */}
      <div className="flex flex-2 items-center justify-center p-5 bg-white w-full ">
        {children}
      </div>
    </div>
  );
} 