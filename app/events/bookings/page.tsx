"use client";

import React, { useEffect, useState } from "react";
import { Event } from "@/utils/events";
import { getUserBookings } from "@/utils/events";
import Link from "next/link";

const UserBookings = () => {
  const [bookedEvents, setBookedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const bookings = getUserBookings();
    setBookedEvents(bookings);
  }, []);

  if (!bookedEvents.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-yellow-600">
          You have not booked any events yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-600">
        My Booked Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookedEvents.map((event) => (
          <div
            key={event.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow text-black"
          >
            <div className="card-body">
              <h3 className="card-title">
                <Link
                  href={`event-details/${event.id}`}
                  className="link link-hover"
                >
                  {event.title}
                </Link>
              </h3>
              <p>{event.description}</p>
              <p className="text-sm text-gray-500">📅 Date: {event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
