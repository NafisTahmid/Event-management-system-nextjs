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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventData) return;

    // Update localStorage with the new event data
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    const updatedEvents = events.map((ev: Event) =>
      ev.id === eventData.id ? eventData : ev
    );
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Send the PUT request to the server to update the JSON file
    try {
      const response = await fetch(`/api/events/${eventData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the event");
      }

      // After successful update, redirect the user
      router.push("/events");
    } catch (error) {
      console.error("Error updating event:", error);
      // Handle any errors, e.g., show an error message to the user
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-lg mt-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white">Edit Event</h1>
      </div>

      {eventData && (
        <form
          onSubmit={handleSubmit}
          className="card bg-base-100 shadow-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Enter event title"
              className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
              value={eventData.title}
              onChange={(e) =>
                setEventData({ ...eventData, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              placeholder="Enter category"
              className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
              value={eventData.category}
              onChange={(e) =>
                setEventData({ ...eventData, category: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              placeholder="Enter price"
              className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
              value={eventData.price}
              onChange={(e) =>
                setEventData({ ...eventData, price: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Enter event description"
              className="textarea textarea-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
              value={eventData.description}
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
              value={eventData.image}
              onChange={(e) =>
                setEventData({ ...eventData, image: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              type="text"
              placeholder="Enter discount"
              className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
              value={eventData.discount}
              onChange={(e) =>
                setEventData({ ...eventData, discount: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Rating (1-5)
            </label>
            <input
              type="text"
              placeholder="Enter rating"
              className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
              value={eventData.rating}
              onChange={(e) =>
                setEventData({ ...eventData, rating: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
              value={eventData.date}
              onChange={(e) =>
                setEventData({ ...eventData, date: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-full py-3 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Update Event
          </button>
        </form>
      )}
    </div>
  );
}
