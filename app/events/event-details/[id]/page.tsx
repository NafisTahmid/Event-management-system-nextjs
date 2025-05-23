"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { bookEvent } from "@/utils/events";
import { getCurrentUser } from "@/utils/auth";
import Link from "next/link";
import { toast } from "react-toastify";

import type { Event } from "@/utils/events";
import Image from "next/image";

const EventDetails = () => {
  const router = useRouter();
  const params = useParams();
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!params?.id) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        if (!res.ok) {
          router.push("/events");
          return;
        }

        const foundEvent = await res.json();
        setEventData(foundEvent);
      } catch (err) {
        console.error("Failed to fetch event:", err);
        router.push("/events");
      }
    };

    fetchEvent();
  }, [params, router]);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast.success("Event deleted successfully");
      router.push("/events");
    }
  };

  const handleBooking = async () => {
    if (!eventData) return;

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setMessage("⚠️ Please log in first to book.");
      return;
    }

    await bookEvent(eventData);
    setIsBooked(true);
    setMessage("✅ Successfully booked this event!");
    router.push("/events/bookings");
  };

  if (!eventData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  const availableSlots =
    Number(eventData.slots) - Number(eventData.bookedSlots);
  const discountedPrice =
    parseFloat(eventData.price) - parseFloat(eventData.discount);

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 md:px-0">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-10">
        {eventData.title}
      </h1>

      {eventData.image && (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            src={eventData.image}
            alt={eventData.title}
            className="w-full h-full object-cover rounded-lg"
            width={100}
            height={100}
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
          <span className="font-semibold">Discount:</span> {eventData.discount}%
        </p>
        <p>
          <span className="font-semibold">Price:</span>
          <span className="line-through text-gray-500">${eventData.price}</span>
          <span className="text-green-600 font-bold">${discountedPrice}</span>
        </p>
        <p>
          <span className="font-semibold">Slots available:</span>
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
                : "bg-blue-600 hover:bg-blue-500"
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
