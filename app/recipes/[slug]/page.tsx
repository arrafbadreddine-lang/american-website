import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RECIPES, getRecipeBySlug } from "@/data/recipes";
import { generateRecipeJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import JsonLdSchema from "@/components/JsonLdSchema";
import RecipeDetailClient from "./RecipeDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RECIPES.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found | ForkSavvy Recipes",
    };
  }

  const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return {
    title: `${recipe.title} (${totalMinutes} Min) | ForkSavvy Recipes`,
    description: `${recipe.tagline} ${recipe.nutrition.proteinGrams}g protein, ${recipe.nutrition.calories} cal, and ready in ${totalMinutes} min for $${recipe.costPerServing.toFixed(2)}/serving on ForkSavvyRecipes.com.`,
    keywords: [
      recipe.title.toLowerCase(),
      `${recipe.appliance} recipes`,
      ...recipe.dietaryTags,
      ...(recipe.copycatChainSlug ? [`${recipe.copycatChainSlug} copycat recipe`] : []),
      "easy american dinner",
      "healthy weeknight recipe",
      "forksavvy recipes",
    ],
    openGraph: {
      title: `${recipe.title} - Ready in ${totalMinutes} Min`,
      description: recipe.description,
      images: [{ url: recipe.image, width: 1200, height: 630, alt: recipe.title }],
      type: "article",
      publishedTime: recipe.datePublished,
      url: `https://forksavvyrecipes.com/recipes/${recipe.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.tagline,
      images: [recipe.image],
    },
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  // Related recipes in same category or appliance
  const relatedRecipes = RECIPES.filter(
    (r) => r.id !== recipe.id && (r.category === recipe.category || r.appliance === recipe.appliance)
  ).slice(0, 3);

  // Generate Google Schema JSON-LD
  const recipeJsonLd = generateRecipeJsonLd({
    title: recipe.title,
    description: recipe.description,
    image: recipe.image,
    prepTimeMinutes: recipe.prepTimeMinutes,
    cookTimeMinutes: recipe.cookTimeMinutes,
    servings: recipe.servings,
    category: recipe.category,
    cuisine: "American",
    keywords: [recipe.title, recipe.appliance, ...recipe.dietaryTags],
    ingredients: recipe.ingredients,
    instructions: recipe.instructions.map((inst) => ({
      step: inst.step,
      title: inst.title,
      text: inst.text,
    })),
    nutrition: recipe.nutrition,
    ratingValue: recipe.ratingValue,
    reviewCount: recipe.reviewCount,
    url: `https://forksavvyrecipes.com/recipes/${recipe.slug}`,
    datePublished: recipe.datePublished,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://forksavvyrecipes.com" },
    { name: "Recipes", url: "https://forksavvyrecipes.com/recipes" },
    { name: recipe.title, url: `https://forksavvyrecipes.com/recipes/${recipe.slug}` },
  ]);

  return (
    <>
      <JsonLdSchema data={recipeJsonLd} />
      <JsonLdSchema data={breadcrumbJsonLd} />
      <RecipeDetailClient recipe={recipe} relatedRecipes={relatedRecipes} />
    </>
  );
}
