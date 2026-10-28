
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-950 p-6 text-white">
      <h1 className="text-4xl font-bold">Auth App</h1>

      <p className="text-slate-300">
        Test your Next.js authentication API.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/signup"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          Create Account
        </Link>

        <Link
          href="/login"
          className="rounded-lg border border-slate-600 px-6 py-3 hover:bg-slate-800"
        >
          Login
        </Link>

        <Link
          href="/dashboard"
          className="rounded-lg border border-slate-600 px-6 py-3 hover:bg-slate-800"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
