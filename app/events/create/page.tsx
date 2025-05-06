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
  const [price, setPrice] = useState("");
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
    const updatedPrice = Number(price) - discountPrice;
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
        <h1 className="text-3xl font-bold">Create New Event</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-lg p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="input input-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Price"
          className="input input-bordered w-full"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Discount (%)"
          className="input input-bordered w-full"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Rating (1-5)"
          className="input input-bordered w-full"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <input
          type="date"
          className="input input-bordered w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Number of slots"
          className="input input-bordered w-full"
          value={slots}
          onChange={(e) => setSlots(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Number of bookedSlots"
          className="input input-bordered w-full"
          value={bookedSlots}
          onChange={(e) => setBookedSlots(Number(e.target.value))}
          required
        />
        <button type="submit" className="btn btn-success w-full">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
