"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const genres = [
  { name: "Fiction", icon: "📚", color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Mystery", icon: "🔍", color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Romance", icon: "💕", color: "text-pink-600", bg: "bg-pink-50" },
  { name: "Sci-Fi", icon: "🚀", color: "text-emerald-800", bg: "bg-indigo-50" },
  { name: "Fantasy", icon: "🧙", color: "text-amber-600", bg: "bg-amber-50" },
  { name: "Horror", icon: "👻", color: "text-red-600", bg: "bg-red-50" },
  { name: "Thriller", icon: "🎯", color: "text-teal-600", bg: "bg-teal-50" },
  { name: "Poetry", icon: "🎭", color: "text-rose-600", bg: "bg-rose-50" },
];

export default function GenresSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Browse by <span className="text-emerald-800">Genre</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {genres.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Link
                href={`/browse?genre=${genre.name}`}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${genre.bg} mb-3`}
                >
                  <span className="text-2xl">{genre.icon}</span>
                </div>
                <span className="font-medium text-gray-700 text-sm">
                  {genre.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
