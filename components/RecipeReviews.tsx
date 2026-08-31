"use client";

import React, { useState } from "react";
import { Star, MessageSquare, CheckCircle2, User, ThumbsUp } from "lucide-react";

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
  verifiedCook?: boolean;
}

interface RecipeReviewsProps {
  recipeTitle: string;
  initialRating: number;
  initialReviewCount: number;
}

export default function RecipeReviews({
  recipeTitle,
  initialRating,
  initialReviewCount,
}: RecipeReviewsProps) {
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: "rev-1",
      author: "Sarah M. (Austin, TX)",
      rating: 5,
      date: "3 days ago",
      comment: `Made this for my family last night and it was an absolute hit! Tasted identical to the restaurant version and the 15-minute timer feature in Cook Mode was super helpful.`,
      helpfulCount: 5,
      verifiedCook: true,
    },
    {
      id: "rev-2",
      author: "David K. (Chicago, IL)",
      rating: 5,
      date: "1 week ago",
      comment: `The portion scaling feature is fantastic. I doubled the ingredients for my meal prep containers and the macro breakdown matched my fitness goals perfectly.`,
      helpfulCount: 3,
      verifiedCook: true,
    },
    {
      id: "rev-3",
      author: "Jessica R. (Seattle, WA)",
      rating: 5,
      date: "2 weeks ago",
      comment: `Finally a recipe website that doesn't have a 10-page backstory! Straight to the point, crisp instructions, and tasted incredible. 10/10.`,
      helpfulCount: 4,
      verifiedCook: true,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName.trim() ? `${authorName.trim()} (Home Cook)` : "Verified Cook",
      rating: userRating,
      date: "Just now",
      comment: commentText,
      helpfulCount: 1,
      verifiedCook: true,
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setCommentText("");
    setAuthorName("");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-bento space-y-8">
      {/* Header with aggregate score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-amber-600 mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Community Ratings & Reviews</span>
          </div>
          <h3 className="text-2xl font-display font-extrabold text-slate-900">
            Cooks' Feedback for {recipeTitle}
          </h3>
        </div>

        <div className="flex items-center gap-3 bg-amber-50/80 px-4 py-2 rounded-2xl border border-amber-200/60">
          <div className="text-3xl font-display font-black text-amber-900">
            {initialRating.toFixed(1)}
          </div>
          <div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-amber-800 font-semibold">
              Based on {initialReviewCount + reviews.length - 3} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Review Submission Form */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
        <h4 className="font-display font-bold text-slate-900 text-base">
          Did you make this recipe? Leave a Review
        </h4>

        {submitted ? (
          <div className="flex items-center gap-2 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-4 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thank you! Your review has been added to help other home cooks.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Your Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-slate-300 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || userRating) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Your Name (or City)
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Alex (Denver, CO)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Your Experience / Cooking Tips
              </label>
              <textarea
                rows={3}
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="How did it turn out? Any seasoning substitutions or timing tweaks?"
                className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4 pt-2">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    {rev.author}
                    {rev.verifiedCook && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                        ✓ Verified Cook
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>

              <div className="flex text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed pl-10">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
