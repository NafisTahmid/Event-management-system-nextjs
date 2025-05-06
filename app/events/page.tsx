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
    // async function fetchEvents() {
    //   const res = await fetch("/api/events");
    //   const allEvents = await res.json();
    // }
    setEvents(fetchedEvents);
    // fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteEvent(id);
        setEvents(getEvents());
        router.push("/events");
      }
    } else {
      alert("Failed to delete");
    }
  };

  const handleEdit = (id: string) => {
    console.log(id);
    router.push(`/events/${id}/edit`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Available Events</h1>

      <div className="flex flex-wrap justify-center gap-8">
        {events.map((event) => (
          <div key={event.id} className="card w-80 bg-base-100 shadow-xl">
            <figure>
              <img
                src={event.image || "/default-event.jpg"}
                alt={event.title}
                className="w-80 object-cover"
              />
            </figure>
            <div className="card-body">
              <Link href={`/events/event-details/${event.id}`}>
                <h2 className="card-title">{event.title}</h2>
              </Link>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p>{event.description}</p>
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(event.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
