import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { MdEventAvailable } from "react-icons/md";
import { TbLayoutNavbarInactive } from "react-icons/tb";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { getUserBookings } from "@/utils/events";

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const [bookEvents, setBookEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const bookings = getUserBookings();
    setBookEvents(bookings);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const counter = bookEvents.length;

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6 border-b flex items-center gap-2">
        <MdEventAvailable className="text-2xl text-indigo-700" />
        <span className="text-xl font-bold text-indigo-700">Accelx</span>
        <span className="text-xl font-bold text-yellow-600">Events</span>
      </div>
      <ul className="p-6 flex flex-col gap-4 text-gray-700 font-semibold">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            <CgProfile className="text-lg" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            <MdEventAvailable className="text-lg" />
            Events
          </Link>
        </li>
        <li>
          <Link
            href="/events/create"
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            ➕ Create Event
          </Link>
        </li>
        <li>
          <Link
            href="/events/bookings"
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            <TbLayoutNavbarInactive className="text-lg" />
            My Bookings
            <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {counter}
            </span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-500 hover:text-red-700 mt-4"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
