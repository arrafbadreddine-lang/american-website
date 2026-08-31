import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "Privacy Policy | ForkSavvy",
  description: "ForkSavvy's Privacy Policy explaining how we collect, use, and protect your information, compliant with CCPA, GDPR, and US privacy regulations.",
};

export default function PrivacyPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://forksavvyrecipes.com" },
    { name: "Privacy Policy", url: "https://forksavvyrecipes.com/privacy" },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-700">
      <JsonLdSchema data={breadcrumbJsonLd} />

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600">
          Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Effective Date: February 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm space-y-6 leading-relaxed">
        <p>
          At <strong>ForkSavvy Recipes</strong> (accessible from <Link href="/" className="text-brand-600 font-semibold">https://forksavvyrecipes.com</Link>), the privacy of our visitors is one of our main priorities. This Privacy Policy document outlines the types of information that is collected and recorded by ForkSavvy Recipes and how we use it.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">1. Information We Collect</h2>
        <p>
          When you visit ForkSavvy, we may collect information directly from you (such as when you subscribe to our newsletter or leave a recipe review) and automatically through standard web technologies:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Personal Data:</strong> Email address (when voluntarily provided for recipe newsletters).</li>
          <li><strong>Log Files:</strong> IP addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks.</li>
          <li><strong>Local Storage:</strong> Locally saved recipes and unit preferences (US Customary or Metric) stored strictly in your browser.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900 pt-4">2. Cookies and Web Beacons</h2>
        <p>
          Like any other website, ForkSavvy uses 'cookies' to optimize user experience, remember measurement units (US Cups vs. Metric Grams), and analyze website traffic.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">3. Advertising Partners & Ad Networks</h2>
        <p>
          We may partner with third-party advertising networks (such as Mediavine, Google AdSense, or Raptive) to serve ads when you visit our website. These companies may use aggregated information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">4. Affiliate Disclosure</h2>
        <p>
          ForkSavvy participates in affiliate marketing programs, including the Amazon Services LLC Associates Program. When you click on product or equipment recommendation links on our site, we may earn an affiliate commission at no additional cost to you.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">5. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
        <p>
          Under the California Consumer Privacy Act (CCPA), California consumers have the right to request disclosure of categories and specific pieces of personal data collected, request deletion of personal data, and opt-out of the sale of personal data. ForkSavvy does not sell personal information.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">6. GDPR Data Protection Rights</h2>
        <p>
          Every user is entitled to the following: the right to access, the right to rectification, the right to erasure, the right to restrict processing, and the right to data portability.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">7. Contact Information</h2>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:privacy@forksavvyrecipes.com" className="text-brand-600 font-semibold underline">privacy@forksavvyrecipes.com</a> or visit our <Link href="/contact" className="text-brand-600 font-semibold">Contact Page</Link>.
        </p>
      </div>
    </div>
  );
}
