"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import EbookTable from "@/Components/EbookTable";

export default function PurchaseHistoryPage() {
  const { data: session } = authClient.useSession();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `https://fable-server3.onrender.com/api/dashboard/user/purchases?email=${session.user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setEbooks(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-emerald-800"></span>
      </div>
    );
  }

  return (
    <EbookTable
      ebooks={ebooks}
      title="📋 Purchase History"
      emptyMessage="No purchase history yet."
      showStatus={true}
    />
  );
}
