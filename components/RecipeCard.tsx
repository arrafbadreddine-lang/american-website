"use client";

import React from "react";
import Link from "next/link";
import { Clock, DollarSign, Star, Zap, ShieldCheck, Heart } from "lucide-react";
import { Recipe } from "@/data/recipes";
import { formatPrice } from "@/lib/utils";
import { useSavedRecipes } from "./SavedRecipesDrawer";

interface RecipeCardProps {
  recipe: Recipe;
  showComparison?: boolean;
}

export default function RecipeCard({ recipe, showComparison = true }: RecipeCardProps) {
  const { isSaved, toggleSave } = useSavedRecipes();
  const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const saved = isSaved(recipe.slug);

  const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    `https://forksavvyrecipes.com/recipes/${recipe.slug}`
  )}&media=${encodeURIComponent(recipe.image)}&description=${encodeURIComponent(
    `${recipe.title} - ${recipe.tagline} on ForkSavvyRecipes.com`
  )}`;

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-bento hover:shadow-bento-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image & Badges */}
      <div className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
        <Link href={`/recipes/${recipe.slug}`}>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-brand-500" />
            {totalMinutes} min
          </span>

          {recipe.dietaryTags.includes("high-protein") && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm">
              <Zap className="w-3.5 h-3.5" />
              {recipe.nutrition.proteinGrams}g Protein
            </span>
          )}

          {recipe.dietaryTags.includes("gluten-free") && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              GF
            </span>
          )}
        </div>

        {/* Top Right: Bookmark Heart & Pinterest Pin Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          {/* Pinterest Pin Button */}
          <a
            href={pinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-white/90 hover:bg-[#E60023] hover:text-white text-[#E60023] shadow-md backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            title="Pin to Pinterest"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026l.032-.026z" />
            </svg>
          </a>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleSave(recipe.slug)}
            className={`p-2 rounded-full shadow-md backdrop-blur-sm transition-all ${
              saved
                ? "bg-rose-600 text-white"
                : "bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white"
            }`}
            title={saved ? "Saved" : "Save Recipe"}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Cost Per Serving Pill */}
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-slate-900/90 text-amber-300 shadow-md backdrop-blur-sm border border-slate-700">
            <DollarSign className="w-3.5 h-3.5 -mr-1" />
            {recipe.costPerServing.toFixed(2)} / serving
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow p-5">
        {/* Ratings & Category */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-1 font-semibold text-amber-600">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{recipe.ratingValue.toFixed(2)}</span>
            <span className="text-slate-400 font-normal">({recipe.reviewCount})</span>
          </div>

          <span className="uppercase tracking-wider font-bold text-[10px] text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
            {recipe.appliance.replace("-", " ")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-slate-900 text-lg group-hover:text-brand-600 transition-colors line-clamp-2 mb-1.5">
          <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
        </h3>

        {/* Tagline */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-grow">
          {recipe.tagline}
        </p>

        {/* Restaurant Savings Comparison callout */}
        {showComparison && recipe.restaurantComparison && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-between text-xs">
            <span className="text-emerald-900 font-medium">
              Save <strong className="font-bold text-emerald-700">{recipe.restaurantComparison.savingsPercent}%</strong> vs {recipe.restaurantComparison.chainName}
            </span>
            <span className="text-emerald-700 line-through font-semibold">
              {formatPrice(recipe.restaurantComparison.restaurantPrice)}
            </span>
          </div>
        )}

        {/* Bottom Quick Macro Bar */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-4 gap-1 text-center text-xs">
          <div className="bg-slate-50 rounded-lg py-1">
            <div className="text-[10px] text-slate-400 font-medium">CAL</div>
            <div className="font-bold text-slate-700">{recipe.nutrition.calories}</div>
          </div>
          <div className="bg-slate-50 rounded-lg py-1">
            <div className="text-[10px] text-slate-400 font-medium">PROT</div>
            <div className="font-bold text-brand-600">{recipe.nutrition.proteinGrams}g</div>
          </div>
          <div className="bg-slate-50 rounded-lg py-1">
            <div className="text-[10px] text-slate-400 font-medium">CARBS</div>
            <div className="font-bold text-slate-700">{recipe.nutrition.carbsGrams}g</div>
          </div>
          <div className="bg-slate-50 rounded-lg py-1">
            <div className="text-[10px] text-slate-400 font-medium">FAT</div>
            <div className="font-bold text-slate-700">{recipe.nutrition.fatGrams}g</div>
          </div>
        </div>
      </div>
    </article>
  );
}
