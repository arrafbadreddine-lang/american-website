import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Flame, Sparkles, Utensils, DollarSign, Clock, ShieldCheck } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { getRecipesByCategory } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import JsonLdSchema from "@/components/JsonLdSchema";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | ForkSavvy Recipes",
    };
  }

  return {
    title: `${category.name} | ForkSavvy Recipes`,
    description: `${category.description} Scalable ingredients, USDA-verified nutrition facts, and step-by-step cooking guides on ForkSavvyRecipes.com.`,
    openGraph: {
      title: `${category.name} - ForkSavvy Recipes`,
      description: category.description,
      images: [{ url: category.heroImage }],
      url: `https://forksavvyrecipes.com/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const recipes = getRecipesByCategory(category.slug);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://forksavvyrecipes.com" },
    { name: "Categories", url: "https://forksavvyrecipes.com/recipes" },
    { name: category.name, url: `https://forksavvyrecipes.com/categories/${category.slug}` },
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `https://forksavvyrecipes.com/categories/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: recipes.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://forksavvyrecipes.com/recipes/${r.slug}`,
        name: r.title,
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <JsonLdSchema data={breadcrumbJsonLd} />
      <JsonLdSchema data={collectionJsonLd} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/recipes" className="hover:text-brand-600 transition-colors">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
        <img
          src={category.heroImage}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wider">
            {category.searchVolumeHint}
          </span>

          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            {category.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {category.description}
          </p>

          <div className="pt-2 text-xs font-semibold text-slate-400">
            Showing {recipes.length} tested American recipes
          </div>
        </div>
      </div>

      {/* Category Recipe Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-2xl text-slate-900">
            Top {category.name}
          </h2>
          <Link
            href="/recipes"
            className="text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            Explore all recipes →
          </Link>
        </div>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            More {category.name} recipes are being added this week!
          </div>
        )}
      </div>
    </div>
  );
}
