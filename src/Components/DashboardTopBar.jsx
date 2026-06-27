"use client";

import { Search, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardTopBar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const firstName = session?.user?.name?.split(" ")[0] || "User";

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      router.push(
        `/browse?search=${encodeURIComponent(e.target.value.trim())}`,
      );
    }
  };

  return (
    <div className="flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search ebooks, writers, genres..."
          className="input input-bordered w-full pl-12 pr-4 py-2.5 rounded-xl bg-gray-50 focus:bg-white transition"
          onKeyDown={handleSearch}
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-500" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-indigo-400"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              {firstName[0].toUpperCase()}
            </div>
          )}
          <div className="hidden sm:block">
            <p className="font-semibold text-sm text-gray-900">
              {session?.user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {session?.user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
