import React from "react";
import { Activity, Flame, ShieldAlert, Sparkles } from "lucide-react";
import { Recipe } from "@/data/recipes";

interface NutritionBentoProps {
  nutrition: Recipe["nutrition"];
  servings: number;
  baseServings: number;
}

export default function NutritionBento({
  nutrition,
  servings,
  baseServings,
}: NutritionBentoProps) {
  // Standard 2000-calorie FDA reference values for percentages
  const dailyValues = {
    protein: 50, // 50g FDA standard (though high-protein diets aim higher)
    carbs: 275,
    fat: 78,
    fiber: 28,
    sodium: 2300,
  };

  const proteinPercent = Math.min(100, Math.round((nutrition.proteinGrams / dailyValues.protein) * 100));
  const carbsPercent = Math.min(100, Math.round((nutrition.carbsGrams / dailyValues.carbs) * 100));
  const fatPercent = Math.min(100, Math.round((nutrition.fatGrams / dailyValues.fat) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-bento">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 text-lg">
              Nutrition Facts
            </h3>
            <p className="text-xs text-slate-500">Per Serving (1 of {servings})</p>
          </div>
        </div>

        {/* Calories Highlight Card */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-slate-900 font-extrabold text-2xl font-display">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            {nutrition.calories}
          </div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
            Calories
          </span>
        </div>
      </div>

      {/* Main 3 Macros in Bento Grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {/* Protein */}
        <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-100 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Protein
            </span>
            <div className="font-display font-extrabold text-2xl text-amber-900 mt-0.5">
              {nutrition.proteinGrams}g
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-amber-200/70 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${proteinPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-amber-700 font-semibold mt-1">
              {proteinPercent}% DV
            </div>
          </div>
        </div>

        {/* Carbs */}
        <div className="bg-sky-50/80 rounded-xl p-3 border border-sky-100 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
              Carbs
            </span>
            <div className="font-display font-extrabold text-2xl text-sky-900 mt-0.5">
              {nutrition.carbsGrams}g
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-sky-200/70 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full rounded-full"
                style={{ width: `${carbsPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-sky-700 font-semibold mt-1">
              {carbsPercent}% DV
            </div>
          </div>
        </div>

        {/* Fat */}
        <div className="bg-rose-50/80 rounded-xl p-3 border border-rose-100 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
              Fat
            </span>
            <div className="font-display font-extrabold text-2xl text-rose-900 mt-0.5">
              {nutrition.fatGrams}g
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-rose-200/70 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{ width: `${fatPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-rose-700 font-semibold mt-1">
              {fatPercent}% DV
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Micronutrients Breakdown */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex justify-between py-1 px-2 rounded bg-slate-50">
          <span className="text-slate-500">Dietary Fiber</span>
          <strong className="text-slate-800">{nutrition.fiberGrams}g</strong>
        </div>
        <div className="flex justify-between py-1 px-2 rounded bg-slate-50">
          <span className="text-slate-500">Sugars</span>
          <strong className="text-slate-800">{nutrition.sugarGrams}g</strong>
        </div>
        <div className="flex justify-between py-1 px-2 rounded bg-slate-50">
          <span className="text-slate-500">Sodium</span>
          <strong className="text-slate-800">{nutrition.sodiumMg}mg</strong>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
        <span>* Percent Daily Values (% DV) based on a 2,000 calorie diet.</span>
      </div>
    </div>
  );
}
