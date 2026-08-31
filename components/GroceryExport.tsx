"use client";

import React, { useState } from "react";
import { ShoppingCart, Check, Copy, Printer, ExternalLink, Share2 } from "lucide-react";

interface GroceryExportProps {
  recipeTitle: string;
  ingredients: string[];
  servings: number;
}

export default function GroceryExport({
  recipeTitle,
  ingredients,
  servings,
}: GroceryExportProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyList = () => {
    const text = `🛒 Shopping List for ${recipeTitle} (${servings} servings):\n\n` +
      ingredients.map((ing) => `• ${ing}`).join("\n") +
      `\n\nGenerated from American Recipe Hub`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Instacart affiliate cart search integration
  const instacartUrl = `https://www.instacart.com/store/search/${encodeURIComponent(
    recipeTitle.split(" ").slice(0, 3).join(" ")
  )}`;

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-brand-50 to-orange-50/50 rounded-2xl border border-brand-200/60 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-slate-900 text-base">
              Smart Grocery & Cart Export
            </h4>
            <p className="text-xs text-slate-600">
              Order all {ingredients.length} ingredients or copy shopping checklist
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Instacart / Online Grocery */}
          <a
            href={instacartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:scale-105"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Order on Instacart
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          {/* Copy Checklist */}
          <button
            onClick={handleCopyList}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                Copy Ingredients
              </>
            )}
          </button>

          {/* Print Recipe */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm transition-all"
            title="Print clean recipe card"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
