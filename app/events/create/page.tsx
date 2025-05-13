"use client";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  title: string;
  category: string;
  description: string;
  rating: string;
  date: string;
  image: FileList | string;
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
  } = useForm<FormValues>({
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    const user = getCurrentUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const discountPrice =
      parseFloat(data.price) * (parseFloat(data.discount) / 100);
    const updatedPrice = parseFloat(data.price) - discountPrice;
    let imageBase64 = data.image;
    if (data.image instanceof FileList && data.image.length > 0) {
      const file = data.image[0];
      imageBase64 = await toBase64(file); // ✅ Await here
    }

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
      // const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
      // storedEvents.push(newEvent); // ✅ Use newEvent, not FormData
      // localStorage.setItem("events", JSON.stringify(storedEvents));
      // alert("Event added successfully");
      toast.success("Event added successfully!");
      router.push("/events");
    } else {
      console.error("Failed to add event.");
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mt-20">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Create Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Create Event</label>
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
            <input
              {...register("description")}
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
                min: { value: 0, message: "Rating can't be less than 0" },
                max: { value: 5, message: "Rating can't be more than 5" },
                validate: (value) => {
                  if (value === "") return true;
                  const parsed = parseFloat(value);
                  if (!/^\d+(\.\d+)?$/.test(value)) {
                    return "Rating must be a valid number";
                  }
                  if (parsed < 0) {
                    return "Rating must be greater than or equal to 0";
                  }
                  return true;
                },
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
            <label className="block text-sm font-medium">Discount in (%)</label>
            <input
              {...register("discount", {
                validate: (value: string) => {
                  if (value === "") return true;
                  const parsed = parseFloat(value);
                  if (!/^\d+(\.\d+)?$/.test(value)) {
                    return "Discount must be a valid number";
                  }
                  if (parsed < 0) {
                    return "Discount must be greated or equal to zero";
                  }
                  return true;
                },
              })}
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
              {...register("price", {
                validate: (value: string) => {
                  if (value === "") return true;
                  const parsed = parseFloat(value);
                  if (!/^\d+(\.\d+)?$/.test(value)) {
                    return "Price must be a valid number";
                  }
                  if (parsed < 0) {
                    return "Price must be greated or equal to zero";
                  }
                  return true;
                },
              })}
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
                validate: (value: string) => {
                  if (value === "") return true;
                  const parsed = parseFloat(value);
                  if (!/^\d+(\.\d+)?$/.test(value)) {
                    return "Slots must be a valid number";
                  }
                  if (parsed < 0) {
                    return "Slots must be less than or equal to zero";
                  }
                  return true;
                },
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
                validate: (value: string) => {
                  if (value === "") return true;
                  const parsed = parseFloat(value);
                  if (!/^\d+(\.\d+)?$/.test(value)) {
                    return "Book slots must be a valid number";
                  }
                  if (parsed < 0) {
                    return "Book slots can't have negative value";
                  }
                  return true;
                },
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
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500"
          >
            Create Event
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateEventPage;
