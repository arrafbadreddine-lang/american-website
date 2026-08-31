"use client";

import React from "react";
import { Scale } from "lucide-react";
import { UnitSystem } from "@/lib/units";

interface UnitSwitcherProps {
  system: UnitSystem;
  onSystemChange: (newSystem: UnitSystem) => void;
}

export default function UnitSwitcher({ system, onSystemChange }: UnitSwitcherProps) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <Scale className="w-4 h-4 text-brand-600" />
        <span>Units:</span>
      </div>

      <div className="inline-flex rounded-lg p-0.5 bg-slate-200/80">
        <button
          onClick={() => onSystemChange("us")}
          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
            system === "us"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          US Customary (Cups/Oz)
        </button>
        <button
          onClick={() => onSystemChange("metric")}
          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
            system === "metric"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Metric (g / ml)
        </button>
      </div>
    </div>
  );
}
