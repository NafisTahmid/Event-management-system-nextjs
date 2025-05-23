"use client";
import Logo from "@/assets/images/logo-white.png";
import Image from "next/image";
import ProfileDefault from "@/assets/images/profile.png";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { getCurrentUser, logout } from "@/utils/auth";
import {
  deleteBookedEvent,
  getUserBookings,
  getAllUserEvents,
  Event,
} from "@/utils/events";

const NavbarTwo = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [allUserEvents, setAllUserEvents] = useState<Event[]>([]);
  const [bookEvents, setBookEvents] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = getCurrentUser();
      setIsLoggedIn(!!user);

      const bookings = getUserBookings();
      setBookEvents(bookings || []);

      const events = await getAllUserEvents();
      setAllUserEvents(events);
    };

    fetchUserData();
  }, []);

  let counter = 0;
  for (let i = 0; i < bookEvents.length; i++) {
    counter += 1;
  }

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
    router.push("/events");
  };

  const deleteUserBooking = async (id: string) => {
    await deleteBookedEvent(id);
    alert("Booking deleted");
    router.push("/events/bookings");
  };

  return (
    // <nav className="bg-blue-700 border-b border-blue-500">
    //   <div className="">
    //     <div className="relative flex h-20 items-center justify-between">
    //       <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
    //         {/* <!-- Mobile menu button--> */}
    //         <button
    //           type="button"
    //           id="mobile-dropdown-button"
    //           className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    //           aria-controls="mobile-menu"
    //           aria-expanded="false"
    //           onClick={() => setIsMobileMenuOpen((prev) => !prev)}
    //         >
    //           <span className="absolute -inset-0.5"></span>
    //           <span className="sr-only">Open main menu</span>
    //           <svg
    //             className="block h-6 w-6"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth="1.5"
    //             stroke="currentColor"
    //             aria-hidden="true"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    //             />
    //           </svg>
    //         </button>
    //       </div>

    //       <div className="flex flex-1 items-center justify-between ">
    //         {/* Sidebar icon */}
    //         <div className="inset-y-0 left-0 flex items-center">
    //           <div className="drawer">
    //             <input
    //               id="my-drawer"
    //               type="checkbox"
    //               className="drawer-toggle"
    //             />
    //             <div className="drawer-content">
    //               {/* Page content here */}
    //               <label htmlFor="my-drawer" className="">
    //                 <GiHamburgerMenu className="w-8 h-8" />
    //               </label>
    //             </div>
    //             <div className="drawer-side">
    //               <label
    //                 htmlFor="my-drawer"
    //                 aria-label="close sidebar"
    //                 className="drawer-overlay"
    //               ></label>
    //               <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    //                 <h6 className="text-2xl text-white pb-10">
    //                   My booked events:
    //                 </h6>
    //                 <hr />
    //                 {allUserEvents.map((event) => (
    //                   <li key={event.id} className="mt-3">
    //                     <div className="d-flex justify-between items-center bg-white  text-black">
    //                       {event.title}
    //                       <button
    //                         onClick={() => deleteUserBooking(event.id)}
    //                         className="text-2xl text-black"
    //                       >
    //                         &#10005;
    //                       </button>
    //                     </div>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </div>
    //           </div>
    //         </div>

    //         {/* <!-- Logo --> */}
    //         <Link className="flex flex-shrink-0 items-center" href="/">
    //           {/* <MdEventAvailable className="text-indigo-700" /> */}

    //           <Image
    //             className="h-10 w-auto ml-1"
    //             src={Logo}
    //             alt="Accel Events"
    //           />

    //           <span className="hidden md:block text-white text-2xl font-bold ml-2">
    //             Accel Events
    //           </span>
    //         </Link>
    //         {/* <!-- Desktop Menu Hidden below md screens --> */}
    //         <div className="hidden md:ml-6 md:block">
    //           <div className="flex space-x-2">
    //             <Link
    //               href="/events"
    //               className={`${
    //                 pathname === "/" ? "bg-black" : ""
    //               } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
    //             >
    //               Home
    //             </Link>
    //             <Link
    //               href="/events"
    //               className={`${
    //                 pathname === "/properties" ? "bg-black" : ""
    //               } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
    //             >
    //               Events
    //             </Link>
    //             {isLoggedIn && (
    //               <>
    //                 <Link
    //                   href="/events/create"
    //                   className={`${
    //                     pathname === "/events/create" ? "bg-black" : ""
    //                   } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
    //                 >
    //                   Add Event
    //                 </Link>
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       </div>

    //       {/* <!-- Right Side Menu (Logged Out) --> */}
    //       {!isLoggedIn && (
    //         <div className="hidden md:block md:ml-6">
    //           <div className="flex items-center">
    //             <button
    //               className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
    //               onClick={handleLogin}
    //             >
    //               <FaUser className="text-white mr-2" />
    //               <span>Login or Register</span>
    //             </button>
    //           </div>
    //         </div>
    //       )}

    //       {/* <!-- Right Side Menu (Logged In) --> */}
    //       {isLoggedIn && (
    //         <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
    //           <Link href="/messages" className="relative group">
    //             <button
    //               type="button"
    //               className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //             >
    //               <span className="absolute -inset-1.5"></span>
    //               <span className="sr-only">View notifications</span>
    //               <svg
    //                 className="h-6 w-6"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 strokeWidth="1.5"
    //                 stroke="currentColor"
    //                 aria-hidden="true"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    //                 />
    //               </svg>
    //             </button>
    //             {counter > 0 && (
    //               <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
    //                 {counter}
    //                 {/* <!-- Replace with the actual number of notifications --> */}
    //               </span>
    //             )}
    //           </Link>
    //           {/* <!-- Profile dropdown button --> */}
    //           <div className="relative ml-3">
    //             <div>
    //               <button
    //                 type="button"
    //                 className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //                 id="user-menu-button"
    //                 aria-expanded="false"
    //                 aria-haspopup="true"
    //                 onClick={() => setIsProfileMenuOpen((prev) => !prev)}
    //               >
    //                 <span className="absolute -inset-1.5"></span>
    //                 <span className="sr-only">Open user menu</span>
    //                 <Image
    //                   className="h-8 w-8 rounded-full"
    //                   src={ProfileDefault}
    //                   alt=""
    //                 />
    //               </button>
    //             </div>

    //             {/* <!-- Profile dropdown --> */}
    //             {isProfileMenuOpen && (
    //               <div
    //                 id="user-menu"
    //                 className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    //                 role="menu"
    //                 aria-orientation="vertical"
    //                 aria-labelledby="user-menu-button"
    //                 tabIndex="-1"
    //               >
    //                 <Link
    //                   href="/dashboard"
    //                   className="block px-4 py-2 text-sm text-gray-700"
    //                   role="menuitem"
    //                   tabIndex="-1"
    //                   id="user-menu-item-0"
    //                 >
    //                   Your Profile
    //                 </Link>
    //                 <Link
    //                   href="/events/bookings"
    //                   className="block px-4 py-2 text-sm text-gray-700"
    //                   role="menuitem"
    //                   tabIndex="-1"
    //                   id="user-menu-item-2"
    //                 >
    //                   Booked Events
    //                 </Link>
    //                 <button
    //                   className="block px-4 py-2 text-sm text-gray-700"
    //                   role="menuitem"
    //                   tabIndex="-1"
    //                   id="user-menu-item-2"
    //                   onClick={handleLogout}
    //                 >
    //                   Sign Out
    //                 </button>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {/* <!-- Mobile menu, show/hide based on menu state. --> */}
    //   {isMobileMenuOpen && (
    //     <div id="mobile-menu">
    //       <div className="space-y-1 px-2 pb-3 pt-2">
    //         <Link
    //           href="/events"
    //           className={`${
    //             pathname === "/" ? "bg-black" : ""
    //           } text-white block rounded-md px-3 py-2 text-base font-medium`}
    //         >
    //           Home
    //         </Link>
    //         <Link
    //           href="/events"
    //           className={`${
    //             pathname === "/events" ? "bg-black" : ""
    //           } text-white block rounded-md px-3 py-2 text-base font-medium`}
    //         >
    //           Events
    //         </Link>
    //         {isLoggedIn && (
    //           <Link
    //             href="/events/create"
    //             className={`${
    //               pathname === "/properties/add" ? "bg-black" : ""
    //             } text-white block rounded-md px-3 py-2 text-base font-medium`}
    //           >
    //             Add Event
    //           </Link>
    //         )}

    //         {!isLoggedIn && (
    //           <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5">
    //             <i className="fa-brands fa-google mr-2"></i>
    //             <span>Login or Register</span>
    //           </button>
    //         )}
    //       </div>
    //     </div>
    //   )}
    // </nav>
    <nav className="bg-blue-700 border-b border-blue-500 px-8">
      <div className="relative flex h-20 items-center">
        {/* Left Side - Sidebar Menu Icon */}
        <div className="flex items-center">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="cursor-pointer">
                <GiHamburgerMenu className="w-8 h-8 text-white" />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <h6 className="text-2xl text-white pb-10">My booked events:</h6>
                <hr />
                {allUserEvents.map((event) => (
                  <li key={event.id} className="mt-3">
                    <div className="d-flex justify-between items-center bg-white text-black">
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
        </div>

        {/* Middle - Logo and Navigation Links */}
        <div className="flex flex-1 justify-center">
          <div className="flex items-center space-x-6">
            <Link className="flex items-center" href="/events">
              <Image className="h-10 w-auto" src={Logo} alt="Accel Events" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Accel Events
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex space-x-2">
                <Link
                  href="/events"
                  className={`${
                    pathname === "/events" ? "bg-black" : ""
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Home
                </Link>
                <Link
                  href="/events/allEvents"
                  className={`${
                    pathname === "/events/allEvents" ? "bg-black" : ""
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Events
                </Link>

                {isLoggedIn && (
                  <>
                    <Link
                      href="/events/bookings"
                      className={`${
                        pathname === "/events/bookings" ? "bg-black" : ""
                      } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/events/create"
                      className={`${
                        pathname === "/events/create" ? "bg-black" : ""
                      } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                    >
                      Add Event
                    </Link>
                    <input
                      placeholder="search event"
                      className="bg-white py-4 ms-2"
                    />
                    <button className="btn btn-success">Success</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Notification and Profile */}
        <div className="flex items-center">
          {/* Mobile menu button (hidden on desktop) */}
          <div className="md:hidden mr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Login/Register or Notification/Profile */}
          {!isLoggedIn ? (
            <button
              className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              onClick={handleLogin}
            >
              <FaUser className="text-white mr-2" />
              <span>Login or Register</span>
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/messages" className="relative">
                <button
                  type="button"
                  className="text-gray-400 hover:text-white focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                {counter > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {counter}
                  </span>
                )}
              </Link>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex rounded-full focus:outline-none"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={ProfileDefault}
                    alt=""
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/events/bookings"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Booked Events
                    </Link>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-blue-700 z-10">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/events"
                className={`${
                  pathname === "/" ? "bg-black" : ""
                } text-white block rounded-md px-3 py-2 text-base font-medium`}
              >
                Home
              </Link>
              <Link
                href="/events"
                className={`${
                  pathname === "/events" ? "bg-black" : ""
                } text-white block rounded-md px-3 py-2 text-base font-medium`}
              >
                Events
              </Link>
              {isLoggedIn && (
                <Link
                  href="/events/create"
                  className={`${
                    pathname === "/properties/add" ? "bg-black" : ""
                  } text-white block rounded-md px-3 py-2 text-base font-medium`}
                >
                  Add Event
                </Link>
              )}
              {!isLoggedIn && (
                <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5">
                  <i className="fa-brands fa-google mr-2"></i>
                  <span>Login or Register</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarTwo;
