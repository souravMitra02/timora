"use client";

import Image from "next/image";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";


interface IFormInput {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-yellow-50 via-white to-yellow-100
                    px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-sm sm:max-w-md
                      rounded-3xl bg-white shadow-xl
                      p-6 sm:p-8 lg:p-10">

        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <Image
            src="/logo.png"
            alt="Timora Logo"
            width={112}
            height={112}
            priority
          />

          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-text">
            Timora
          </h1>

          <p className="mt-1 text-sm sm:text-base text-muted">
            Your smart task management partner
          </p>
        </div>

        {/* Google Login */}
        <div className="mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 sm:h-12 rounded-xl
                       border border-slate-300
                       flex items-center justify-center gap-3
                       text-sm font-medium
                       hover:bg-yellow-50 hover:border-primary transition"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px w-full bg-slate-200" />
            <span className="text-xs text-muted">OR</span>
            <span className="h-px w-full bg-slate-200" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-muted mb-1">
              Email
            </label>

            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />

              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`w-full rounded-xl border bg-white
                            pl-12 pr-4 py-2.5 sm:py-3 text-sm
                            focus:outline-none focus:ring-2 transition
                            ${errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-300 focus:border-primary focus:ring-yellow-200"
                  }`}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-muted mb-1">
              Password
            </label>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />

              <input
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full rounded-xl border bg-white
                            pl-12 pr-4 py-2.5 sm:py-3 text-sm
                            focus:outline-none focus:ring-2 transition
                            ${errors.password
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-300 focus:border-primary focus:ring-yellow-200"
                  }`}
              />
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary
                       py-2.5 sm:py-3
                       text-sm font-semibold text-black
                       hover:bg-primary-hover
                       disabled:opacity-60 disabled:cursor-not-allowed
                       active:scale-95 transition"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 sm:mt-8 text-center text-sm text-muted">
          Don’t have an account?
          <a
            href="/register"
            className="ml-1 font-medium text-primary hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

