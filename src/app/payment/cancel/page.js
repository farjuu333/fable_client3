import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <span className="text-8xl">❌</span>
        <h1 className="text-3xl font-bold text-gray-700 mt-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 mt-2">Your payment was not completed.</p>
        <Link href="/browse" className="btn btn-primary mt-6">
          Back to Browse
        </Link>
      </div>
    </div>
  );
}
