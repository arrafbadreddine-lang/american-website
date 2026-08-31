"use client";

import React, { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, Clock, Eye, Sparkles } from "lucide-react";
import { RecipeInstruction } from "@/data/recipes";

interface CookModeModalProps {
  recipeTitle: string;
  instructions: RecipeInstruction[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CookModeModal({
  recipeTitle,
  instructions,
  isOpen,
  onClose,
}: CookModeModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Timer state
  const currentStep = instructions[currentStepIndex];
  const initialSeconds = (currentStep?.timerMinutes || 0) * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [timerRunning, setTimerRunning] = useState(false);

  // Sync timer when step changes
  useEffect(() => {
    setSecondsRemaining((instructions[currentStepIndex]?.timerMinutes || 0) * 60);
    setTimerRunning(false);
  }, [currentStepIndex, instructions]);

  // Timer interval countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && timerRunning) {
      setTimerRunning(false);
      // Play soft chime sound if possible
      if (typeof window !== "undefined" && "AudioContext" in window) {
        try {
          const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        } catch {
          // ignore audio context errors
        }
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, secondsRemaining]);

  // Request Wake Lock to prevent screen sleep while cooking
  useEffect(() => {
    let wakeLock: any = null;
    if (isOpen && "wakeLock" in navigator) {
      (navigator as any).wakeLock
        ?.request("screen")
        .then((lock: any) => {
          wakeLock = lock;
        })
        .catch(() => {});
    }
    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
      }
    };
  }, [isOpen]);

  if (!isOpen || !currentStep) return null;

  const toggleStepCompleted = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 text-white backdrop-blur-md flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-brand-400 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Distraction-Free Cook Mode
          </span>
          <h2 className="text-lg font-bold font-display text-white line-clamp-1">
            {recipeTitle}
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          aria-label="Exit Cook Mode"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Main Step Content */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto px-6 py-8 overflow-y-auto">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-400 mb-4">
          <span>
            Step {currentStepIndex + 1} of {instructions.length}
          </span>
          <span className="text-brand-400 font-bold">
            {Math.round(((currentStepIndex + 1) / instructions.length) * 100)}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
          <div
            className="bg-brand-500 h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentStepIndex + 1) / instructions.length) * 100}%`,
            }}
          />
        </div>

        {/* Step Title & Description Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {currentStep.title}
            </h3>

            <button
              onClick={() => toggleStepCompleted(currentStep.step)}
              className={`p-2 rounded-xl transition-all ${
                completedSteps.includes(currentStep.step)
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
              title="Mark step complete"
            >
              <CheckCircle2 className="w-6 h-6" />
            </button>
          </div>

          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-light mb-6">
            {currentStep.text}
          </p>

          {/* Pro Chef Tip if present */}
          {currentStep.tip && (
            <div className="bg-amber-950/40 border border-amber-800/40 rounded-2xl p-4 flex items-start gap-3 text-amber-200 text-sm">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-amber-300">Chef's Secret: </strong>
                {currentStep.tip}
              </div>
            </div>
          )}

          {/* Interactive Built-in Timer if step has minutes */}
          {currentStep.timerMinutes && currentStep.timerMinutes > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-brand-950/80 border border-brand-800/60 rounded-xl text-brand-400">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Step Timer
                  </div>
                  <div className="text-3xl font-display font-extrabold text-white">
                    {formatTimer(secondsRemaining)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                    timerRunning
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                      : "bg-brand-500 hover:bg-brand-600 text-white"
                  }`}
                >
                  {timerRunning ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" /> Start Timer
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setSecondsRemaining((currentStep.timerMinutes || 0) * 60);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Step Navigation Bar */}
      <footer className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between max-w-4xl w-full mx-auto">
        <button
          onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
          disabled={currentStepIndex === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Step
        </button>

        {currentStepIndex < instructions.length - 1 ? (
          <button
            onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-brand-500 hover:bg-brand-600 text-white transition-all shadow-lg"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4" /> Finish & Enjoy!
          </button>
        )}
      </footer>
    </div>
  );
}
