import { NextResponse } from "next/server";
import { RECIPES } from "@/data/recipes";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const baseUrl = "https://forksavvyrecipes.com";

  // Sort recipes newest first
  const sortedRecipes = [...RECIPES].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );

  const lastBuildDate = sortedRecipes.length > 0 
    ? new Date(sortedRecipes[0].datePublished).toUTCString()
    : new Date().toUTCString();

  const itemsXml = sortedRecipes
    .map((recipe) => {
      const recipeUrl = `${baseUrl}/recipes/${recipe.slug}`;
      const imageUrl = recipe.image.startsWith("http")
        ? recipe.image
        : `${baseUrl}${recipe.image}`;
      const pubDate = new Date(recipe.datePublished).toUTCString();

      const ingredientsList = recipe.ingredients
        .map((ing) => `<li>${escapeXml(ing)}</li>`)
        .join("");

      const contentHtml = `
        <p>${escapeXml(recipe.description)}</p>
        <p><strong>Prep Time:</strong> ${recipe.prepTimeMinutes} mins | <strong>Cook Time:</strong> ${recipe.cookTimeMinutes} mins | <strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Nutrition (per serving):</strong> ${recipe.nutrition.calories} Calories, ${recipe.nutrition.proteinGrams}g Protein, ${recipe.nutrition.carbsGrams}g Carbs, ${recipe.nutrition.fatGrams}g Fat</p>
        <h3>Ingredients</h3>
        <ul>${ingredientsList}</ul>
        <p><a href="${recipeUrl}">View full step-by-step instructions and interactive timers on ForkSavvy Recipes</a></p>
      `.trim();

      return `
    <item>
      <title><![CDATA[${recipe.title}]]></title>
      <link>${recipeUrl}</link>
      <guid isPermaLink="true">${recipeUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${recipe.tagline} - ${recipe.description}]]></description>
      <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
      <category><![CDATA[${recipe.category}]]></category>
      <enclosure url="${imageUrl}" type="image/jpeg" length="0" />
      <media:content url="${imageUrl}" medium="image" type="image/jpeg">
        <media:title><![CDATA[${recipe.title}]]></media:title>
      </media:content>
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>ForkSavvy Recipes | Fast American Dinners, Zero Fluff</title>
    <link>${baseUrl}</link>
    <description>Zero fluff, high-protein, air fryer, Ninja Creami, and restaurant copycat recipes with interactive timers and USDA nutrition facts.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>ForkSavvy Recipes</title>
      <link>${baseUrl}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`.trim();

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
