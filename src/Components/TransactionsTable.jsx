"use client";

export default function TransactionsTable({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="text-left p-3 font-medium">ID</th>
            <th className="text-left p-3 font-medium">User</th>
            <th className="text-left p-3 font-medium">Type</th>
            <th className="text-left p-3 font-medium">Ebook</th>
            <th className="text-left p-3 font-medium">Amount</th>
            <th className="text-left p-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, i) => (
            <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="p-3 font-mono text-xs text-gray-500">
                {txn.transactionId?.slice(-8) || "N/A"}
              </td>
              <td className="p-3 text-gray-700">{txn.userEmail}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    txn.type === "purchase"
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {txn.type}
                </span>
              </td>
              <td className="p-3 text-gray-700">{txn.ebookTitle || "-"}</td>
              <td className="p-3 font-semibold text-emerald-800">
                ${txn.amount}
              </td>
              <td className="p-3 text-gray-500">
                {new Date(txn.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
