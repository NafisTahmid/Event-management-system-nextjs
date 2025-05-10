"use client";
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
  price: string;
  slots: string;
  bookedSlots: string;
};

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

const CreateEventPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
      const user = getCurrentUser();
      if (!user) {
        router.push("/login");
        return;
      }
    
      const discountPrice =
        parseFloat(data.price) * (parseFloat(data.discount) / 100);
      const updatedPrice = parseFloat(data.price) - discountPrice;
      const file = data.image[0];
      const imageBase64 = await toBase64(file); // ✅ Await here
    
      const newEvent = {
        id: crypto.randomUUID(),
        title: data.title,
        category: data.category,
        description: data.description,
        rating: data.rating,
        price: updatedPrice,
        discount: data.discount,
        date: data.date,
        image: imageBase64, // ✅ Store base64 string
        slots: data.slots,
        bookedSlots: data.bookedSlots,
      };
    
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
    
      if (res.ok) {
        const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
        storedEvents.push(newEvent); // ✅ Use newEvent, not FormData
        localStorage.setItem("events", JSON.stringify(storedEvents));
        router.push("/events");
      } else {
        console.error("Failed to add event.");
      }
    };
  return (
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
              {...register("rating", {
                required: "Rating is required",
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
            <label className="block text-sm font-medium">Discount in (%)</label>
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
                required: "Slots field is required",
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
              {...register("bookedSlots", {
                required: "Booked slots is required",
              })}
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
            Create Event
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateEventPage;
