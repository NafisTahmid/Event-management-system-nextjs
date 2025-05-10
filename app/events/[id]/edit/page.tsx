"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Event, getEvents, updateEvent } from "@/utils/events";
import { useForm } from "react-hook-form";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<Event | null>(null);

  type FormValues = {
    title: string;
    category: string;
    description: string;
    rating: string;
    date: string;
    image: string;
    discount: number;
    price: number;
    slots: number;
    bookedSlots: number;
  };
  const {
    register,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const events = getEvents();
    const foundEvent = events.find((e) => e.id === params.id);
    if (!foundEvent) {
      router.push("/");
    } else {
      setEventData(foundEvent);
      reset(foundEvent); // ✅ set form values
    }
  }, [params.id, router, reset]);

  const onSubmit = (data: FormValues) => {
    if (!eventData) return;

    const updated = { ...eventData, ...data };
    updateEvent(updated);
    router.push("/events");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              {...register("category", { required: "Category is required" })}
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              {...register("description", {
                required: "Description is required",
              })}
              type="textarea"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Rating</label>
            <input
              {...register("rating", { required: "Rating is required" })}
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              {...register("date", { required: "date is required" })}
              type="date"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Image</label>
            <input
              {...register("image", { required: "Image is required" })}
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Discount</label>
            <input
              {...register("discount", { required: "Discount is required" })}
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              {...register("price", { required: "Price is required" })}
              type="number"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Slots</label>
            <input
              {...register("slots", { required: "Slots is required" })}
              type="number"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.slots && (
              <p className="text-red-500 text-sm mt-1">
                {errors.slots.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Booked Slots</label>
            <input
              {...register("bookedSlots", {
                required: "Booked slots is required",
              })}
              type="number"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.bookedSlots && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bookedSlots.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600"
          >
            Edit Event
          </button>
        </form>
      </div>
    </section>
  );
}
