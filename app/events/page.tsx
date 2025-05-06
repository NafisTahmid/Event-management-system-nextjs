"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEvents, deleteEvent, Event } from "@/utils/events";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchedEvents = getEvents();
    setEvents(fetchedEvents);
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      deleteEvent(id);
      const updatedEvents = getEvents();
      setEvents(updatedEvents);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/events/${id}/edit`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg p-4 shadow-sm">
            <Link href={`/event-details/${event.id}`} className="block mb-2">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="text-gray-700">{event.description}</p>
            </Link>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(event.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
