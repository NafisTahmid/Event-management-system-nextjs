"use client";

import React, { useEffect, useState } from "react";
import { Event } from "@/utils/events";
import { getAllUserEvents } from "@/utils/events";
import Link from "next/link";

const UserBookings = () => {
  const [bookedEvents, setBookedEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function getAllBookings() {
      const bookings = await getAllUserEvents();
      setBookedEvents(bookings);
    }
    getAllBookings();
  }, []);

  if (!bookedEvents.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-yellow-600 font-medium">
          You have not booked any events yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-center text-yellow-600 mb-10">
        My Booked Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookedEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300"
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                {event.description.length > 100
                  ? event.description.slice(0, 100) + "..."
                  : event.description}
              </p>
              <p className="text-gray-500 text-sm mb-4">📅 {event.date}</p>

              <Link href={`/events/event-details/${event.id}`}>
                <span className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                  View Details
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
