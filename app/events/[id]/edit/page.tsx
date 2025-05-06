"use client";

import { useRouter, useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Event, getEvents, updateEvent } from "@/utils/events";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<Event | null>(null);

  useEffect(() => {
    const events = getEvents();
    const foundEvent = events.find((e) => e.id === params.id);
    if (!foundEvent) {
      router.push("/");
    } else {
      setEventData(foundEvent);
    }
  }, [params.id, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!eventData) return;
    updateEvent(eventData);
    router.push("/");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      {eventData && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Title"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            required
          />
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Description"
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
            required
          />
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={eventData.date}
            onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Event
          </button>
        </form>
      )}
    </main>
  );
}
