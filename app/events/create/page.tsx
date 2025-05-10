"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";
import { useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const user = getCurrentUser();
  //   if (!user) {
  //     router.push("/login");
  //     return;
  //   }
  //   const discountPrice = Number(price) * (Number(discount) / 100);
  //   const updatedPrice = price - discountPrice;
  //   const newEvent = {
  //     id: crypto.randomUUID(),
  //     title,
  //     category,
  //     description,
  //     rating,
  //     updatedPrice,
  //     discount,
  //     date,
  //     image,
  //     slots,
  //     bookedSlots,
  //   };

  //   const res = await fetch("/api/events", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newEvent),
  //   });

  //   if (res.ok) {
  //     // Save to localStorage on the client
  //     const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
  //     storedEvents.push(newEvent);
  //     localStorage.setItem("events", JSON.stringify(storedEvents));

  //     router.push("/events");
  //   } else {
  //     console.error("Failed to add event.");
  //   }
  // };

  const onSubmit = async (data: FormValues) => {
    const user = getCurrentUser();
    if (!user) {
      router.push("/login");
      return;
    }
    const discountPrice = Number(data.price) * (Number(data.discount) / 100);
    const updatedPrice = price - discountPrice;
    const newEvent = {
      id: crypto.randomUUID(),
      title: data.title,
      category: data.category,
      description: data.description,
      rating: data.rating,
      updatedPrice: updatedPrice,
      discount: data.discount,
      date: data.date,
      image: data.image,
      slots: data.slots,
      bookedSlots: data.bookedSlots,
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
      console.log(newEvent);

      router.push("/events");
    } else {
      console.error("Failed to add event.");
    }
  };

  return (
    // <div className="max-w-xl mx-auto p-6">
    //   <div className="text-center mb-6">
    //     <h1 className="text-3xl font-bold text-yellow-600">Create New Event</h1>
    //   </div>

    //   <form
    //     onSubmit={handleSubmit}
    //     className="border-gray-950 bg-base-100 shadow-lg p-6 space-y-4 text-black"
    //   >
    //     <label className="text-indigo-700">Event Title</label>
    //     <input
    //       type="text"
    //       placeholder="Title"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //       required
    //     />
    //     <label className="text-indigo-700">Event Category</label>
    //     <input
    //       type="text"
    //       placeholder="Category"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={category}
    //       onChange={(e) => setCategory(e.target.value)}
    //       required
    //     />
    //     <label className="text-indigo-700">Event booking price</label>
    //     <input
    //       type="number"
    //       placeholder="Price"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={price}
    //       onChange={(e) => setPrice(Number(e.target.value))}
    //       required
    //     />
    //     <label className="text-indigo-700">Event description</label>
    //     <textarea
    //       placeholder="Description"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       required
    //     />
    //     <label className="text-indigo-700">Image URL</label>
    //     <input
    //       type="text"
    //       placeholder="Image URL"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={image}
    //       onChange={(e) => setImage(e.target.value)}
    //     />
    //     <label className="text-indigo-700">Discount (%)</label>
    //     <input
    //       type="text"
    //       placeholder="Discount (%)"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={discount}
    //       onChange={(e) => setDiscount(e.target.value)}
    //       required
    //     />
    //     <label className="text-indigo-700">Rating</label>
    //     <input
    //       type="text"
    //       placeholder="Rating (1-5)"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={rating}
    //       onChange={(e) => setRating(e.target.value)}
    //       required
    //     />
    //     <label className="border-gray-950">Event Date</label>
    //     <input
    //       type="date"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={date}
    //       onChange={(e) => setDate(e.target.value)}
    //       required
    //     />
    //     <label className="text-indigo-700">Number of slots</label>
    //     <input
    //       type="number"
    //       placeholder="Number of slots"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={slots}
    //       onChange={(e) => setSlots(Number(e.target.value))}
    //       required
    //     />
    //     <label className="text-indigo-700">Number of booked slots</label>
    //     <input
    //       type="number"
    //       placeholder="Number of bookedSlots"
    //       className="border border-gray-950 w-full rounded-lg py-2"
    //       value={bookedSlots}
    //       onChange={(e) => setBookedSlots(Number(e.target.value))}
    //       required
    //     />
    //     <button
    //       type="submit"
    //       className="btn bg-indigo-700 px-5 py-4 w-full rounded-lg"
    //     >
    //       Add Event
    //     </button>
    //   </form>
    // </div>
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">
          Create Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Create Event</label>
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
            Create Event
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateEventPage;
