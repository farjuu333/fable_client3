"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

import {
  LayoutDashboard,
  ShoppingBag,
  BookOpen,
  Bookmark,
  PenTool,
  DollarSign,
  Users,
  FileText,
  BarChart3,
  ChevronLeft,
  Menu,
  X,
  LogOut,
  Home,
  Image,
} from "lucide-react";
import DashboardTopBar from "@/Components/DashboardTopBar";

import Logo from "@/image/logo.png";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
      return;
    }

    if (session?.user?.role && pathname) {
      const role = session.user.role;

      if (role === "user") {
        if (
          pathname.startsWith("/dashboard/admin") ||
          pathname.startsWith("/dashboard/writer")
        ) {
          router.push("/dashboard/user");
        }
      }

      if (role === "writer") {
        if (pathname.startsWith("/dashboard/admin")) {
          router.push("/dashboard/writer");
        }
      }
    }
  }, [isPending, session, router, pathname]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  if (!session) return null;

  const userRole = session.user?.role || "user";

  // Sidebar links based on role
  const getSidebarLinks = () => {
    switch (userRole) {
      case "admin":
        return [
          { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
          { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
          {
            name: "All Ebooks",
            href: "/dashboard/admin/ebooks",
            icon: BookOpen,
          },
          {
            name: "Transactions",
            href: "/dashboard/admin/transactions",
            icon: DollarSign,
          },
        ];
      case "writer":
        return [
          {
            name: "Overview",
            href: "/dashboard/writer",
            icon: LayoutDashboard,
          },
          {
            name: "My Ebooks",
            href: "/dashboard/writer/ebooks",
            icon: PenTool,
          },
          {
            name: "Add Ebook",
            href: "/dashboard/writer/add-ebook",
            icon: FileText,
          },
          {
            name: "Sales History",
            href: "/dashboard/writer/sales",
            icon: DollarSign,
          },
          {
            name: "Bookmarks",
            href: "/dashboard/writer/bookmarks",
            icon: Bookmark,
          },
        ];
      default:
        return [
          { name: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
          {
            name: "Purchase History",
            href: "/dashboard/user/purchases",
            icon: ShoppingBag,
          },
          {
            name: "My Ebooks",
            href: "/dashboard/user/my-ebooks",
            icon: BookOpen,
          },
          {
            name: "Bookmarks",
            href: "/dashboard/user/bookmarks",
            icon: Bookmark,
          },
        ];
    }
  };

  const sidebarLinks = getSidebarLinks();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center ">
            <Image
              src={Logo}
              width={40}
              height={40}
              alt="Fable"
              className="h-10 w-auto"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span className="text-2xl font-bold text-indigo-600">Fable</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                {session.user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <p className="font-semibold text-sm">{session.user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 mb-1"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar (Mobile) */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="text-xl font-bold">
            Fable
          </Link>
          <div className="w-6"></div>
        </div>

        {/*  Dashboard Top Bar */}
        <div className="hidden lg:block">
          <DashboardTopBar />
        </div>
        {/* Page Content */}
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
