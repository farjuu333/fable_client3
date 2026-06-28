"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import WriterEbookTable from "@/Components/WriterEbookTable";

export default function WriterEbooksPage() {
  const { data: session } = authClient.useSession();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `http://localhost:5000/api/dashboard/writer/ebooks?writerEmail=${session.user.email}`,
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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6"> My Ebooks</h1>

      <WriterEbookTable
        ebooks={ebooks}
        onUpdate={(updated) => {
          setEbooks(
            ebooks.map((e) =>
              e._id === updated._id ? { ...e, ...updated } : e,
            ),
          );
        }}
        onDelete={async (id) => {
          await fetch(
            `http://localhost:5000/api/ebooks/${id}`,
            {
              method: "DELETE",
            },
          );
          setEbooks(ebooks.filter((e) => e._id !== id));
        }}
      />
    </div>
  );
}
