"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RECIPES } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import FilterDrawer, { FilterState } from "@/components/FilterDrawer";
import { Search, Sparkles, Utensils } from "lucide-react";

function DirectoryContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialQuery,
    appliance: "all",
    dietary: [],
    maxTime: 0,
    maxCost: 0,
  });

  // Update searchQuery if URL param changes
  useEffect(() => {
    if (initialQuery) {
      setFilters((prev) => ({ ...prev, searchQuery: initialQuery }));
    }
  }, [initialQuery]);

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      // Search query filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(query);
        const matchesDesc = recipe.description.toLowerCase().includes(query);
        const matchesIngredients = recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        const matchesChain =
          recipe.copycatChainSlug?.toLowerCase().includes(query) || false;
        const matchesTags = recipe.dietaryTags.some((t) =>
          t.toLowerCase().includes(query)
        );

        if (!matchesTitle && !matchesDesc && !matchesIngredients && !matchesChain && !matchesTags) {
          return false;
        }
      }

      // Appliance filter
      if (filters.appliance !== "all" && recipe.appliance !== filters.appliance) {
        return false;
      }

      // Dietary tags filter (must match all selected tags)
      if (filters.dietary.length > 0) {
        const matchesAll = filters.dietary.every(
          (diet) =>
            recipe.dietaryTags.includes(diet) ||
            recipe.category === diet ||
            (diet === "high-protein" && recipe.nutrition.proteinGrams >= 35) ||
            (diet === "under-3-dollars" && recipe.costPerServing <= 3.0) ||
            (diet === "15-minute-meals" && (recipe.prepTimeMinutes + recipe.cookTimeMinutes) <= 20)
        );
        if (!matchesAll) return false;
      }

      // Max Time filter
      if (filters.maxTime > 0) {
        const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
        if (totalMinutes > filters.maxTime) return false;
      }

      // Max Cost filter
      if (filters.maxCost > 0 && recipe.costPerServing > filters.maxCost) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      appliance: "all",
      dietary: [],
      maxTime: 0,
      maxCost: 0,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-brand-600 mb-1">
          <Utensils className="w-4 h-4" />
          <span>Recipe Database</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
          All American Recipes
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-xl">
          Browse fast, zero-fluff weeknight dinners, crispy air fryer classics, and restaurant copycats. Filter by prep time, protein content, and budget.
        </p>
      </div>

      {/* Main Layout: Filters sidebar + Recipe Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filter */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <FilterDrawer
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredRecipes.length}
            />
          </div>
        </div>

        {/* Right Recipe Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Search / Quick Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
              placeholder="Filter by ingredient (chicken, rice, cheddar), appliance, or chain..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 shadow-sm"
            />
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                No recipes match your active filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your search terms or clearing specific dietary / appliance restrictions.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecipesDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
          Loading recipes...
        </div>
      }
    >
      <DirectoryContent />
    </Suspense>
  );
}
