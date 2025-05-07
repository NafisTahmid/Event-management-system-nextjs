"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/auth";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginUser(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-yellow-700 mb-6">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:ring-2 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:ring-2 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-yellow-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
