"use client";

import { RegisterType } from "@/types";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
  status: string;
  field: string;
  reminder: boolean;
}



export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert("User created!");
    } else {
      alert(result.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-yellow-50 via-white to-yellow-100
                    px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl
                      p-6 sm:p-8 lg:p-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Image src="/logo.png" alt="Timora Logo" width={112} height={112} priority />

          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-text">
            Create your account
          </h1>

          <p className="mt-1 text-sm sm:text-base text-muted">
            Start managing your daily tasks smarter
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <input
              placeholder="Full Name"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm
                         focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm
                         focus:border-primary focus:ring-2 focus:ring-yellow-200"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm
                         focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm
                         focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <input
              type="number"
              placeholder="Age"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm
                         focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              {...register("age", {
                required: "Age is required",
                min: { value: 10, message: "Minimum age is 10" },
              })}
            />
            {errors.age && (
              <p className="text-xs text-red-500 mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm
                         focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              {...register("gender", { required: "Select gender" })}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm
                         focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              {...register("status", { required: "Select status" })}
            >
              <option value="">Current Status</option>
              <option value="Student">Student</option>
              <option value="Job Holder">Job Holder</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-500 mt-1">{errors.status.message}</p>
            )}
          </div>

          {/* Field */}
          <div>
            <input
              placeholder="Field / Department"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm
                         focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              {...register("field", { required: "This field is required" })}
            />
            {errors.field && (
              <p className="text-xs text-red-500 mt-1">{errors.field.message}</p>
            )}
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-3 text-sm text-muted">
            <input
              type="checkbox"
              {...register("reminder")}
              className="w-4 h-4 rounded border-slate-300 focus:ring-primary"
            />
            Send me email reminders
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary py-3
                       text-sm font-semibold text-black
                       hover:bg-primary-hover
                       disabled:opacity-60
                       active:scale-95 transition"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?
          <a href="/login" className="ml-1 font-medium text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

