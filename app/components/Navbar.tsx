"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/utils/auth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <Link href="/events" className="text-xl font-bold">
        EventApp
      </Link>

      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        &#9776;
      </button>

      {/* Navbar Links */}
      <div
        className={`lg:flex lg:space-x-4 flex-col lg:flex-row ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {isLoggedIn ? (
          <>
            <Link href="/events" className="hover:underline p-2">
              Events
            </Link>
            <Link href="/events/create" className="hover:underline p-2">
              Create
            </Link>
            <Link href="/events/bookings" className="hover:underline p-2">
              My Bookings
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline text-red-400 p-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline p-2">
              Login
            </Link>
            <Link href="/signup" className="hover:underline p-2">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
