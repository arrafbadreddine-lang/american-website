import React from "react";
import Link from "next/link";
import {
  Flame,
  Sparkles,
  Zap,
  DollarSign,
  Clock,
  ArrowRight,
  ShieldCheck,
  Store,
  ChefHat,
  Search,
  Scale,
  ShoppingCart,
  TrendingUp,
  Award,
  CheckCircle2,
} from "lucide-react";
import { RECIPES, getCopycatRecipes } from "@/data/recipes";
import { CATEGORIES } from "@/data/categories";
import RecipeCard from "@/components/RecipeCard";
import JsonLdSchema from "@/components/JsonLdSchema";

export default function HomePage() {
  // Sort newest-first so new recipes automatically appear in the beginning
  const featuredRecipes = [...RECIPES]
    .filter((r) => r.featured)
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());

  const copycats = getCopycatRecipes();
  const highProteinRecipes = RECIPES.filter((r) => r.dietaryTags.includes("high-protein"));
  const quickDinners = RECIPES.filter((r) => r.dietaryTags.includes("15-minute-meals") || r.cookTimeMinutes <= 15);

  // Organization & WebSite Schema for Google Knowledge Graph
  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://forksavvyrecipes.com/#organization",
        name: "ForkSavvy Recipes",
        url: "https://forksavvyrecipes.com",
        logo: {
          "@type": "ImageObject",
          url: "https://forksavvyrecipes.com/logo.png",
        },
        sameAs: [
          "https://pinterest.com/forksavvyrecipes",
          "https://twitter.com/forksavvyrecipes",
          "https://facebook.com/forksavvyrecipes",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://forksavvyrecipes.com/#website",
        url: "https://forksavvyrecipes.com",
        name: "ForkSavvy Recipes USA",
        publisher: { "@id": "https://forksavvyrecipes.com/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://forksavvyrecipes.com/recipes?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div className="space-y-16 pb-20">
      <JsonLdSchema data={websiteSchema} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* US Trending Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200 text-brand-700 text-xs font-extrabold shadow-sm">
            <TrendingUp className="w-4 h-4 text-brand-500" />
            <span>Over 2,400+ High-Protein, Air Fryer & Copycat Dinners Tested</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 leading-[1.1]">
            Fast American Dinners. <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-amber-500 to-paprika-500">
              Zero Fluff.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            No 2,000-word life stories. Jump straight to the recipe with <strong className="text-slate-900 font-semibold">interactive portion scaling</strong>, <strong className="text-slate-900 font-semibold">US/Metric conversions</strong>, and instant grocery exports.
          </p>

          {/* Hero Live Search Form */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              action="/recipes"
              method="GET"
              className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-2 transition-all focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10"
            >
              <Search className="w-6 h-6 text-brand-500 ml-3 shrink-0" />
              <input
                type="text"
                name="q"
                placeholder="Try 'Chipotle bowl', 'Air fryer tenders', or 'under $3'..."
                className="w-full px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md transition-all shrink-0"
              >
                Search Recipes
              </button>
            </form>
          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-600">
            <span className="text-slate-400">Popular right now:</span>
            <Link
              href="/categories/air-fryer"
              className="px-3 py-1 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-600 rounded-full border border-slate-200 shadow-sm transition-colors"
            >
              🔥 Air Fryer
            </Link>
            <Link
              href="/copycats"
              className="px-3 py-1 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-600 rounded-full border border-slate-200 shadow-sm transition-colors"
            >
              🏪 Chain Copycats
            </Link>
            <Link
              href="/categories/high-protein"
              className="px-3 py-1 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-600 rounded-full border border-slate-200 shadow-sm transition-colors"
            >
              💪 High Protein (35g+)
            </Link>
            <Link
              href="/categories/ninja-creami"
              className="px-3 py-1 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-600 rounded-full border border-slate-200 shadow-sm transition-colors"
            >
              🍦 Ninja Creami
            </Link>
          </div>
        </div>
      </section>

      {/* Top High-Growth Search Category Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-brand-600 mb-1">
              High-Demand Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Cook by Appliance & Goal
            </h2>
          </div>

          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 group"
          >
            Explore all categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-bento hover:shadow-bento-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-end p-6 border border-slate-800/20"
            >
              <img
                src={cat.heroImage}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-extrabold bg-amber-400 text-slate-950 rounded-md">
                  {cat.searchVolumeHint}
                </span>
                <h3 className="font-display font-black text-xl text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Trending Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-brand-600 mb-1">
              Top Rated by US Home Cooks
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Trending Viral Recipes
            </h2>
          </div>

          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 group"
          >
            View all recipes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Restaurant Copycat Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
              <DollarSign className="w-3.5 h-3.5" />
              Save up to 80% on Fast-Casual Takeout
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              Restaurant Copycat Recreations
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Why pay \$14 for Chipotle or \$9 for Panera soup? Recreate the exact flavor ratios at home in 20 minutes for under \$3.50 a portion.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/copycats"
                className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg transition-all"
              >
                Browse All Copycat Recipes
              </Link>
              <Link
                href="/recipes/chipotle-honey-chicken-bowl"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all"
              >
                Try Viral Chipotle Bowl
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none hidden lg:flex items-center justify-center">
            <Store className="w-64 h-64 text-brand-400" />
          </div>
        </div>
      </section>

      {/* High-Protein Fitness Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-600 mb-1">
              Macro-Focused & Satiety
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              High-Protein (35g+ Protein)
            </h2>
          </div>

          <Link
            href="/categories/high-protein"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 group"
          >
            See all protein meals
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highProteinRecipes.slice(0, 3).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Why ForkSavvy American UX Feature Bento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-bento text-center max-w-4xl mx-auto space-y-8">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-brand-600">
              Built for Modern Cooks
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
              Why We're Replacing Old-School Recipe Sites
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">
                Zero Life Stories
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct ingredients and steps. No 15 paragraphs about grandma’s autumn vacations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">
                Instant Unit & Portion Scaling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Switch instantly between US cups/oz and Metric grams/ml. Scale for 1 person or 12.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">
                1-Click Grocery Cart & Pinterest
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send missing items directly to Instacart or save directly to Pinterest with rich card metadata.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
