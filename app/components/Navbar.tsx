"use client";

import { FaDumbbell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/utils/auth";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdEventAvailable } from "react-icons/md";
import { getUserBookings } from "@/utils/events";

import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [bookEvents, setBookEvents] = useState<Event[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
    const bookings = getUserBookings();
    setBookEvents(bookings);
  }, [pathname]);

  let counter = 0;
  for (let i = 0; i < bookEvents.length; i++) {
    counter += 1;
  }
  console.log(counter);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <nav>
        <div className="container flex justify-evenly items-center py-8">
          {/* Logo section */}
          <div className="text-2xl flex items-center gap-2 font-bold py-8 uppercase">
            <MdEventAvailable className="text-indigo-700" />
            <p className="text-indigo-700">Accelx</p>
            <p className="text-yellow-600">Events</p>
          </div>
          {/* Menu section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      href="/events"
                      className="inline-block py-1 px-3 hover:text-yellow-600 font-semibold"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/events/create"
                      className="inline-block py-1 px-3 hover:text-yellow-600 font-semibold"
                    >
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/events/bookings"
                      className="inline-block py-1 px-3 hover:text-yellow-600 font-semibold"
                    >
                      My bookings<sup className="text-black-">({counter})</sup>
                    </Link>
                  </li>
                </>
              ) : (
                // <li>
                //   <Link
                //     href="/login"
                //     className="inline-block py-1 px-3 hover:text-yellow-600 font-semibold"
                //   >
                //     Login
                //   </Link>
                //   <Link
                //     href="/signup"
                //     className="inline-block py-1 px-3 hover:text-yellow-600 font-semibold"
                //   >
                //     Signup
                //   </Link>
                // </li>
                <></>
              )}
            </ul>
          </div>
          {/* Icons section */}
          <div className="hidden md:block items-center gap-4 ">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <button className="text-2xl hover:bg-yellow-600 hover:text-white rounded-full p-2 duration-200">
                    <CgProfile />
                  </button>
                </Link>
                <button
                  className="text-2xl py-3 px-5 ms-5 bg-yellow-600 hover:text-white rounded-md hover:bg-yellow-300 duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="inline-block py-1 px-3 hover:text-yellow-600 font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-block py-1 px-3 hover:text-yellow-600 font-semibold"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </div>
          {/* Mobile hamburger menu section */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </nav>

      {/* Mobile sidebar section */}
      <ResponsiveMenu open={open} />
    </>
  );
};

export default Navbar;
