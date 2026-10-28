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
      title: "Recipe Not Found",
    };
  }

  const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const canonicalUrl = `https://forksavvyrecipes.com/recipes/${recipe.slug}`;
  const fullImageUrl = recipe.image.startsWith("http")
    ? recipe.image
    : `https://forksavvyrecipes.com${recipe.image}`;

  return {
    title: `${recipe.title} (${totalMinutes} Min)`,
    description: `${recipe.tagline} Full nutrition & macros: ${recipe.nutrition.calories} calories, ${recipe.nutrition.proteinGrams}g protein, ${recipe.nutrition.carbsGrams}g carbs, ${recipe.nutrition.fatGrams}g fat. Ready in ${totalMinutes} min for $${recipe.costPerServing.toFixed(2)}/serving.`,
    keywords: [
      recipe.title.toLowerCase(),
      `${recipe.appliance} recipes`,
      ...recipe.dietaryTags,
      ...(recipe.copycatChainSlug ? [`${recipe.copycatChainSlug} copycat recipe`, `${recipe.title.toLowerCase()} calories`, `${recipe.title.toLowerCase()} macros`] : []),
      "easy american dinner",
      "healthy weeknight recipe",
      "forksavvy recipes",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${recipe.title} - Ready in ${totalMinutes} Min`,
      description: recipe.description,
      images: [{ url: fullImageUrl, width: 1200, height: 800, alt: recipe.title }],
      type: "article",
      publishedTime: recipe.datePublished,
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.tagline,
      images: [fullImageUrl],
    },
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  // Related recipes: Use a circular ring window around the current recipe so every recipe gets incoming internal links
  const candidatePool = RECIPES.filter(
    (r) =>
      r.slug === recipe.slug ||
      (recipe.copycatChainSlug && r.copycatChainSlug === recipe.copycatChainSlug) ||
      r.category === recipe.category ||
      r.appliance === recipe.appliance
  );
  const currentIdxInPool = Math.max(0, candidatePool.findIndex((r) => r.slug === recipe.slug));
  const rotatedCandidates: typeof RECIPES = [];
  for (let offset = 1; offset < candidatePool.length; offset++) {
    rotatedCandidates.push(candidatePool[(currentIdxInPool + offset) % candidatePool.length]);
  }
  const sameChainRotated = recipe.copycatChainSlug
    ? rotatedCandidates.filter((r) => r.copycatChainSlug === recipe.copycatChainSlug)
    : [];
  const otherRotated = rotatedCandidates.filter(
    (r) => !sameChainRotated.some((c) => c.slug === r.slug)
  );
  const relatedRecipes = [...sameChainRotated, ...otherRotated].slice(0, 6);

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
