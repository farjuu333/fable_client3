"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FiPenTool } from "react-icons/fi";
import { CgCalendarDates } from "react-icons/cg";

const genres = [
  "All",
  "Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Horror",
  "Thriller",
];

export default function BrowsePage() {
  const [allEbooks, setAllEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEbooks, setTotalEbooks] = useState(0);
  const itemsPerPage = 6;

  // API Fetch
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/ebooks?page=${currentPage}&limit=${itemsPerPage}&sort=${sort}&genre=${genre}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setAllEbooks(data.ebooks || []);
        setTotalPages(data.pages || 1);
        setTotalEbooks(data.total || 0);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [currentPage, sort, genre, search, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Ebooks</h1>
          <p className="text-gray-500 mt-1">Discover your next favorite read</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or writer..."
              className="input input-bordered w-full pl-10 bg-white"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Sort */}
          <select
            className="select select-bordered bg-white"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters && <X className="w-4 h-4" />}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white rounded-xl p-4 mb-6 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Genre
                </label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setGenre(g);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        genre === g
                          ? "bg-emerald-800 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input input-bordered input-sm w-24"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="input input-bordered input-sm w-24"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setGenre("All");
                    setMinPrice("");
                    setMaxPrice("");
                    setSort("newest");
                    setSearch("");
                    setCurrentPage(1);
                  }}
                  className="btn btn-sm btn-ghost text-red-500"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          {totalEbooks} ebook{totalEbooks !== 1 ? "s" : ""} found
        </p>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse"
              >
                <div className="bg-gray-200 p-10"></div>
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : allEbooks.length > 0 ? (
          /* Ebooks Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allEbooks.map((ebook, i) => (
              <motion.div
                key={ebook._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/ebooks/${ebook._id}`}>
                  <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
                    {/* Sold Badge */}
                    {ebook.sold && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] px-3 py-1 rounded-full font-semibold z-10 shadow-lg">
                        Sold Out
                      </div>
                    )}

                    {/* Cover */}
                    <div className="relative overflow-hidden h-48 bg-gradient-to-br from-indigo-50 to-purple-50">
                      {ebook.coverImage ? (
                        <img
                          src={ebook.coverImage}
                          alt={ebook.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-7xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                            📖
                          </span>
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Hover Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                          View Details →
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-600 truncate group-hover:text-emerald-800 transition-colors text-[15px]">
                        {ebook.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">
                        {ebook.description?.slice(0, 80)}...
                      </p>

                      {/* Writer + Date */}
                      <div className="flex items-center justify-between mt-2 text-sm font-semibold text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiPenTool size={14} /> {ebook.writerName}
                        </span>
                        <span className="flex items-center gap-1">
                          <CgCalendarDates />{" "}
                          {new Date(ebook.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </span>
                      </div>

                      {/* Genre + Price */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="px-3 py-1.5 bg-indigo-50 text-emerald-800 rounded-full text-[11px] font-semibold tracking-wide">
                          {ebook.genre}
                        </span>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 uppercase">
                            Price
                          </p>
                          <p className="font-bold text-emerald-800 text-lg leading-tight">
                            ${ebook.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">📭</span>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No ebooks found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-primary" : "btn-outline"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
