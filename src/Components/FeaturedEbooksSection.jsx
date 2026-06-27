"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function FeaturedEbooksSection() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fable-server3.onrender.com/api/ebooks/featured")
      .then((res) => res.json())
      .then((data) => {
        setEbooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        </div>
      </section>
    );
  }

  if (ebooks.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-600 font-semibold text-sm uppercase tracking-wider"
          >
            ✦ Curated Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mt-2"
          >
            Featured <span className="text-indigo-600">Ebooks</span>
          </motion.h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Handpicked stories from talented writers around the world
          </p>
        </div>

        {/* Ebooks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ebooks.slice(0, 4).map((ebook, i) => (
            <motion.div
              key={ebook._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/ebooks/${ebook._id}`}>
                <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 flex items-center justify-center relative">
                    {ebook.coverImage ? (
                      <img
                        src={ebook.coverImage}
                        alt={ebook.title}
                        className="w-full h-40 object-cover rounded"
                      />
                    ) : (
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                        📖
                      </span>
                    )}
                    <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all duration-300 flex items-center justify-center">
                      <Eye className="w-10 h-10 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="p-5 flex-grow">
                    <h3 className="font-semibold text-base text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {ebook.writerName}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <span className="badge badge-sm bg-indigo-50 text-indigo-600 border-indigo-200">
                        {ebook.genre}
                      </span>
                      <span className="text-indigo-600 font-bold text-lg">
                        ${ebook.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200"
          >
            Browse All Ebooks
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
