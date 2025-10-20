"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { imageUpload } from "@/lib/utils";

// Validation Schema
const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm Password is required." }),
    profileImage: z
      .custom((file) => file instanceof File, { message: "Profile image is required." })
      .refine((file) => file && file.size > 0, { message: "Invalid file. Please upload an image." }),
    referralCode: z.string().optional(), // Optional referral
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Infer form data type
type FormData = z.infer<typeof formSchema>;

// Props interface
interface RegisterFormProps {
  referralCode?: string;
}

export function RegisterForm({ referralCode }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: null,
      referralCode: referralCode || "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  // Auto-fill referral code if prop is passed
  useEffect(() => {
    if (referralCode) setValue("referralCode", referralCode);
  }, [referralCode, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("profileImage", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const toastId = toast.loading("Waiting...");
    const { name, email, password, profileImage, referralCode } = data;
    const imageUrl = await imageUpload(profileImage);

    if (!imageUrl) {
      toast.dismiss(toastId);
      return toast.error("Image upload failed!");
    }

    const payload = { name, email, password, image: imageUrl, role: "user", referralCode };
    // const userConfirm = await registerUser(payload);

    toast.dismiss(toastId);

    if (true) {
      toast.success("Successfully created!");
      reset();
      setPreview(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] my-6 bg-gray-50">
      <div className="p-8 shadow-lg rounded-lg max-w-md w-full bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              {...register("name")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-gray-700 mb-2">Referral Code (Optional)</label>
            <input
              type="text"
              placeholder="Enter referral code"
              {...register("referralCode")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 border-gray-300"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-gray-700 mb-2">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {preview && (
              <div className="mt-2">
                <Image
                  src={preview}
                  alt="Profile Preview"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">{errors.profileImage.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-500 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
