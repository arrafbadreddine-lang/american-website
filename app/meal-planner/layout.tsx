import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Budget & Macro Meal Planner",
  description: "Plan 7 days of fast, high-protein American dinners under $3.50/serving and export a consolidated grocery list.",
  alternates: {
    canonical: "https://forksavvyrecipes.com/meal-planner",
  },
};

export default function MealPlannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
