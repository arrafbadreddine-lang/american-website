import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Store, DollarSign, ArrowRight, Star, Sparkles, TrendingUp } from "lucide-react";
import { US_RESTAURANT_CHAINS } from "@/data/chains";
import { getCopycatRecipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import JsonLdSchema from "@/components/JsonLdSchema";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Restaurant Copycat Recipes Hub | Recreate US Favorites for 75% Less",
  description: "Exact taste of Chipotle, Chick-fil-A, Panera Bread, Starbucks, and Olive Garden made at home in under 25 minutes for a fraction of the takeout price.",
  openGraph: {
    title: "Restaurant Copycat Hub | ForkSavvy Recipes",
    description: "Recreate your favorite American fast-casual meals at home with exact seasoning ratios and huge savings.",
  },
};

export default function CopycatsHubPage() {
  const copycatRecipes = getCopycatRecipes();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://forksavvyrecipes.com" },
    { name: "Restaurant Copycats", url: "https://forksavvyrecipes.com/copycats" },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <JsonLdSchema data={breadcrumbJsonLd} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-sm">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>Average 75% Savings vs US Restaurant Takeout</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
          Famous Restaurant Copycat Recipes
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Stop overpaying for fast-casual takeout. Recreate the secret spices, sauces, and cooking techniques of America’s most popular restaurant chains in your own kitchen.
        </p>
      </div>

      {/* Featured Chains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {US_RESTAURANT_CHAINS.map((chain) => (
          <div
            key={chain.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-bento space-y-4 hover:shadow-bento-hover transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl ${chain.logoBg} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
                  <Store className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg">
                  {chain.name}
                </h3>
              </div>

              <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                ~{chain.averageSavingsPercent}% Cheaper
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {chain.tagline}
            </p>

            {/* Popular Items Pills */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Popular Recreations
              </span>
              <div className="flex flex-wrap gap-1">
                {chain.popularItems.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Copycat Recipes Grid */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              Tested Copycat Recreations
            </h2>
            <p className="text-xs text-slate-500">
              Step-by-step flavor matching tested against original restaurant items.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {copycatRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} showComparison={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
