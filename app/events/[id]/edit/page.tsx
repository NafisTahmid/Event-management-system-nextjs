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
    image: string | FileList;
    discount: string;
    price: string;
    slots: string;
    bookedSlots: string;
  };
  const {
    register,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        if (!res.ok) {
          router.push("/events");
          return;
        }

        const foundEvent = await res.json();
        return foundEvent;
      } catch (err) {
        console.error("Failed to fetch event:", err);
        router.push("/events");
      }
    };
    const fetchAndSet = async () => {
      const foundEvent = await fetchEvent();
      if (!foundEvent) {
        router.push("/");
      } else {
        setEventData(foundEvent);
        reset(foundEvent); // ✅ set form values
      }
    };
    fetchAndSet();
  }, [params.id, router, reset]);

  const toBase64 = async (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const onSubmit = async (data: FormValues) => {
    if (!eventData) return;

    let updatedImage = eventData.image;

    // Handle image file if a new one is uploaded
    if (typeof data.image instanceof FileList && data.image.length > 0) {
      const file = data.image[0];
      updatedImage = await toBase64(file); // ✅ Await here
    }
    const rating = parseFloat(data.rating as unknown as string);
    const discount = parseFloat(data.discount as unknown as string);
    const price = parseFloat(data.price as unknown as string);
    const slots = parseInt(data.slots as unknown as string);
    const bookedSlots = parseInt(data.bookedSlots as unknown as string);

    if (
      isNaN(rating) ||
      isNaN(discount) ||
      isNaN(price) ||
      isNaN(slots) ||
      isNaN(bookedSlots)
    ) {
      alert(
        "Please provide valid numeric values for rating, discount, price, slots and bookedSlots"
      );
      return;
    }

    const updated: Event = {
      ...eventData,
      ...data,
      image: updatedImage, // ✅ Use updated base64 or existing image
    };

    try {
      await updateEvent(updated);
      router.push("/events");
    } catch (err) {
      console.error("Update failed", err);
      alert("Something went wrong. Please try again.");
    }
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
              {...register("title")}
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
              {...register("category")}
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
            <textarea
              {...register("description")}
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
              {...register("rating", {
                min: { value: 0, message: "Rating can't be less than 0" },
                max: { value: 5, message: "Rating can't be more than 5" },
              })}
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
              {...register("date")}
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
              {...register("image")}
              type="file"
              accept="image/*"
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
              {...register("discount")}
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
              {...register("price")}
              type="text"
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
              {...register("slots", {
                min: { value: 0, message: "Slots can't be less than 0" },
                max: { value: 5000, message: "Slots can't be more than 5000" },
              })}
              type="text"
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
              {...register("bookedSlots")}
              type="text"
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
