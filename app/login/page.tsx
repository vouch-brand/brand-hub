"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LemniscateAnimation from "@/components/agent/LemniscateAnimation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || loading) return;
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-light flex flex-col items-center justify-center px-8">
      <div className="mb-8">
        <Image
          src="/assets/logo/Vouch blue.svg"
          alt="Vouch"
          width={100}
          height={36}
          className="h-9 w-auto"
          priority
        />
      </div>

      <div className="mb-12">
        <LemniscateAnimation className="w-[180px]" />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Enter password"
            autoComplete="current-password"
            autoFocus
            className={`w-full bg-transparent border-b py-3 pr-10 font-body text-sm text-dark-neutral placeholder:text-dark-neutral/30 focus:outline-none transition-colors ${
              error
                ? "border-red-300 focus:border-red-400"
                : "border-dark-neutral/20 focus:border-sea-blue-mid"
            }`}
          />
          <button
            type="submit"
            disabled={!password.trim() || loading}
            className="absolute right-0 bottom-3 text-dark-neutral/30 hover:text-sea-blue-mid disabled:opacity-30 transition-colors"
            aria-label="Submit"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {error && (
          <p className="mt-3 text-xs font-body text-red-400">Incorrect password.</p>
        )}
      </form>
    </div>
  );
}
