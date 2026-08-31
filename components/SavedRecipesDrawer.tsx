"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, X, Trash2, Clock, Flame, ChevronRight, BookmarkCheck } from "lucide-react";
import { RECIPES, Recipe } from "@/data/recipes";

interface SavedRecipesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function useSavedRecipes() {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("forksavvy_saved_recipes");
      if (stored) {
        setSavedSlugs(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleSave = (slug: string) => {
    let next: string[];
    if (savedSlugs.includes(slug)) {
      next = savedSlugs.filter((s) => s !== slug);
    } else {
      next = [...savedSlugs, slug];
    }
    setSavedSlugs(next);
    try {
      localStorage.setItem("forksavvy_saved_recipes", JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const isSaved = (slug: string) => savedSlugs.includes(slug);

  return { savedSlugs, toggleSave, isSaved };
}

export default function SavedRecipesDrawer({ isOpen, onClose }: SavedRecipesDrawerProps) {
  const { savedSlugs, toggleSave } = useSavedRecipes();

  const savedRecipes = RECIPES.filter((r) => savedSlugs.includes(r.slug));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 text-base">
                  Saved Recipes
                </h3>
                <span className="text-xs text-slate-500">
                  {savedRecipes.length} recipes bookmarked
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {savedRecipes.length > 0 ? (
              savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-brand-50/50 border border-slate-200/70 transition-all"
                >
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    onClick={onClose}
                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200 block"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      onClick={onClose}
                      className="font-display font-bold text-slate-900 text-xs hover:text-brand-600 truncate block"
                    >
                      {recipe.title}
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                      <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                      <span>•</span>
                      <span className="text-amber-600 font-bold">{recipe.nutrition.proteinGrams}g Protein</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSave(recipe.slug)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
                  <BookmarkCheck className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-slate-900 text-sm">
                  No saved recipes yet
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart button on any recipe card to save your favorite weeknight dinners for quick access.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
