"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  DollarSign,
  Flame,
  Star,
  Zap,
  ShieldCheck,
  ChefHat,
  Eye,
  Check,
  CheckCircle2,
  Share2,
  Printer,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { Recipe } from "@/data/recipes";
import PortionMultiplier from "@/components/PortionMultiplier";
import UnitSwitcher from "@/components/UnitSwitcher";
import NutritionBento from "@/components/NutritionBento";
import GroceryExport from "@/components/GroceryExport";
import CookModeModal from "@/components/CookModeModal";
import RecipeCard from "@/components/RecipeCard";
import SocialShare from "@/components/SocialShare";
import RecipeReviews from "@/components/RecipeReviews";
import { useSavedRecipes } from "@/components/SavedRecipesDrawer";
import { parseIngredient, convertUnit, UnitSystem } from "@/lib/units";
import { formatPrice } from "@/lib/utils";

interface RecipeDetailClientProps {
  recipe: Recipe;
  relatedRecipes: Recipe[];
}

export default function RecipeDetailClient({
  recipe,
  relatedRecipes,
}: RecipeDetailClientProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [cookModeOpen, setCookModeOpen] = useState(false);
  const { isSaved, toggleSave } = useSavedRecipes();

  const scaleFactor = servings / recipe.servings;
  const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const saved = isSaved(recipe.slug);

  const toggleIngredientCheck = (idx: number) => {
    if (checkedIngredients.includes(idx)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== idx));
    } else {
      setCheckedIngredients([...checkedIngredients, idx]);
    }
  };

  // Convert & scale each ingredient line
  const parsedAndConvertedIngredients = recipe.ingredients.map((raw) => {
    const parsed = parseIngredient(raw);
    const converted = convertUnit(
      parsed.amount,
      parsed.unit,
      parsed.name,
      unitSystem,
      scaleFactor
    );

    let displayString = "";
    if (converted.displayAmount) {
      displayString += converted.displayAmount;
    }
    if (converted.displayUnit) {
      displayString += (displayString ? " " : "") + converted.displayUnit;
    }
    if (converted.name) {
      displayString += (displayString ? " " : "") + converted.name;
    }
    return displayString || raw;
  });

  const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    `https://forksavvyrecipes.com/recipes/${recipe.slug}`
  )}&media=${encodeURIComponent(recipe.image)}&description=${encodeURIComponent(
    `${recipe.title} - ${recipe.tagline} on ForkSavvyRecipes.com`
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/recipes" className="hover:text-brand-600 transition-colors">
          Recipes
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
          {recipe.title}
        </span>
      </nav>

      {/* Recipe Header & Hero */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="uppercase tracking-wider font-extrabold text-xs text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
            {recipe.appliance.replace("-", " ")}
          </span>

          {recipe.dietaryTags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 capitalize"
            >
              {tag.replace("-", " ")}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight leading-[1.15]">
          {recipe.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {recipe.description}
        </p>

        {/* Rating & Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-y border-slate-200 py-3">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 font-bold text-amber-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm text-slate-900">{recipe.ratingValue.toFixed(2)}</span>
              <span className="text-slate-400 font-normal">({recipe.reviewCount} reviews)</span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">Published: {recipe.datePublished}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark Heart Button */}
            <button
              onClick={() => toggleSave(recipe.slug)}
              className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                saved
                  ? "bg-rose-50 border-rose-200 text-rose-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
              title={saved ? "Saved to your bookmarks" : "Save recipe"}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
              <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </button>

            <a
              href="#recipe-card"
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5"
            >
              <ChefHat className="w-3.5 h-3.5" />
              Jump to Recipe
            </a>

            <button
              onClick={() => setCookModeOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              Start Cook Mode
            </button>
          </div>
        </div>

        {/* Social Share Bar (Pinterest, X, Facebook, Copy) */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Share this recipe:
          </span>
          <SocialShare
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            url={`https://forksavvyrecipes.com/recipes/${recipe.slug}`}
          />
        </div>
      </div>

      {/* Hero Image & Quick Facts Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Image with Pinterest Pin Overlay */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] relative bg-slate-100 group">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />

          {/* Pinterest Pin Direct Badge */}
          <a
            href={pinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 bg-[#E60023] hover:bg-[#b8001c] text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow-lg backdrop-blur-sm flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026l.032-.026z" />
            </svg>
            <span>Pin Image</span>
          </a>

          {recipe.restaurantComparison && (
            <div className="absolute top-4 left-4 bg-emerald-600/95 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow-md backdrop-blur-sm">
              Save {recipe.restaurantComparison.savingsPercent}% vs {recipe.restaurantComparison.chainName}
            </div>
          )}
        </div>

        {/* Quick Facts Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-bento space-y-4">
          <h3 className="font-display font-bold text-slate-900 text-base pb-2 border-b border-slate-100">
            Quick Recipe Summary
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Prep Time</span>
              <strong className="text-sm text-slate-800 font-bold">{recipe.prepTimeMinutes} min</strong>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Cook Time</span>
              <strong className="text-sm text-slate-800 font-bold">{recipe.cookTimeMinutes} min</strong>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Total Time</span>
              <strong className="text-sm text-brand-600 font-bold">{totalMinutes} min</strong>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Cost / Serving</span>
              <strong className="text-sm text-emerald-700 font-bold">{formatPrice(recipe.costPerServing)}</strong>
            </div>
          </div>

          {/* Restaurant Comparison Callout */}
          {recipe.restaurantComparison && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-1">
              <div className="text-xs font-bold text-emerald-900">
                Takeout Comparison
              </div>
              <div className="text-xs text-emerald-800 flex items-center justify-between">
                <span>{recipe.restaurantComparison.chainName} Takeout:</span>
                <span className="line-through font-semibold text-slate-500">
                  {formatPrice(recipe.restaurantComparison.restaurantPrice)}
                </span>
              </div>
              <div className="text-xs text-emerald-900 flex items-center justify-between font-bold">
                <span>Home Cook Cost:</span>
                <span className="text-emerald-700">
                  {formatPrice(recipe.costPerServing)}
                </span>
              </div>
            </div>
          )}

          {/* Instant Cook Mode Action Button */}
          <button
            onClick={() => setCookModeOpen(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Launch Interactive Cook Mode
          </button>
        </div>
      </div>

      {/* Flagship Recipe Section (Zero Fluff) */}
      <section id="recipe-card" className="scroll-mt-24 space-y-8">
        {/* Controls Bar: Portion Multiplier + Unit Switcher */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <PortionMultiplier
            baseServings={recipe.servings}
            currentServings={servings}
            onServingsChange={setServings}
          />

          <UnitSwitcher
            system={unitSystem}
            onSystemChange={setUnitSystem}
          />
        </div>

        {/* Ingredients & Grocery Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Column */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-bento space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-display font-extrabold text-slate-900">
                  Ingredients
                </h2>
                <span className="text-xs text-slate-500">
                  Scaled for {servings} {servings === 1 ? "serving" : "servings"}
                </span>
              </div>

              <span className="text-xs font-semibold text-slate-400">
                {checkedIngredients.length} of {recipe.ingredients.length} checked
              </span>
            </div>

            {/* Checklist of Ingredients */}
            <ul className="space-y-3">
              {parsedAndConvertedIngredients.map((item, idx) => {
                const isChecked = checkedIngredients.includes(idx);
                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      isChecked
                        ? "bg-slate-50 text-slate-400 line-through"
                        : "hover:bg-brand-50/50 text-slate-800"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors mt-0.5 shrink-0 ${
                        isChecked
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Smart Grocery Export Bar */}
            <GroceryExport
              recipeTitle={recipe.title}
              ingredients={parsedAndConvertedIngredients}
              servings={servings}
            />
          </div>

          {/* Right Column: Nutrition Bento */}
          <div className="lg:col-span-1 space-y-6">
            <NutritionBento
              nutrition={recipe.nutrition}
              servings={servings}
              baseServings={recipe.servings}
            />

            {/* Recommended Kitchen Equipment */}
            {recipe.equipment.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-brand-600" />
                  Recommended Kitchen Gear
                </h4>
                <div className="space-y-2">
                  {recipe.equipment.map((item) => (
                    <a
                      key={item.name}
                      href={`https://www.amazon.com/s?k=${encodeURIComponent(item.amazonAffiliateQuery)}&tag=forksavvy-20`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 border border-slate-200/60 transition-all text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800 group-hover:text-brand-700 block">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] text-amber-700 font-semibold">
                            ★ {item.badge}
                          </span>
                        )}
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-bento space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                Step-by-Step Instructions
              </h2>
              <p className="text-xs text-slate-500">
                Clear, precise steps with built-in timers.
              </p>
            </div>

            <button
              onClick={() => setCookModeOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold transition-all shadow-sm"
            >
              <Eye className="w-4 h-4" /> Fullscreen Cook Mode
            </button>
          </div>

          <div className="space-y-8">
            {recipe.instructions.map((inst) => (
              <div
                key={inst.step}
                className="flex items-start gap-4 sm:gap-6 pb-6 border-b border-slate-100 last:border-0 last:pb-0"
              >
                {/* Step Number Badge */}
                <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white font-display font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                  {inst.step}
                </div>

                <div className="space-y-2 flex-grow">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-slate-900 text-lg">
                      {inst.title}
                    </h3>

                    {inst.timerMinutes && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {inst.timerMinutes} min timer
                      </span>
                    )}
                  </div>

                  <p className="text-base text-slate-700 leading-relaxed font-normal">
                    {inst.text}
                  </p>

                  {inst.tip && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-bold">Chef's Secret:</strong> {inst.tip}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Ratings & Reviews Component */}
      <section className="pt-4">
        <RecipeReviews
          recipeTitle={recipe.title}
          initialRating={recipe.ratingValue}
          initialReviewCount={recipe.reviewCount}
        />
      </section>

      {/* Related Recipes Carousel / Grid */}
      {relatedRecipes.length > 0 && (
        <section className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              You Might Also Like
            </h3>
            <Link
              href="/recipes"
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              Browse all recipes →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedRecipes.map((rel) => (
              <RecipeCard key={rel.id} recipe={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Distraction-Free Cook Mode Modal */}
      <CookModeModal
        recipeTitle={recipe.title}
        instructions={recipe.instructions}
        isOpen={cookModeOpen}
        onClose={() => setCookModeOpen(false)}
      />
    </div>
  );
}
