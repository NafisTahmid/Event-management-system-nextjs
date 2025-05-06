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
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <form onSubmit={handleSignup} className="card-body">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign Up</button>
          </div>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
