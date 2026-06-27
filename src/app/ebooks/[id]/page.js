"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Tag,
  User,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function EbookDetailsPage() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();

  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Fetch ebook data
  useEffect(() => {
    setLoading(true);
    fetch(`https://fable-server3.onrender.com/api/ebooks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setEbook(data);
        } else {
          setEbook(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setEbook(null);
        setLoading(false);
      });
  }, [id]);

  // Check if ebook is bookmarked by current user
  useEffect(() => {
    if (session?.user?.email && ebook?._id) {
      fetch(
        `https://fable-server3.onrender.com/api/bookmarks?email=${session.user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const already = data.some((item) => item._id === ebook._id);
          setIsBookmarked(already);
        })
        .catch(() => {});
    }
  }, [session, ebook]);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ebookId: ebook._id,
          price: ebook.price,
          title: ebook.title,
          userEmail: session?.user?.email || "",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleBookmark = async () => {
    const email = session?.user?.email;
    if (!email) {
      alert("Please login first");
      return;
    }
    try {
      if (isBookmarked) {
        await fetch(
          `https://fable-server3.onrender.com/api/bookmarks?email=${email}&ebookId=${ebook._id}`,
          {
            method: "DELETE",
          },
        );
        setIsBookmarked(false);
      } else {
        await fetch("https://fable-server3.onrender.com/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, ebookId: ebook._id }),
        });
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  // Skeleton Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl p-8 animate-pulse">
            <div className="h-6 w-24 bg-gray-200 rounded mb-6"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-64 h-80 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-10 w-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not Found
  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <span className="text-8xl block mb-4">📭</span>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Ebook Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The ebook you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            <BookOpen className="w-5 h-5" />
            Browse Ebooks
          </Link>
        </div>
      </div>
    );
  }

  const uploadDate = new Date(ebook.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Cover */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full md:w-64 flex-shrink-0"
              >
                <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 flex items-center justify-center shadow-lg">
                  {ebook.coverImage ? (
                    <img
                      src={ebook.coverImage}
                      alt={ebook.title}
                      className="w-full h-72 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-8xl">📖</span>
                  )}
                  {ebook.sold && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Sold
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Details */}
              <div className="flex-1 space-y-5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${ebook.sold ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}
                    >
                      {ebook.sold ? "Sold" : "Available"}
                    </span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-200">
                      {ebook.genre}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {ebook.title}
                  </h1>
                </div>

                <div className="inline-flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{ebook.writerName}</span>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {ebook.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Uploaded: {uploadDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{ebook.genre}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      ${ebook.price}
                    </p>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    {!ebook.sold ? (
                      <button
                        onClick={handlePurchase}
                        disabled={isPurchasing}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg disabled:opacity-50"
                      >
                        {isPurchasing ? (
                          <>
                            <span className="loading loading-spinner loading-sm"></span>{" "}
                            Processing...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" /> Buy Now
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-300 text-gray-500 font-semibold rounded-xl cursor-not-allowed"
                      >
                        Already Purchased
                      </button>
                    )}

                    <button
                      onClick={handleBookmark}
                      className={`p-3 rounded-xl border-2 transition-all ${isBookmarked ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-200 bg-white text-gray-400 hover:border-indigo-300"}`}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
