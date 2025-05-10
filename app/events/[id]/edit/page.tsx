"use client";

import { useRouter, useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
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
    discount: string;
    price: number;
    slots: number;
    bookedSlots: number;
  };
  const {
    register,
    handleSubmit,
    setValue,
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
  }, [params.id, router]);

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!eventData) return;

  //   // Update localStorage with the new event data
  //   // const events = JSON.parse(localStorage.getItem("events") || "[]");
  //   // const updatedEvents = events.map((ev: Event) =>
  //   //   ev.id === eventData.id ? eventData : ev
  //   // );
  //   // localStorage.setItem("events", JSON.stringify(updatedEvents));

  //   // // Send the PUT request to the server to update the JSON file
  //   // try {
  //   //   const response = await fetch(`/api/events/${eventData.id}`, {
  //   //     method: "PUT",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     body: JSON.stringify(eventData),
  //   //   });

  //   //   if (!response.ok) {
  //   //     throw new Error("Failed to update the event");
  //   //   }

  //   //   // After successful update, redirect the user
  //   //   router.push("/events");
  //   // } catch (error) {
  //   //   console.error("Error updating event:", error);
  //   //   // Handle any errors, e.g., show an error message to the user
  //   // }
  //   updateEvent(eventData);
  //   router.push("/events");
  // };

  const onSubmit = (data: FormValues) => {
    if (!eventData) return;

    const updated = { ...eventData, ...data };
    updateEvent(updated);
    router.push("/events");
  };

  return (
    // <div className="max-w-xl mx-auto p-6 rounded-lg shadow-lg mt-8">
    //   <div className="text-center mb-6">
    //     <h1 className="text-3xl font-bold text-yellow-600">Edit Event</h1>
    //   </div>

    //   {eventData && (
    //     <form
    //       onSubmit={handleSubmit}
    //       className="text-black bg-base-100 shadow-lg p-6 space-y-4"
    //     >
    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Event Title
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter event title"
    //           className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.title}
    //           onChange={(e) =>
    //             setEventData({ ...eventData, title: e.target.value })
    //           }
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Category
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter category"
    //           className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.category}
    //           onChange={(e) =>
    //             setEventData({ ...eventData, category: e.target.value })
    //           }
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Price
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter price"
    //           className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.price}
    //           onChange={(e) =>
    //             setEventData({ ...eventData, price: e.target.value })
    //           }
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Description
    //         </label>
    //         <textarea
    //           placeholder="Enter event description"
    //           className="textarea textarea-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.description}
    //           onChange={(e) =>
    //             setEventData({ ...eventData, description: e.target.value })
    //           }
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Image URL
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter image URL"
    //           className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.image}
    //           onChange={(e) =>
    //             setEventData({ ...eventData, image: e.target.value })
    //           }
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Discount (%)
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter discount"
    //           className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.discount}
    //           onChange={(e) =>
    //             setEventData({ ...eventData, discount: e.target.value })
    //           }
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Rating (1-5)
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter rating"
    //           className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.rating}
    //           onChange={(e) =>
    //             setEventData({ ...eventData, rating: e.target.value })
    //           }
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Event Date
    //         </label>
    //         <input
    //           type="date"
    //           className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.date}
    //           onChange={(e) =>
    //             setEventData({ ...eventData, date: e.target.value })
    //           }
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Slots
    //         </label>
    //         <input
    //           type="number"
    //           className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.slots}
    //           onChange={(e) =>
    //             setEventData({ ...eventData, slots: Number(e.target.value) })
    //           }
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-lg font-medium text-gray-700">
    //           Booked Slots
    //         </label>
    //         <input
    //           type="number"
    //           className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
    //           value={eventData.bookedSlots}
    //           onChange={(e) =>
    //             setEventData({
    //               ...eventData,
    //               bookedSlots: Number(e.target.value),
    //             })
    //           }
    //           required
    //         />
    //       </div>

    //       <button
    //         type="submit"
    //         className="btn bg-yellow-700 w-full py-3 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-green-600"
    //       >
    //         Update Event
    //       </button>
    //     </form>
    //   )}
    // </div>
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
