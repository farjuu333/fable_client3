"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,

        role: form.role,
        additionalData: {
          role: form.role,
        },
      });

      if (res?.error) {
        setError(res.error.message);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body p-6">
          <h2 className="text-2xl font-bold text-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-4">
            Join Fable and start reading
          </p>

          {error && (
            <div className="alert alert-error text-sm py-2 mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs font-semibold">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="form-control">
              <label className="label text-xs font-semibold">Role</label>
              <select
                name="role"
                className="select select-bordered w-full"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">Reader</option>
                <option value="writer">Writer</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="divider text-xs text-gray-400">OR</div>

          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={handleGoogleSignUp}
          >
            Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
