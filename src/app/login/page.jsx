"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: "/",
      });

      if (res?.error) {
        setError(res.error.message || "Invalid email or password");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body p-6">
          <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
          <p className="text-center text-sm text-gray-500 mb-4">
            Welcome back to Fable
          </p>

          {error && (
            <div className="alert alert-error text-sm py-2 mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label text-xs font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="divider text-xs text-gray-400">OR</div>

          <button
            className="btn btn-outline w-full"
            onClick={() => signIn.social({ provider: "google" })}
          >
            Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            Don&;t have an account?{" "}
            <Link href="/register" className="link link-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
