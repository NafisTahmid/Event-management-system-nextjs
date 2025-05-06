"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEvents } from "@/utils/events";
import { getCurrentUser } from "@/utils/auth";
import { bookEvent } from "@/utils/events";
type Event = {
  id: string;
  title: string;
  category: string;
  description: string;
  rating: string;
  date: string;
  image?: string;
  bookedBy?: string[];
};

const EventDetails = () => {
  const router = useRouter();
  const params = useParams();
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!params?.id) return;

    const events = getEvents();
    const foundEvent = events.find((e) => e.id === params.id);

    if (foundEvent) {
      setEventData(foundEvent);
      const currentUser = getCurrentUser();
      if (currentUser && foundEvent.bookedBy?.includes(currentUser.email)) {
        setIsBooked(true);
      }
    } else {
      router.push("/events");
    }
  }, [params]);

  const handleBooking = async () => {
    if (!eventData) return;

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setMessage("⚠️ Please log in first to book.");
      return;
    }

    await bookEvent(eventData, currentUser.email); // await added
    setIsBooked(true);
    setMessage("✅ Successfully booked this event!");

    // Refresh event data
    const updatedEvents = getEvents();
    const updatedEvent = updatedEvents.find((e) => e.id === eventData.id);
    if (updatedEvent) {
      setEventData(updatedEvent);
    }
  };
  if (!eventData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card max-w-3xl w-full bg-base-100 shadow-xl p-6">
        {eventData.image && (
          <figure className="mb-4">
            <img
              src={eventData.image}
              alt={eventData.title}
              className="rounded-xl object-cover h-64 w-full"
            />
          </figure>
        )}
        <div className="card-body">
          <h1 className="card-title text-3xl mb-4">{eventData.title}</h1>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {eventData.category}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {eventData.date}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {eventData.rating}
            </p>
            <p>
              <span className="font-semibold">Description:</span>
              <br />
              {eventData.description}
            </p>
            <p>
              <span className="font-semibold">Discount:</span>$
              {eventData.discount}
            </p>
            <p>
              <span className="font-semibold">Price:</span>$
              {eventData.updatedPrice}
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={handleBooking}
              disabled={isBooked}
              className={`btn w-full ${
                isBooked ? "btn-disabled" : "btn-primary"
              }`}
            >
              {isBooked ? "Already Booked" : "Book Event"}
            </button>
            {message && <p className="text-success mt-3 text-sm">{message}</p>}
          </div>
          <p className="text-center">Slots available: {eventData.slots}</p>

          {/* {eventData.bookedBy?.length > 0 && (
            <div className="mt-6">
              <p className="font-semibold">
                Booked by ({eventData.bookedBy.length}):
              </p>
              <ul className="list-disc list-inside text-sm mt-2">
                {eventData.bookedBy.map((email, idx) => (
                  <li key={idx}>{email}</li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
