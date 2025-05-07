"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";

const CreateEventPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState(0);
  const [slots, setSlots] = useState(0);
  const [bookedSlots, setBookedSlots] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = getCurrentUser();
    if (!user) {
      router.push("/login");
      return;
    }
    const discountPrice = Number(price) * (Number(discount) / 100);
    const updatedPrice = price - discountPrice;
    const newEvent = {
      id: crypto.randomUUID(),
      title,
      category,
      description,
      rating,
      updatedPrice,
      discount,
      date,
      image,
      slots,
      bookedSlots,
    };

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    if (res.ok) {
      // Save to localStorage on the client
      const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
      storedEvents.push(newEvent);
      localStorage.setItem("events", JSON.stringify(storedEvents));

      router.push("/events");
    } else {
      console.error("Failed to add event.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-600">Create New Event</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-gray-950 bg-base-100 shadow-lg p-6 space-y-4 text-black"
      >
        <label className="text-indigo-700">Event Title</label>
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="text-indigo-700">Event Category</label>
        <input
          type="text"
          placeholder="Category"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <label className="text-indigo-700">Event booking price</label>
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <label className="text-indigo-700">Event description</label>
        <textarea
          placeholder="Description"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="text-indigo-700">Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label className="text-indigo-700">Discount (%)</label>
        <input
          type="text"
          placeholder="Discount (%)"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
        <label className="text-indigo-700">Rating</label>
        <input
          type="text"
          placeholder="Rating (1-5)"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <label className="border-gray-950">Event Date</label>
        <input
          type="date"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label className="text-indigo-700">Number of slots</label>
        <input
          type="number"
          placeholder="Number of slots"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={slots}
          onChange={(e) => setSlots(Number(e.target.value))}
          required
        />
        <label className="text-indigo-700">Number of booked slots</label>
        <input
          type="number"
          placeholder="Number of bookedSlots"
          className="border border-gray-950 w-full rounded-lg py-2"
          value={bookedSlots}
          onChange={(e) => setBookedSlots(Number(e.target.value))}
          required
        />
        <button
          type="submit"
          className="btn bg-indigo-700 px-5 py-4 w-full rounded-lg"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
