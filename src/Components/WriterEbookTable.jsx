"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function WriterEbookTable({ ebooks, onUpdate, onDelete }) {
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    genre: "Fiction",
    status: "published",
  });
  const [saving, setSaving] = useState(false);

  const openEdit = (ebook) => {
    setEditModal(ebook._id);
    setEditForm({
      title: ebook.title,
      description: ebook.description,
      price: ebook.price,
      genre: ebook.genre,
      status: ebook.status,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setSaving(true);
    await fetch(
      `https://fable-server3.onrender.com/api/ebooks/${editModal}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      },
    );
    if (onUpdate) onUpdate({ ...editForm, _id: editModal });
    setEditModal(null);
    setSaving(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">My Ebooks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Sales</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.length > 0 ? (
                ebooks.map((ebook, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium text-gray-900">
                      {ebook.title}
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
                    <td className="p-3 text-emerald-800 font-semibold">
                      ${ebook.price}
                    </td>
                    <td className="p-3">{ebook.salesCount || 0}</td>
                    <td className="p-3 text-gray-500">
                      {new Date(ebook.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(ebook)}
                          className="text-xs text-emerald-800 hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this ebook?",
                              )
                            ) {
                              onDelete && onDelete(ebook._id);
                            }
                          }}
                          className="text-xs text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">
                    No ebooks yet. Click &quot;+ Add New Ebook&quot; to publish
                    your first ebook!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Edit Ebook</h2>
              <button
                onClick={() => setEditModal(null)}
                className="cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Title</label>
                <input
                  name="title"
                  className="input input-bordered w-full"
                  value={editForm.title}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Description</label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full h-24"
                  value={editForm.description}
                  onChange={handleEditChange}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="input input-bordered w-full"
                    value={editForm.price}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Genre</label>
                  <select
                    name="genre"
                    className="select select-bordered w-full"
                    value={editForm.genre}
                    onChange={handleEditChange}
                  >
                    <option>Fiction</option>
                    <option>Mystery</option>
                    <option>Romance</option>
                    <option>Sci-Fi</option>
                    <option>Fantasy</option>
                    <option>Horror</option>
                    <option>Thriller</option>
                    <option>Poetry</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold">Status</label>
                <select
                  name="status"
                  className="select select-bordered w-full"
                  value={editForm.status}
                  onChange={handleEditChange}
                >
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="btn btn-primary w-full"
              >
                {saving ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Update Ebook"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
