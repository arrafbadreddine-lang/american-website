import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://forksavvyrecipes.com"),
  title: {
    default: "ForkSavvy Recipes | Fast American Dinners, Scalable Portions & Real Nutrition",
    template: "%s | ForkSavvy Recipes",
  },
  description: "America's high-speed recipe platform. 15-minute dinners, crispy air fryer classics, viral Ninja Creami pints, and restaurant copycats with instant unit conversions and USDA nutrition facts on ForkSavvyRecipes.com.",
  keywords: [
    "air fryer recipes",
    "ninja creami high protein",
    "chipotle copycat recipe",
    "chick fil a nuggets recipe",
    "15 minute dinner recipes",
    "high protein meal prep",
    "gluten free comfort food",
    "meals under 3 dollars",
    "forksavvy recipes",
    "forksavvyrecipes.com"
  ],
  authors: [{ name: "ForkSavvy Culinary Test Kitchen" }],
  openGraph: {
    title: "ForkSavvy Recipes | Real Food. Zero Fluff.",
    description: "Cook crispy air fryer favorites, macro-balanced high-protein dinners, and copycat classics with instant portion scaling.",
    siteName: "ForkSavvy Recipes",
    locale: "en_US",
    type: "website",
    url: "https://forksavvyrecipes.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ForkSavvy Recipes | Real Food. Zero Fluff.",
    description: "Instant portion multipliers, US/Metric conversions, and accurate nutrition breakdown.",
    site: "@ForkSavvyRecipes",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
