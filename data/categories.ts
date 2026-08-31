export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  group: "appliance" | "diet" | "speed-budget" | "meal" | "copycat";
  searchVolumeHint: string;
  heroImage: string;
}

export const CATEGORIES: CategoryItem[] = [
  // Appliance-specific (High Volume, Ultra-Low Competition)
  {
    id: "air-fryer",
    slug: "air-fryer",
    name: "Air Fryer Recipes",
    description: "Crispy, fast, and oil-free American favorites made in 20 minutes or less.",
    iconName: "Flame",
    group: "appliance",
    searchVolumeHint: "1.2M searches/mo",
    heroImage: "/recipes/parmesan-chicken-tenders.jpg",
  },
  {
    id: "ninja-creami",
    slug: "ninja-creami",
    name: "Ninja Creami & Frozen Treats",
    description: "High-protein ice creams, sorbets, and low-calorie soft serves.",
    iconName: "Sparkles",
    group: "appliance",
    searchVolumeHint: "450k searches/mo",
    heroImage: "/recipes/vanilla-protein-ice-cream.jpg",
  },
  {
    id: "sheet-pan",
    slug: "sheet-pan",
    name: "Sheet Pan & One-Pan Dinners",
    description: "Full family dinners cooked on a single tray with 5-minute cleanup.",
    iconName: "Utensils",
    group: "appliance",
    searchVolumeHint: "380k searches/mo",
    heroImage: "/recipes/cajun-sheet-pan-sausage.jpg",
  },
  {
    id: "slow-cooker",
    slug: "slow-cooker",
    name: "Crockpot & Slow Cooker",
    description: "Dump-and-go hearty stews, tender shredded meats, and crowd-pleasers.",
    iconName: "Clock",
    group: "appliance",
    searchVolumeHint: "800k searches/mo",
    heroImage: "/recipes/zuppa-toscana.jpg",
  },

  // Speed & Budget (High Conversion & High Retention)
  {
    id: "under-3-dollars",
    slug: "under-3-dollars",
    name: "Dinners Under $3 / Serving",
    description: "Budget-busting delicious meals using affordable pantry staples.",
    iconName: "DollarSign",
    group: "speed-budget",
    searchVolumeHint: "290k searches/mo",
    heroImage: "/recipes/black-bean-quesadillas.jpg",
  },
  {
    id: "15-minute-meals",
    slug: "15-minute-meals",
    name: "15-Minute Express Dinners",
    description: "From fridge to table in 15 minutes flat for busy weeknights.",
    iconName: "Zap",
    group: "speed-budget",
    searchVolumeHint: "620k searches/mo",
    heroImage: "/recipes/sesame-garlic-beef-noodles.jpg",
  },

  // Macro & Dietary (High Intent & High Loyalty)
  {
    id: "high-protein",
    slug: "high-protein",
    name: "High Protein (35g+)",
    description: "Muscle-building, satiety-packed meals without sacrificing flavor.",
    iconName: "Activity",
    group: "diet",
    searchVolumeHint: "750k searches/mo",
    heroImage: "/recipes/garlic-steak-bites.jpg",
  },
  {
    id: "gluten-free",
    slug: "gluten-free",
    name: "100% Gluten-Free",
    description: "Celiac-safe comfort foods, baked goods, and savory copycats.",
    iconName: "ShieldCheck",
    group: "diet",
    searchVolumeHint: "540k searches/mo",
    heroImage: "/recipes/cava-harissa-bowl.jpg",
  },
  {
    id: "keto-low-carb",
    slug: "keto-low-carb",
    name: "Keto & Under 10g Net Carbs",
    description: "Ketogenic recipes loaded with healthy fats and bold flavors.",
    iconName: "Award",
    group: "diet",
    searchVolumeHint: "410k searches/mo",
    heroImage: "/recipes/hot-honey-salmon.jpg",
  },

  // Restaurant Copycats (Viral Discovery Engine)
  {
    id: "chain-copycats",
    slug: "chain-copycats",
    name: "Restaurant Copycat Classics",
    description: "Exact taste of Chipotle, Chick-fil-A, and Panda Express at 1/4 the price.",
    iconName: "Store",
    group: "copycat",
    searchVolumeHint: "950k searches/mo",
    heroImage: "/recipes/canes-sauce.jpg",
  },
];
