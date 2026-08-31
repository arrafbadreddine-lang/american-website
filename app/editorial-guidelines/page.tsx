import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Award, ShieldAlert, CheckCircle2, Scale, ChefHat, Sparkles } from "lucide-react";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "Editorial & Recipe Testing Guidelines | ForkSavvy",
  description: "ForkSavvy's 4-step recipe development and testing protocol, USDA nutritional standards, allergen accuracy, and editorial independence policy.",
};

export default function EditorialGuidelinesPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://forksavvyrecipes.com" },
    { name: "Editorial Guidelines", url: "https://forksavvyrecipes.com/editorial-guidelines" },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <JsonLdSchema data={breadcrumbJsonLd} />

      <div className="space-y-4 border-b border-slate-200 pb-6">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600">
          Editorial Integrity
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
          Recipe Testing & Editorial Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Last Updated: February 2026 • ForkSavvy Editorial Board
        </p>
      </div>

      {/* 4-Step Testing Protocol */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-extrabold text-slate-900">
          1. Our 4-Step Recipe Testing Protocol
        </h2>
        
        <div className="space-y-4 text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs">1</span>
              Recipe Development & Formulation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-8">
              Recipes begin in our test kitchen with standardized metric and imperial measurements. We calibrate flavor ratios, cook times, and temperature settings across multiple appliance brands (e.g. Ninja, Instant Pot, Cosori).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs">2</span>
              Home Kitchen Blind Re-Testing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-8">
              Before publishing, recipes are handed to independent home testers with varied skill levels to confirm the instructions are foolproof, prep times are accurate, and ingredients are readily available in standard American supermarkets.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs">3</span>
              Nutritional Calculations & Reference Benchmarks
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-8">
              Nutritional values (calories, protein, carbs, fats) are estimated using standard ingredient reference databases, including USDA FoodData Central values. Because brands, cuts of meat, and substitutions vary, nutritional information is provided as an informational estimate.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs">4</span>
              Annual Recalibration & Community Feedback
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-8">
              We continuously review ratings, questions, and community comments. Recipes are updated whenever food manufacturers alter ingredient formulations or when reader feedback indicates opportunities for improved clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Allergen & Food Safety Disclaimers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-extrabold text-slate-900">
          2. Food Safety & Allergen Disclaimers
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 space-y-2">
          <p className="font-bold flex items-center gap-1.5 text-amber-800">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            USDA Food Safety Compliance
          </p>
          <p className="leading-relaxed">
            All meat cooking guidelines provided on ForkSavvy adhere to USDA minimum internal temperature standards: 165°F (74°C) for poultry, 145°F (63°C) for whole cuts of beef, pork, and seafood with a 3-minute rest, and 160°F (71°C) for ground meats.
          </p>
          <p className="leading-relaxed">
            While we provide gluten-free, dairy-free, and allergen-friendly tags, cross-contact can occur in home kitchens. Readers with severe food allergies must verify ingredient packaging labels.
          </p>
        </div>
      </section>

      {/* Brand Neutrality & Affiliate Disclosure */}
      <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-display font-extrabold text-slate-900">
          3. Brand Neutrality & Commercial Independence
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          ForkSavvy maintains 100% editorial independence. We do not accept payment to rate recipes favorably or to feature specific grocery brands in our ingredient lists. Some links on our website are Amazon Associates or grocery affiliate links where we may earn a small commission at no additional cost to you.
        </p>
      </section>
    </div>
  );
}
