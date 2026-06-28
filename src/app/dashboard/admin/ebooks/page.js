"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ToggleLeft, ToggleRight, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminEbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEbooks = () => {
    fetch("https://fable-server3.onrender.com/api/admin/ebooks")
      .then((res) => res.json())
      .then((data) => {
        setEbooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEbooks();
  }, []);

  const toggleStatus = async (id) => {
    await fetch(
      `https://fable-server3.onrender.com/api/admin/ebooks/${id}/toggle-status`,
      {
        method: "PUT",
      },
    );
    fetchEbooks();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this ebook?")) {
      await fetch(
        `https://fable-server3.onrender.com/api/admin/ebooks/${id}`,
        {
          method: "DELETE",
        },
      );
      fetchEbooks();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-emerald-800"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-emerald-800" />
          All Ebooks
        </h1>
        <p className="text-gray-500 text-sm">Total: {ebooks.length}</p>
      </div>

      {ebooks.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>No ebooks found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Writer</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Sold</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.map((ebook) => (
                <tr key={ebook._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-900">
                    {ebook.title}
                  </td>
                  <td className="p-3 text-gray-600">{ebook.writerName}</td>
                  <td className="p-3 font-semibold text-emerald-800">
                    ${ebook.price}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        ebook.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {ebook.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {ebook.sold ? (
                      <span className="text-red-500 text-xs font-semibold">
                        Sold
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Available</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStatus(ebook._id)}
                        className="text-emerald-800 hover:text-indigo-800"
                        title={
                          ebook.status === "published" ? "Unpublish" : "Publish"
                        }
                      >
                        {ebook.status === "published" ? (
                          <ToggleRight className="w-5 h-5" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                      <Link
                        href={`/ebooks/${ebook._id}`}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(ebook._id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
