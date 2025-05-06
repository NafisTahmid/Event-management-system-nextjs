"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/utils/auth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        EventApp
      </Link>
      <div className="space-x-4">
        {isLoggedIn && (
          <>
            <Link href="/events" className="hover:underline">Events</Link>
            <Link href="/events/create" className="hover:underline">Create</Link>
            <button onClick={handleLogout} className="hover:underline text-red-400">Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
