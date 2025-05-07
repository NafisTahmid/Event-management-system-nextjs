"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUser } from "@/utils/auth";

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    saveUser({ email, password });
    alert("Signup successful!");
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-yellow-700 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-yellow-700 hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
