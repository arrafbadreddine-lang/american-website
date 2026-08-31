"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Mail, Heart, Sparkles } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & US Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" variant="light" />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              America's high-speed recipe engine. Zero-fluff instructions, instant portion scaling, USDA-verified nutrition facts, and restaurant copycats tested for real weeknight kitchens.
            </p>

            {/* US Newsletter signup box */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Get 15-Minute Dinners & Copycats Weekly
              </span>
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>You're in! Check your inbox for top US dinners.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 max-w-sm"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 flex-1"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Popular Appliances */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Appliances
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/categories/air-fryer" className="hover:text-brand-400 transition-colors">
                  Air Fryer Dinners
                </Link>
              </li>
              <li>
                <Link href="/categories/ninja-creami" className="hover:text-brand-400 transition-colors">
                  Ninja Creami Pints
                </Link>
              </li>
              <li>
                <Link href="/categories/sheet-pan" className="hover:text-brand-400 transition-colors">
                  Sheet Pan Meals
                </Link>
              </li>
              <li>
                <Link href="/categories/slow-cooker" className="hover:text-brand-400 transition-colors">
                  Crockpot & Slow Cooker
                </Link>
              </li>
              <li>
                <Link href="/meal-planner" className="hover:text-brand-400 transition-colors">
                  Weekly Meal Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Diets & Macros */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Macros & Goals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/categories/high-protein" className="hover:text-brand-400 transition-colors">
                  High-Protein (35g+)
                </Link>
              </li>
              <li>
                <Link href="/categories/gluten-free" className="hover:text-brand-400 transition-colors">
                  100% Gluten-Free
                </Link>
              </li>
              <li>
                <Link href="/categories/keto-low-carb" className="hover:text-brand-400 transition-colors">
                  Keto & Low Carb
                </Link>
              </li>
              <li>
                <Link href="/categories/under-3-dollars" className="hover:text-brand-400 transition-colors">
                  Dinners Under $3
                </Link>
              </li>
              <li>
                <Link href="/categories/15-minute-meals" className="hover:text-brand-400 transition-colors">
                  15-Minute Meals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              About & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-brand-400 transition-colors font-medium">
                  About Our Test Kitchen
                </Link>
              </li>
              <li>
                <Link href="/editorial-guidelines" className="hover:text-brand-400 transition-colors">
                  Editorial Guidelines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-400 transition-colors">
                  Privacy Policy (CCPA/GDPR)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-400 transition-colors">
                  Terms & Allergen Disclaimers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} ForkSavvy Media LLC. All rights reserved.
          </div>
          <div className="text-center sm:text-right max-w-lg text-[11px] text-slate-600">
            Restaurant trademarks (Chipotle, Chick-fil-A, Panera, Starbucks, Olive Garden, In-N-Out) belong to their respective owners. Recipes are independent culinary recreations.
          </div>
        </div>
      </div>
    </footer>
  );
}
