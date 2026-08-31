export interface ParsedIngredient {
  original: string;
  amount: number | null;
  unit: string | null;
  name: string;
  notes?: string;
}

// Convert fractional string to decimal number (e.g. "1 1/2" -> 1.5, "3/4" -> 0.75)
export function parseFraction(fractionStr: string): number {
  const trimmed = fractionStr.trim();
  if (!trimmed) return 1;

  if (trimmed.includes(" ")) {
    const parts = trimmed.split(" ");
    if (parts.length === 2) {
      return parseFraction(parts[0]) + parseFraction(parts[1]);
    }
  }

  if (trimmed.includes("/")) {
    const [num, den] = trimmed.split("/").map(Number);
    if (den && !isNaN(num) && !isNaN(den)) {
      return num / den;
    }
  }

  const num = parseFloat(trimmed);
  return isNaN(num) ? 1 : num;
}

// Convert decimal number back to pretty fraction (e.g. 1.5 -> "1 1/2", 0.75 -> "3/4", 2 -> "2")
export function formatFraction(val: number): string {
  if (val <= 0) return "0";
  const tolerance = 0.05;

  const whole = Math.floor(val);
  const remainder = val - whole;

  const fractions: [number, string][] = [
    [1 / 8, "1/8"],
    [1 / 4, "1/4"],
    [1 / 3, "1/3"],
    [3 / 8, "3/8"],
    [1 / 2, "1/2"],
    [5 / 8, "5/8"],
    [2 / 3, "2/3"],
    [3 / 4, "3/4"],
    [7 / 8, "7/8"],
  ];

  let bestFraction = "";
  for (const [fracVal, str] of fractions) {
    if (Math.abs(remainder - fracVal) < tolerance) {
      bestFraction = str;
      break;
    }
  }

  if (remainder < tolerance) {
    return whole.toString();
  }

  if (Math.abs(remainder - 1) < tolerance) {
    return (whole + 1).toString();
  }

  if (bestFraction) {
    return whole > 0 ? `${whole} ${bestFraction}` : bestFraction;
  }

  // fallback rounded decimal
  return val.toFixed(1).replace(/\.0$/, "");
}

// Regular expression to extract quantity and unit from standard ingredient lines
const INGREDIENT_REGEX = /^([\d\s\/\.\-]+)?\s*(cups?|c\.|tbsp?|tablespoons?|tbs\.|tsp?|teaspoons?|oz\.?|ounces?|lbs?\.?|pounds?|grams?|g|ml|l|liters?|cloves?|slices?|cans?|pinch(?:es)?|stalks?|pkg\.?|packages?|handfuls?)?\s*(.*)$/i;

export function parseIngredient(rawText: string): ParsedIngredient {
  const match = rawText.match(INGREDIENT_REGEX);
  if (!match) {
    return {
      original: rawText,
      amount: null,
      unit: null,
      name: rawText,
    };
  }

  const amountStr = match[1]?.trim();
  const unitStr = match[2]?.trim().toLowerCase();
  const nameStr = match[3]?.trim();

  const amount = amountStr ? parseFraction(amountStr) : null;

  return {
    original: rawText,
    amount,
    unit: unitStr || null,
    name: nameStr || rawText,
  };
}

export type UnitSystem = "us" | "metric";

// Conversion table for US Imperial to Metric
export function convertUnit(
  amount: number | null,
  unit: string | null,
  name: string,
  targetSystem: UnitSystem,
  scale: number = 1
): { displayAmount: string; displayUnit: string; name: string } {
  if (amount === null) {
    return { displayAmount: "", displayUnit: "", name };
  }

  const scaledAmount = amount * scale;
  const lowerUnit = unit ? unit.toLowerCase().replace(/\.$/, "") : "";

  if (targetSystem === "us") {
    // Render US Imperial
    return {
      displayAmount: formatFraction(scaledAmount),
      displayUnit: unit ? formatUnitPlural(scaledAmount, lowerUnit) : "",
      name,
    };
  }

  // Target system is METRIC
  switch (lowerUnit) {
    case "cup":
    case "cups":
    case "c":
      // 1 cup is ~240ml for liquids, ~125g for dry flour/sugar
      if (name.toLowerCase().includes("flour") || name.toLowerCase().includes("sugar") || name.toLowerCase().includes("oats")) {
        const grams = Math.round(scaledAmount * 125);
        return { displayAmount: `${grams}`, displayUnit: "g", name };
      }
      const ml = Math.round(scaledAmount * 240);
      return { displayAmount: `${ml}`, displayUnit: "ml", name };

    case "tbsp":
    case "tablespoon":
    case "tablespoons":
      return { displayAmount: `${Math.round(scaledAmount * 15)}`, displayUnit: "ml", name };

    case "tsp":
    case "teaspoon":
    case "teaspoons":
      return { displayAmount: `${Math.round(scaledAmount * 5)}`, displayUnit: "ml", name };

    case "oz":
    case "ounce":
    case "ounces":
      return { displayAmount: `${Math.round(scaledAmount * 28.35)}`, displayUnit: "g", name };

    case "lb":
    case "lbs":
    case "pound":
    case "pounds":
      if (scaledAmount >= 2) {
        return { displayAmount: `${(scaledAmount * 0.453).toFixed(1)}`, displayUnit: "kg", name };
      }
      return { displayAmount: `${Math.round(scaledAmount * 453.6)}`, displayUnit: "g", name };

    default:
      // Units like cloves, cans, slices remain same
      return {
        displayAmount: formatFraction(scaledAmount),
        displayUnit: unit ? formatUnitPlural(scaledAmount, lowerUnit) : "",
        name,
      };
  }
}

function formatUnitPlural(amount: number, unit: string): string {
  if (amount <= 1) {
    return unit;
  }
  if (unit === "cup") return "cups";
  if (unit === "tablespoon") return "tablespoons";
  if (unit === "teaspoon") return "teaspoons";
  if (unit === "ounce") return "oz";
  if (unit === "pound") return "lbs";
  if (unit === "clove") return "cloves";
  if (unit === "slice") return "slices";
  if (unit === "can") return "cans";
  return unit;
}
