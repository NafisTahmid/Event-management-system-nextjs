"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveEvent } from "@/utils/events";
import { getCurrentUser } from "@/utils/auth";

const CreateEventPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const[category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = getCurrentUser();
    if (!user) {
      router.push("/login");
      return;
    }

    saveEvent({
      id: crypto.randomUUID(),
      title,
      category,
      description,
      rating,
      date,
    });

    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
         <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={rating}
          onChange = {(e)=> setRating(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
