
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("Checking authentication...");
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/auth/me");
      const data = await res.json();

      if (!res.ok) {
        setUser(null);
        setMessage(data.message || "Please log in first.");
        return;
      }

      setUser(data.user);
      setMessage("");
    } catch {
      setMessage("Unable to connect to the API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadUser();
  }, [loadUser]);

  async function handleLogout() {
    setMessage("");

    try {
      const res = await fetch("/api/v1/auth/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Logout failed");
        return;
      }

      setUser(null);
      router.push("/login");
      router.refresh();
    } catch {
      setMessage("Unable to connect to the API.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
      <section className="w-full max-w-lg space-y-5 rounded-2xl border border-slate-700 bg-slate-900 p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {loading ? (
          <p className="text-slate-400">Loading your profile...</p>
        ) : user ? (
          <>
            <p className="text-green-400">You are authenticated!</p>

            <div className="space-y-3 rounded-lg bg-slate-800 p-4">
              <p><span className="text-slate-400">Name:</span> {user.name}</p>
              <p><span className="text-slate-400">Email:</span> {user.email}</p>
              <p className="break-all">
                <span className="text-slate-400">User ID:</span> {user.id}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full rounded-lg bg-red-600 p-3 font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="text-amber-300">{message}</p>
            <Link
              href="/login"
              className="block rounded-lg bg-blue-600 p-3 text-center font-semibold"
            >
              Go to Login
            </Link>
          </>
        )}

        {message && loading === false && user && (
          <p role="status" className="text-sm text-slate-300">{message}</p>
        )}

        <Link href="/" className="block text-sm text-slate-400">← Home</Link>
      </section>
    </main>
  );
}
