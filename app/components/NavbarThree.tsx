"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/utils/auth";
import {
  deleteBookedEvent,
  getAllUserEvents,
  Event,
  getUserBookings,
} from "@/utils/events";
import { TbLayoutNavbarInactive } from "react-icons/tb";

const NavbarThree = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [bookEvents, setBookEvents] = useState<string[]>([]);

  const deleteUserBooking = async (id: string) => {
    await deleteBookedEvent(id);
    alert("Booking deleted");
    router.push("/events/bookings");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = getCurrentUser();
      setIsLoggedIn(!!user);
      window.location.reload();

      const bookings = getUserBookings();
      setBookEvents(bookings || []);

      const events = await getAllUserEvents();
      setUserEvents(events);
    };

    fetchUserData();
  }, []);

  let counter = 0;
  for (let i = 0; i < bookEvents.length; i++) {
    counter += 1;
  }

  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
    router.push("/events");
  };

  return (
    <section className="">
      <div className="px-4 space-x-6 navbar bg-blue-600 shadow-sm md:px-16 lg:px-16">
        <div className="navbar-start">
          {/* <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div> */}
          <Link href="/events">
            <Image src={Logo} alt="logo" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {isLoggedIn && (
              <>
                <li>
                  <Link href="/events">Events</Link>
                </li>
                <li>
                  <Link href="/events/create">Add Event</Link>
                </li>
                <li>
                  <div className="drawer">
                    <input
                      id="my-drawer"
                      type="checkbox"
                      className="drawer-toggle"
                    />
                    <div className="drawer-content">
                      {/* Page content here */}
                      <label htmlFor="my-drawer" className="">
                        My Bookings
                      </label>
                    </div>
                    <div className="drawer-side">
                      <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                      ></label>
                      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <h6 className="text-2xl text-white pb-10">
                          My booked events:
                        </h6>
                        <hr />
                        {userEvents.map((event) => (
                          <li key={event.id} className="mt-3">
                            <div className="d-flex justify-between items-center bg-white  text-black">
                              {event.title}
                              <button
                                onClick={() => deleteUserBooking(event.id)}
                                className="text-2xl text-black"
                              >
                                &#10005;
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <button className="text-2xl  hover:text-white rounded-full p-2 duration-200">
                    <TbLayoutNavbarInactive />
                  </button>
                  {counter > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                      {counter}
                    </span>
                  )}
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li>
                  <Link href="/events">Events</Link>
                </li>
                <li>
                  <Link href="/events">All Events</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {isLoggedIn && (
            <button className="btn btn-error" onClick={handleLogout}>
              Logout
            </button>
          )}
          {!isLoggedIn && (
            <button className="btn btn-accent" onClick={handleLogin}>
              Log In/Register
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default NavbarThree;
