"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { deleteEvent, setEvents, getEvents, bookEvent } from "@/utils/events";
import { getCurrentUser } from "@/utils/auth";
import Link from "next/link";

import type { Event } from "@/interfaces/event"; // Optional, depending on your structure

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

  const handleBooking = async () => {
    if (!eventData) return;

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setMessage("⚠️ Please log in first to book.");
      return;
    }

    await bookEvent(eventData, currentUser.email);
    setIsBooked(true);
    setMessage("✅ Successfully booked this event!");

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

  const availableSlots = eventData.slots - eventData.bookedSlots;
  const discountedPrice = eventData.price - eventData.discount;

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 md:px-0">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-600 mb-10">
        {eventData.title}
      </h1>

      {eventData.image && (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            src={eventData.image}
            alt={eventData.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      <div className="bg-white shadow-md rounded-xl p-6 space-y-4 text-gray-800">
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {eventData.description}
        </p>
        <p>
          <span className="font-semibold">Category:</span> {eventData.category}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {eventData.date}
        </p>
        <p>
          <span className="font-semibold">Rating:</span> {eventData.rating}
        </p>
        <p>
          <span className="font-semibold">Price:</span>{" "}
          <span className="line-through text-gray-500">${eventData.price}</span>{" "}
          <span className="text-green-600 font-bold">${discountedPrice}</span>
        </p>
        <p>
          <span className="font-semibold">Slots available:</span>{" "}
          {availableSlots}
        </p>
        <div className="flex flex-start">
          <Link
            href={`/events/${eventData.id}/edit/`}
            className="px-5 py-2 bg-yellow-600 text-white rounded-lg"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(eventData.id)}
            className="px-5 py-2 bg-red-600 text-white rounded-lg ms-2"
          >
            Delete
          </button>
        </div>

        <div className="pt-6">
          <button
            onClick={handleBooking}
            disabled={isBooked || availableSlots === 0}
            className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition duration-300 ${
              isBooked || availableSlots === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-500"
            }`}
          >
            {isBooked
              ? "Already Booked"
              : availableSlots === 0
              ? "No Slots Available"
              : "Book Event"}
          </button>
          {message && (
            <p className="mt-3 text-sm text-green-600 font-medium">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
