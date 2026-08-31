"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Utensils, Flame, Sparkles, Store, Heart, Menu, X, Calendar, Info } from "lucide-react";
import Logo from "./Logo";
import SavedRecipesDrawer, { useSavedRecipes } from "./SavedRecipesDrawer";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { savedSlugs } = useSavedRecipes();

  const quickLinks = [
    { name: "Air Fryer", href: "/categories/air-fryer", icon: Flame },
    { name: "Chain Copycats", href: "/copycats", icon: Store },
    { name: "High Protein", href: "/categories/high-protein", icon: Sparkles },
    { name: "Meal Planner", href: "/meal-planner", icon: Calendar },
    { name: "All Recipes", href: "/recipes", icon: Utensils },
    { name: "About Us", href: "/about", icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        {/* Top Banner (Value Prop & Low-Fluff Guarantee) */}
        <div className="bg-slate-950 text-slate-100 py-1.5 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ForkSavvy • Scalable Portions, Real Macros & 1-Click Grocery Export</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo size="md" variant="dark" />

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-sm mx-6">
              <form
                action="/recipes"
                method="GET"
                className="relative w-full flex items-center"
              >
                <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 50+ recipes, air fryer, macros..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-brand-500 rounded-full outline-none transition-all placeholder:text-slate-400 text-slate-900"
                />
              </form>
            </div>

            {/* Desktop Nav Links + Saved Recipes Button */}
            <div className="hidden lg:flex items-center gap-1">
              <nav className="flex items-center gap-1 mr-2">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-brand-600 hover:bg-brand-50/70 transition-all"
                    >
                      <Icon className="w-3.5 h-3.5 text-brand-500" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Saved Recipes Heart Button */}
              <button
                onClick={() => setSavedDrawerOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                title="View Saved Recipes"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Saved</span>
                {savedSlugs.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {savedSlugs.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => setSavedDrawerOpen(true)}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 relative"
                aria-label="Saved Recipes"
              >
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                {savedSlugs.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] flex items-center justify-center font-bold">
                    {savedSlugs.length}
                  </span>
                )}
              </button>

              <Link
                href="/recipes"
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <form action="/recipes" method="GET" className="relative w-full">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="q"
                placeholder="Search US recipes..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
              />
            </form>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-brand-50 text-xs font-bold text-slate-800"
                  >
                    <Icon className="w-4 h-4 text-brand-600" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Saved Recipes Drawer */}
      <SavedRecipesDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
      />
    </>
  );
}
