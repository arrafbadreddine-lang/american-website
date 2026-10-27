import React from "react";
import type { Metadata } from "next";
import { RECIPES } from "@/data/recipes";
import JsonLdSchema from "@/components/JsonLdSchema";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import RecipesDirectoryClient from "./RecipesDirectoryClient";

export const metadata: Metadata = {
  title: "All American Recipes — Air Fryer, Copycats & High-Protein Dinners",
  description: "Browse all tested American recipes on ForkSavvy: crispy air fryer dinners, high-protein Ninja Creami pints, slow cooker soups, and restaurant copycats with USDA nutrition facts.",
  alternates: {
    canonical: "https://forksavvyrecipes.com/recipes",
  },
  openGraph: {
    title: "All American Recipes | ForkSavvy Recipes",
    description: "Browse fast, zero-fluff weeknight dinners, crispy air fryer classics, and restaurant copycats.",
    url: "https://forksavvyrecipes.com/recipes",
  },
};

export default function RecipesDirectoryPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://forksavvyrecipes.com" },
    { name: "All Recipes", url: "https://forksavvyrecipes.com/recipes" },
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All American Recipes",
    description: "Complete directory of tested American recipes on ForkSavvy Recipes.",
    url: "https://forksavvyrecipes.com/recipes",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: RECIPES.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://forksavvyrecipes.com/recipes/${r.slug}`,
        name: r.title,
      })),
    },
  };

  return (
    <>
      <JsonLdSchema data={breadcrumbJsonLd} />
      <JsonLdSchema data={collectionJsonLd} />
      <RecipesDirectoryClient />
    </>
  );
}
