"use client";

import React from "react";
import { Filter, X, Check, Flame, Zap, DollarSign, Clock, RotateCcw } from "lucide-react";

export interface FilterState {
  searchQuery: string;
  appliance: string;
  dietary: string[];
  maxTime: number; // in minutes, 0 means unlimited
  maxCost: number; // in dollars, 0 means unlimited
}

interface FilterDrawerProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export default function FilterDrawer({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}: FilterDrawerProps) {
  const appliances = [
    { id: "all", label: "All Appliances" },
    { id: "air-fryer", label: "Air Fryer" },
    { id: "ninja-creami", label: "Ninja Creami" },
    { id: "sheet-pan", label: "Sheet Pan" },
    { id: "slow-cooker", label: "Slow Cooker" },
    { id: "stovetop", label: "Stovetop / Skillet" },
  ];

  const dietaryOptions = [
    { id: "high-protein", label: "High Protein (35g+)", icon: Zap },
    { id: "gluten-free", label: "Gluten-Free", icon: Check },
    { id: "keto-low-carb", label: "Keto / Low Carb", icon: Check },
    { id: "under-3-dollars", label: "Under $3 / serving", icon: DollarSign },
    { id: "15-minute-meals", label: "15-Min Dinners", icon: Clock },
  ];

  const toggleDietary = (id: string) => {
    const next = filters.dietary.includes(id)
      ? filters.dietary.filter((d) => d !== id)
      : [...filters.dietary, id];
    onFilterChange({ ...filters, dietary: next });
  };

  const hasActiveFilters =
    filters.appliance !== "all" ||
    filters.dietary.length > 0 ||
    filters.maxTime > 0 ||
    filters.maxCost > 0 ||
    filters.searchQuery.trim() !== "";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" />
          <h3 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wide">
            Filter Recipes
          </h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
            {totalResults} results
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-semibold"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Appliance Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Appliance
        </label>
        <div className="flex flex-wrap gap-1.5">
          {appliances.map((app) => (
            <button
              key={app.id}
              onClick={() => onFilterChange({ ...filters, appliance: app.id })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filters.appliance === app.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {app.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary & Macro Tags */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Diet & Macros
        </label>
        <div className="flex flex-wrap gap-1.5">
          {dietaryOptions.map((diet) => {
            const isSelected = filters.dietary.includes(diet.id);
            return (
              <button
                key={diet.id}
                onClick={() => toggleDietary(diet.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                {diet.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Max Time Buttons */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Max Total Time
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Any", value: 0 },
            { label: "15 min", value: 15 },
            { label: "30 min", value: 30 },
            { label: "45 min", value: 45 },
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => onFilterChange({ ...filters, maxTime: t.value })}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                filters.maxTime === t.value
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
