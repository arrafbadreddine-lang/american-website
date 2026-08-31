"use client";

import React from "react";
import { Users, Minus, Plus } from "lucide-react";

interface PortionMultiplierProps {
  baseServings: number;
  currentServings: number;
  onServingsChange: (newServings: number) => void;
}

export default function PortionMultiplier({
  baseServings,
  currentServings,
  onServingsChange,
}: PortionMultiplierProps) {
  const multipliers = [
    { label: "1x", value: baseServings },
    { label: "2x", value: baseServings * 2 },
    { label: "Half", value: Math.max(1, Math.round(baseServings / 2)) },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <Users className="w-4 h-4 text-brand-600" />
        <span>Servings:</span>
      </div>

      <div className="flex items-center bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
        <button
          onClick={() => onServingsChange(Math.max(1, currentServings - 1))}
          className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors"
          title="Decrease servings"
          aria-label="Decrease servings"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="px-3 py-1 font-bold text-sm text-slate-900 min-w-[2.5rem] text-center">
          {currentServings}
        </span>

        <button
          onClick={() => onServingsChange(Math.min(24, currentServings + 1))}
          className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors"
          title="Increase servings"
          aria-label="Increase servings"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Preset quick buttons */}
      <div className="flex items-center gap-1">
        {multipliers.map((m) => (
          <button
            key={m.label}
            onClick={() => onServingsChange(m.value)}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
              currentServings === m.value
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
