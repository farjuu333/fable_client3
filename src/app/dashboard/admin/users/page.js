"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { Users, Trash2, Shield, Mail } from "lucide-react";

export default function AdminUsersPage() {
  const { data: session } = authClient.useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    fetch("https://fable-server3.onrender.com/api/dashboard/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (email, newRole) => {
    await fetch("https://fable-server3.onrender.com/api/admin/users/role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role: newRole }),
    });
    fetchUsers();
  };

  const handleDelete = async (email) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await fetch(
        `https://fable-server3.onrender.com/api/admin/users?email=${email}`,
        {
          method: "DELETE",
        },
      );
      setUsers(users.filter((u) => u.email !== email));
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-8 h-8 text-emerald-800" />
            Manage Users
          </h1>
          <p className="text-gray-500 mt-1">
            Total {users.length} registered users
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.length > 0 ? (
          users.map((user, i) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-emerald-800 font-bold text-lg">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(user.email)}
                  className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                  title="Delete user"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <select
                    value={user.role || "user"}
                    onChange={(e) =>
                      handleRoleChange(user.email, e.target.value)
                    }
                    className="select select-bordered select-sm text-xs"
                  >
                    <option value="user">👤 User</option>
                    <option value="writer">✍️ Writer</option>
                    <option value="admin">🛡️ Admin</option>
                  </select>
                </div>
                <span className="text-[10px] text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
