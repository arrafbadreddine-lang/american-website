export interface RecipeSchemaInput {
  title: string;
  description: string;
  image: string;
  authorName?: string;
  datePublished?: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes?: number;
  servings: number;
  category: string;
  cuisine: string;
  keywords: string[];
  ingredients: string[];
  instructions: { step: number; title?: string; text: string }[];
  nutrition: {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    fiberGrams?: number;
    sugarGrams?: number;
    sodiumMg?: number;
  };
  ratingValue?: number;
  reviewCount?: number;
  url: string;
}

export function generateRecipeJsonLd(recipe: RecipeSchemaInput) {
  const formatIsoDuration = (minutes: number) => `PT${minutes}M`;
  const totalMinutes = recipe.totalTimeMinutes || recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.title,
    image: [recipe.image],
    author: {
      "@type": "Person",
      name: recipe.authorName || "Chef & Nutrition Team",
    },
    datePublished: recipe.datePublished || "2026-01-15",
    description: recipe.description,
    prepTime: formatIsoDuration(recipe.prepTimeMinutes),
    cookTime: formatIsoDuration(recipe.cookTimeMinutes),
    totalTime: formatIsoDuration(totalMinutes),
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    keywords: recipe.keywords.join(", "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: recipe.ratingValue || 4.9,
      reviewCount: recipe.reviewCount || 128,
    },
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.proteinGrams} g`,
      carbohydrateContent: `${recipe.nutrition.carbsGrams} g`,
      fatContent: `${recipe.nutrition.fatGrams} g`,
      fiberContent: recipe.nutrition.fiberGrams ? `${recipe.nutrition.fiberGrams} g` : undefined,
      sugarContent: recipe.nutrition.sugarGrams ? `${recipe.nutrition.sugarGrams} g` : undefined,
      sodiumContent: recipe.nutrition.sodiumMg ? `${recipe.nutrition.sodiumMg} mg` : undefined,
      servingSize: "1 serving",
    },
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((inst, idx) => ({
      "@type": "HowToStep",
      name: inst.title || `Step ${idx + 1}`,
      text: inst.text,
      position: idx + 1,
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": recipe.url,
    },
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
