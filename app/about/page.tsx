import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChefHat, ShieldCheck, Scale, Award, Heart, CheckCircle2, Users, Sparkles, Utensils } from "lucide-react";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "About Us | ForkSavvy Recipes",
  description: "Learn about ForkSavvy Recipes: our mission to create fast, zero-fluff, budget-friendly American dinners tested for real weeknight home kitchens.",
  openGraph: {
    title: "About ForkSavvy Recipes - Real Food, Zero Fluff",
    description: "Our mission: fast, high-protein, budget-friendly American recipes tested in real home kitchens.",
    url: "https://forksavvyrecipes.com/about",
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://forksavvyrecipes.com" },
    { name: "About Us", url: "https://forksavvyrecipes.com/about" },
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <JsonLdSchema data={breadcrumbJsonLd} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-extrabold shadow-sm">
          <ChefHat className="w-4 h-4 text-brand-600" />
          <span>About ForkSavvy Recipes</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 tracking-tight">
          Real Food for Real Life. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-amber-600 to-emerald-700">
            Zero Fluff.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          ForkSavvy Recipes was created by everyday home cooks and meal-prep enthusiasts with one simple goal: make delicious weeknight cooking fast, budget-friendly, and crystal clear—without forcing you to scroll through 2,000 words of personal diary entries.
        </p>
      </div>

      {/* 3 Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-bento space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-slate-900 text-lg">
            Tested in Real Home Kitchens
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every recipe is developed and re-tested using everyday consumer appliances (Air Fryers, Sheet Pans, Ninja Creami, and standard stovetops) to ensure reliable weeknight results.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-bento space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-slate-900 text-lg">
            Nutrition & Macro Estimates
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We provide estimated macro breakdowns (calories, protein, carbs, fats) calculated from standard nutritional reference databases to help you hit your daily meal planning goals.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-bento space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-slate-900 text-lg">
            Budget & Copycat Savings
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We love recreating popular restaurant takeout favorites (Chipotle, Chick-fil-A, Panera) at home so you can enjoy the same flavors for a fraction of the cost.
          </p>
        </div>
      </div>

      {/* Our Mission & Values */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600">
            Our Kitchen Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Why Home Cooks Love ForkSavvy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Straight to the Ingredients
            </h4>
            <p className="text-slate-600">
              We respect your time. Every recipe page gives you instant access to ingredients, portion scaling, and interactive cook timers right at the top.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Smart Serving Scaler & Unit Switcher
            </h4>
            <p className="text-slate-600">
              Cooking for one or meal prepping for twelve? Switch seamlessly between US cups/ounces and metric grams with instant math.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1-Click Grocery Export
            </h4>
            <p className="text-slate-600">
              Easily copy your ingredient checklist or send items directly to online grocery delivery to streamline your supermarket shopping.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Community Tested & Reviewed
            </h4>
            <p className="text-slate-600">
              Our community of home cooks shares tips, modifications, and star ratings so you can see how others customized each dish.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Standards Link */}
      <div className="text-center space-y-3">
        <h3 className="font-display font-bold text-slate-900 text-xl">
          Want to learn more about our recipe guidelines?
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Read our testing methodology, food safety tips, and affiliate transparency disclosures.
        </p>
        <Link
          href="/editorial-guidelines"
          className="inline-block px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          Read Editorial Guidelines →
        </Link>
      </div>
    </div>
  );
}
