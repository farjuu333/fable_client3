"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("processing");

  console.log("Session ID from URL:", sessionId);

  useEffect(() => {
    if (sessionId) {
      fetch("http://localhost:5000/api/complete-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStatus("completed");
          } else {
            setStatus("error");
          }
        })
        .catch((err) => {
          setStatus("error");
        });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-3xl font-bold text-green-700 mt-4">
          Payment Successful!
        </h1>
        {status === "processing" && (
          <p className="text-gray-500 mt-2">Finalizing your purchase...</p>
        )}
        {status === "completed" && (
          <>
            <p className="text-gray-500 mt-2">
              Your ebook has been added to your library.
            </p>
            <Link href="/dashboard/user" className="btn btn-primary mt-6">
              Go to Dashboard
            </Link>
          </>
        )}
        {status === "error" && (
          <p className="text-red-500 mt-2">
            Something went wrong during finalization. Please contact support.
          </p>
        )}
      </div>
    </div>
  );
}
