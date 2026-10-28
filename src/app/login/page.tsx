
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setMessage("Cannot connect to the API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5 rounded-2xl border border-slate-700 bg-slate-900 p-8"
      >
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-slate-400">Log in to your account.</p>

        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          type="email"
          placeholder="Email address"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && (
          <p role="status" className="text-sm text-red-300">
            {message}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-slate-400">
          New user? <Link className="text-blue-400" href="/signup">Create an account</Link>
        </p>

        <Link className="block text-sm text-slate-400" href="/">← Home</Link>
      </form>
    </main>
  );
}
