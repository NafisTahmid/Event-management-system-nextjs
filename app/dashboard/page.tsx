"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/utils/auth";

const DashboardPage = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push("/login");
    } else {
      setUserEmail(user.email);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl text-center">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Dashboard</h2>
          <p className="text-lg">
            Welcome, <span className="font-semibold">{userEmail}</span>!
          </p>
          <div className="mt-6">
            <button onClick={handleLogout} className="btn btn-error">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
