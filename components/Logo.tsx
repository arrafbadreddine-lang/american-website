import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "full";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", variant = "dark", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Friendly, Welcoming Culinary Mascot Emblem */}
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-amber-400 via-brand-500 to-rose-500 p-[2px] shadow-md shadow-brand-500/20 group-hover:scale-105 group-hover:shadow-brand-500/30 transition-all duration-300 flex items-center justify-center shrink-0`}
      >
        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Warm Inner Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-50 to-orange-50/50" />
          
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-brand-600 relative z-10 group-hover:rotate-6 transition-transform duration-300"
          >
            {/* Friendly Smiling Chef Hat with Sparkle */}
            <path
              d="M10 18C8.5 18 7 16.5 7 14.5C7 12.8 8.1 11.4 9.6 11.1C9.4 10.4 9.3 9.7 9.3 9C9.3 6.2 11.5 4 14.3 4C15.4 4 16.4 4.4 17.2 5C18 4.4 19 4 20.1 4C22.9 4 25.1 6.2 25.1 9C25.1 9.7 25 10.4 24.8 11.1C26.3 11.4 27.4 12.8 27.4 14.5C27.4 16.5 25.9 18 24.4 18H10Z"
              fill="url(#hatGradient)"
              stroke="#ea580c"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <rect
              x="9.5"
              y="18"
              width="15"
              height="4.5"
              rx="2.2"
              fill="#ea580c"
            />
            {/* Friendly Smile */}
            <path
              d="M14 24.5C15.2 26 18.8 26 20 24.5"
              stroke="#c2410c"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="12" cy="24" r="1" fill="#fb7185" />
            <circle cx="22" cy="24" r="1" fill="#fb7185" />
            {/* Spark */}
            <path
              d="M26 4.5L26.7 6.3L28.5 7L26.7 7.7L26 9.5L25.3 7.7L23.5 7L25.3 6.3L26 4.5Z"
              fill="#f59e0b"
            />

            <defs>
              <linearGradient id="hatGradient" x1="7" y1="4" x2="27" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fffbeb" />
                <stop offset="1" stopColor="#fed7aa" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Full Domain Name Brand Typography */}
      <div className="flex flex-col">
        <div
          className={`font-display font-black tracking-tight ${textClasses[size]} ${
            variant === "light" ? "text-white" : "text-slate-900"
          } transition-colors leading-none flex items-center`}
        >
          Fork<span className="text-brand-600">Savvy</span><span className="text-sage-900 font-extrabold ml-0.5">Recipes</span>
          <span className="text-brand-500 font-extrabold text-xs ml-0.5 opacity-90">.com</span>
        </div>
        <div
          className={`text-[9px] tracking-widest uppercase font-extrabold mt-1 flex items-center gap-1 ${
            variant === "light" ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <span>Tested American Recipes</span>
          <span className="text-brand-500">•</span>
          <span>Zero Fluff</span>
        </div>
      </div>
    </Link>
  );
}
