"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client.js";
import { ImBook } from "react-icons/im"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const userRole = session?.user?.role || "user";

  const isActive = (path) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const getDashboardLink = () => {
    if (userRole === "admin") return "/dashboard/admin";
    if (userRole === "writer") return "/dashboard/writer";
    return "/dashboard/user";
  };

  const firstName = session?.user?.name?.split(" ")[0] || "User";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="bg-emerald-800 text-white py-2.5  text-sm font-bold shadow-sm">
        <marquee scrollamount="5" className="tracking-wide">
          ✨ Welcome to Fable! Discover & Read Original Ebooks from Talented Global Writers 📚 | ✍️ Join as a Writer, Publish Your Masterpiece with Secure One-Time Verification Pay 🚀 | 💳 Fast, Safe & Seamless Transactions Powered by Stripe Gateway!
        </marquee>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-14">
          {/* Logo */}

          <Link href="/" className="flex items-center ">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0070F3]/10 text-emerald-800">
                  <ImBook className="text-xl" />
                </div>
            <span className="text-2xl font-bold text-emerald-800">Fable</span>
          </Link>

          {/* Desktop Menu */}
          {!isPending && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`text-gray-700 hover:text-emerald-800 ${isActive("/") ? "text-emerald-800 font-semibold" : ""}`}
              >
                Home
              </Link>
              <Link
                href="/browse"
                className={`text-gray-700 hover:text-emerald-800 ${isActive("/browse") ? "text-emerald-800 font-semibold" : ""}`}
              >
                Browse Ebooks
              </Link>
              {isLoggedIn && (
                <Link
                  href={getDashboardLink()}
                  className={`text-gray-700 hover:text-emerald-800 ${isActive("/dashboard") ? "text-emerald-800 font-semibold" : ""}`}
                >
                  Dashboard
                </Link>
              )}

              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-7 h-7 rounded-full border border-indigo-400"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                        {firstName[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {firstName}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-emerald-800 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-emerald-800 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-800 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && !isPending && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/"
              className={`block ${isActive("/") ? "text-emerald-800 font-semibold" : "text-gray-700"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/browse"
              className={`block ${isActive("/browse") ? "text-emerald-800 font-semibold" : "text-gray-700"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Ebooks
            </Link>

            {isLoggedIn && (
              <Link
                href={getDashboardLink()}
                className={`block ${isActive("/dashboard") ? "text-emerald-800 font-semibold" : "text-gray-700"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {isLoggedIn ? (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="User"
                      className="w-7 h-7 rounded-full"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                      {firstName[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {firstName}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left text-red-500 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <Link
                  href="/login"
                  className="block text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block bg-emerald-800 text-white px-4 py-2 rounded-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
