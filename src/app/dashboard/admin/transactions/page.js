"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ShoppingCart, FileText } from "lucide-react";
import TransactionsTable from "@/Components/TransactionsTable";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-emerald-800"></span>
      </div>
    );
  }

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const purchaseCount = transactions.filter(
    (t) => t.type === "purchase",
  ).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-7 h-7 text-emerald-800" />
            All Transactions
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Total {transactions.length} transactions
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total Revenue",
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: "bg-green-500",
          },
          {
            label: "Purchases",
            value: purchaseCount,
            icon: ShoppingCart,
            color: "bg-blue-500",
          },
          {
            label: "Total Txns",
            value: transactions.length,
            icon: FileText,
            color: "bg-purple-500",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>


       {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Sales</h3>
          <div className="flex items-end gap-2 h-40">
            {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map(
              (height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-1 bg-emerald-500 rounded-t-md hover:bg-emerald-800 transition cursor-pointer"
                  title={`Month ${i + 1}: ${height} sales`}
                ></motion.div>
              ),
            )}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Genre Chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Ebooks by Genre</h3>
          <div className="space-y-3">
            {[
              { genre: "Fiction", percent: 30, color: "bg-indigo-500" },
              { genre: "Romance", percent: 25, color: "bg-pink-500" },
              { genre: "Sci-Fi", percent: 20, color: "bg-blue-500" },
              { genre: "Mystery", percent: 15, color: "bg-purple-500" },
              { genre: "Fantasy", percent: 10, color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.genre} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-16">{item.genre}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full ${item.color} rounded-full`}
                  ></motion.div>
                </div>
                <span className="text-xs text-gray-500 w-10">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ✅ Reusable Table Component */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Transaction List</h2>
        </div>
        <TransactionsTable transactions={transactions} />{" "}
      </div>
    </div>
  );
}
