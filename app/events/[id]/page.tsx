"use client";

import { useEffect, useState } from "react";
import { getEvents, Event } from "@/utils/events";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EventDetailsPage({ params }: PageProps) {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const allEvents = getEvents();
    const selectedEvent = allEvents.find((e) => e.id === params.id);
    setEvent(selectedEvent || null);
  }, [params.id]);

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-sm text-gray-500 mb-4">Date: {event.date}</p>
    </div>
  );
}
