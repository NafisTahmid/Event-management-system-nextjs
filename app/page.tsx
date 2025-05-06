"use client";

import { useEffect, useState } from "react";
import { getEvents, deleteEvent, Event } from "@/utils/events";
import Link from "next/link";

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const allEvents = getEvents();
    setEvents(allEvents);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
      setEvents(getEvents()); // refresh the list
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      {events.length === 0 ? (
        <p className="text-gray-600">No events found.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-sm text-gray-500">Date: {event.date}</p>
              <div className="mt-2 flex gap-4">
                <Link
                  href={`/events/${event.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
