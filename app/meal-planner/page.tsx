"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Plus, Trash2, ShoppingCart, DollarSign, ArrowRight, Utensils, Check, Sparkles } from "lucide-react";
import { RECIPES, Recipe } from "@/data/recipes";
import { formatPrice } from "@/lib/utils";

interface PlannedDay {
  day: string;
  recipeId: string | null;
}

export default function MealPlannerPage() {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [plan, setPlan] = useState<PlannedDay[]>([
    { day: "Monday", recipeId: "chipotle-honey-chicken-bowl" },
    { day: "Tuesday", recipeId: "air-fryer-crispy-parmesan-chicken-tenders" },
    { day: "Wednesday", recipeId: "panera-broccoli-cheddar-soup-copycat" },
    { day: "Thursday", recipeId: "sheet-pan-smoked-sausage-cajun-veggies" },
    { day: "Friday", recipeId: "chick-fil-a-air-fryer-nuggets" },
    { day: "Saturday", recipeId: "slow-cooker-olive-garden-zuppa-toscana" },
    { day: "Sunday", recipeId: "starbucks-egg-bites-bacon-gruyere" },
  ]);

  const [copied, setCopied] = useState(false);

  const selectedRecipes = plan
    .map((p) => RECIPES.find((r) => r.id === p.recipeId))
    .filter((r): r is Recipe => r !== undefined);

  // Total estimated budget for week
  const totalWeeklyCost = selectedRecipes.reduce((sum, r) => sum + r.costPerServing * 2, 0); // assuming 2 servings per meal

  // Consolidated Ingredients
  const allIngredients = Array.from(new Set(selectedRecipes.flatMap((r) => r.ingredients)));

  const handleSelectRecipe = (day: string, recipeId: string) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, recipeId: recipeId === "none" ? null : recipeId } : item
      )
    );
  };

  const handleCopyShoppingList = () => {
    const text =
      `🛒 Weekly Meal Plan Shopping List (${selectedRecipes.length} Dinners, Est. ${formatPrice(totalWeeklyCost)}):\n\n` +
      allIngredients.map((ing) => `[ ] ${ing}`).join("\n") +
      `\n\nGenerated with RecipePulse USA Meal Planner`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-brand-600">
          <Calendar className="w-4 h-4" />
          <span>Interactive Meal Planner</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
          Weekly Budget Meal Planner
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Plan your dinners for the week, automate your consolidated grocery shopping list, and cut takeout costs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: 7-Day Planner */}
        <div className="lg:col-span-2 space-y-4">
          {plan.map((item) => {
            const currentRecipe = RECIPES.find((r) => r.id === item.recipeId);
            return (
              <div
                key={item.day}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-24 shrink-0 font-display font-extrabold text-sm text-slate-900">
                    {item.day}
                  </div>

                  <div className="flex-1">
                    <select
                      value={item.recipeId || "none"}
                      onChange={(e) => handleSelectRecipe(item.day, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-brand-500"
                    >
                      <option value="none">-- No Dinner Planned --</option>
                      {RECIPES.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.title} ({formatPrice(r.costPerServing)}/serving)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {currentRecipe && (
                  <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                      {formatPrice(currentRecipe.costPerServing * 2)} (2 servings)
                    </span>
                    <Link
                      href={`/recipes/${currentRecipe.slug}`}
                      className="text-brand-600 hover:text-brand-700 font-bold"
                    >
                      View Recipe →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Col: Weekly Summary & Grocery Checklist */}
        <div className="lg:col-span-1 space-y-6">
          {/* Estimated Budget Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-bento space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                Estimated Weekly Cost
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                {selectedRecipes.length} Meals
              </span>
            </div>

            <div className="font-display font-black text-4xl text-white">
              {formatPrice(totalWeeklyCost)}
            </div>

            <p className="text-xs text-slate-400">
              Feeding 2 people for 7 days. Saves approximately <strong className="text-emerald-400">$180/week</strong> compared to US takeout delivery.
            </p>

            <button
              onClick={handleCopyShoppingList}
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied Shopping List!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Copy Master Shopping List
                </>
              )}
            </button>
          </div>

          {/* Consolidated Ingredients Checklist */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-bento space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-slate-900 text-base">
                Consolidated Ingredients
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {allIngredients.length} items
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2 pr-1 text-xs text-slate-700">
              {allIngredients.map((ing, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5 border-b border-slate-50 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
