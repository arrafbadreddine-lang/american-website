export interface RestaurantChain {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  popularItems: string[];
  averageSavingsPercent: number;
  logoBg: string;
}

export const US_RESTAURANT_CHAINS: RestaurantChain[] = [
  {
    id: "cava",
    slug: "cava",
    name: "CAVA Mediterranean",
    tagline: "Harissa avocado bowls, crazy feta dip, pickled onions, and saffron basmati rice at home.",
    popularItems: ["Harissa Avocado Chicken Bowl", "Crazy Feta Dip", "Saffron Basmati Bowl", "Braised Lamb Bowl"],
    averageSavingsPercent: 74,
    logoBg: "bg-[#183028]",
  },
  {
    id: "raising-canes",
    slug: "raising-canes",
    name: "Raising Cane's",
    tagline: "Legendary 5-ingredient secret Cane's sauce, Texas toast, and crinkle-cut fries.",
    popularItems: ["Famous Cane's Dipping Sauce", "Box Combo Chicken Tenders", "Garlic Butter Texas Toast"],
    averageSavingsPercent: 82,
    logoBg: "bg-[#b91c1c]",
  },
  {
    id: "chipotle",
    slug: "chipotle",
    name: "Chipotle Mexican Grill",
    tagline: "Burrito bowls, cilantro-lime rice, and honey chipotle chicken at home.",
    popularItems: ["Cilantro Lime Brown Rice", "Chicken Al Pastor Bowl", "Fresh Tomato Salsa", "Guacamole"],
    averageSavingsPercent: 72,
    logoBg: "bg-[#451400]",
  },
  {
    id: "chick-fil-a",
    slug: "chick-fil-a",
    name: "Chick-fil-A",
    tagline: "Pickle-brined crispy chicken nuggets, Polynesian sauce, and waffle fries.",
    popularItems: ["Air Fryer Chicken Nuggets", "Polynesian Sauce", "Diet Frosted Lemonade"],
    averageSavingsPercent: 68,
    logoBg: "bg-[#d0102a]",
  },
  {
    id: "panda-express",
    slug: "panda-express",
    name: "Panda Express",
    tagline: "Crispy sweet & tangy orange chicken and Beijing beef without the fryer mess.",
    popularItems: ["Crispy Orange Chicken", "Chow Mein Noodles", "Honey Walnut Shrimp"],
    averageSavingsPercent: 75,
    logoBg: "bg-[#cb2027]",
  },
  {
    id: "starbucks",
    slug: "starbucks",
    name: "Starbucks Breakfast",
    tagline: "Velvety sous-vide bacon Gruyère egg bites and iced brown sugar oatmilk lattes.",
    popularItems: ["Bacon & Gruyère Egg Bites", "Pumpkin Cream Cold Foam", "Lemon Loaf"],
    averageSavingsPercent: 80,
    logoBg: "bg-[#006241]",
  },
  {
    id: "panera-bread",
    slug: "panera-bread",
    name: "Panera Bread",
    tagline: "Broccoli cheddar soup in bread bowls and Fuji apple chicken salads.",
    popularItems: ["Broccoli Cheddar Soup", "Green Passion Smoothie", "Chipotle Chicken Melt"],
    averageSavingsPercent: 70,
    logoBg: "bg-[#597811]",
  },
  {
    id: "sweetgreen",
    slug: "sweetgreen",
    name: "Sweetgreen",
    tagline: "Warm harvest bowls, crispy rice salads, blackened chicken, and creamy balsamic vinaigrette.",
    popularItems: ["Warm Harvest Bowl", "Crispy Rice Salad", "Kale Caesar Bowl", "Hot Honey Chicken"],
    averageSavingsPercent: 78,
    logoBg: "bg-[#1e3932]",
  },
  {
    id: "wingstop",
    slug: "wingstop",
    name: "Wingstop",
    tagline: "Crispy lemon pepper tenders, homemade garlic ranch, and seasoned voodoo fries.",
    popularItems: ["Lemon Pepper Chicken Tenders", "Famous House Garlic Ranch", "Louisiana Rub Wings"],
    averageSavingsPercent: 76,
    logoBg: "bg-[#0b5345]",
  },
];
