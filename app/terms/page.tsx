import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert, AlertTriangle } from "lucide-react";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "Terms of Service & Culinary Disclaimers | ForkSavvy",
  description: "Terms of Service, intellectual property policies, nutritional variance, and allergen liability disclaimers for ForkSavvy.",
};

export default function TermsPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://forksavvyrecipes.com" },
    { name: "Terms of Service", url: "https://forksavvyrecipes.com/terms" },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-700">
      <JsonLdSchema data={breadcrumbJsonLd} />

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600">
          Legal Terms
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">Effective Date: February 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm space-y-6 leading-relaxed">
        <p>
          Welcome to <strong>ForkSavvy</strong>. By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">1. Culinary & Health Disclaimer</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
          <p className="font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            Nutritional Variance & Food Allergies
          </p>
          <p>
            All nutritional calculations (calories, protein, fat, carbohydrates, sodium) are provided as estimates based on USDA database averages. Variations may occur based on product brands, produce sizes, and cooking alterations.
          </p>
          <p>
            Users are solely responsible for verifying that ingredients comply with their personal dietary requirements, food allergies, and medical dietary restrictions.
          </p>
        </div>

        <h2 className="text-lg font-bold text-slate-900 pt-4">2. Intellectual Property & Trademark Notice</h2>
        <p>
          All original recipe formulations, photography, text, and design assets are the intellectual property of ForkSavvy. You may print individual recipes for personal, non-commercial home cooking use. Republication or automated scraping of content without written permission is strictly prohibited.
        </p>
        <p>
          Restaurant trademarks referenced on our site (such as Chipotle, Chick-fil-A, Panera Bread, Starbucks, Olive Garden, In-N-Out) are the exclusive property of their respective trademark holders. ForkSavvy copycat recipes are independent culinary recreations and are not affiliated with or endorsed by these restaurant chains.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">3. User Conduct & Recipe Reviews</h2>
        <p>
          Users may submit recipe ratings and comments. By posting comments, you grant ForkSavvy a non-exclusive license to display the comment. ForkSavvy reserves the right to remove comments containing spam, offensive language, or false information.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">4. Limitation of Liability</h2>
        <p>
          In no event shall ForkSavvy, its authors, or affiliates be liable for any indirect, incidental, or consequential damages resulting from kitchen mishaps, equipment misuse, or allergic reactions.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">5. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the United States. For questions, contact <a href="mailto:legal@forksavvyrecipes.com" className="text-brand-600 font-semibold underline">legal@forksavvyrecipes.com</a>.
        </p>
      </div>
    </div>
  );
}
