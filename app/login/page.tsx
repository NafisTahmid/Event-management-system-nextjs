"use client";

import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/auth";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Login data:", data);
    const success = loginUser(data.email, data.password);
    if (success) {
      toast.success("Login successful :D");
      router.push("/events");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <section className="h-full flex items-center justify-center bg-gray-100 px-4 mt-24">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-yellow-600"
          >
            Log In
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-700"
            onClick={() => logout()}
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
