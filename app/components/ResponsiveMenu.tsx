"use client";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser, logout } from "@/utils/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbLayoutNavbarInactive } from "react-icons/tb";
import Sidebar from "./Sidebar";

type ResponsiveMenuProps = {
  open: boolean;
};

const ResponsiveMenu = ({ open }: ResponsiveMenuProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const user = getCurrentUser();
    setLoggedIn(!!user);
  }, []);
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <div className="text-xl font-semibold uppercase bg-yellow-600 text-white py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              {loggedIn ? (
                <>
                  <li>
                    <Link href="/events">Events</Link>
                  </li>
                  <li>
                    <Link href="/events/create">Create</Link>
                  </li>
                  <li>
                    <Link href="/events/bookings">My bookings</Link>
                  </li>
                  <li>
                    <button
                      className="text-2xl py-3 px-5 ms-5 bg-yellow-600 hover:text-white rounded-md hover:bg-yellow-300 duration-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/signup">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
