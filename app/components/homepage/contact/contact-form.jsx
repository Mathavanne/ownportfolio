"use client";

import { useState } from "react";
import axios from "axios";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

// Simple email validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function ContactForm() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState({
    email: false,
    required: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!userInput.name || !userInput.email || !userInput.message) {
      setError((prev) => ({ ...prev, required: true }));
      return false;
    }

    if (!isValidEmail(userInput.email)) {
      setError((prev) => ({ ...prev, email: true }));
      return false;
    }

    setError({ email: false, required: false });
    return true;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const res = await axios.post("/api/contact", userInput);

      if (res.data.success) {
        toast.success("Message sent successfully!");

        // Reset form
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(res.data.message || "Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message || "Server error! Try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact with me
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-4 lg:p-6"
      >
        <p className="text-sm text-[#d3d8e8] mb-6">
          If you have any questions or opportunities, feel free to contact me.
        </p>

        {/* Name */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Your Name:</label>
          <input
            type="text"
            name="name"
            value={userInput.name}
            onChange={handleChange}
            className="bg-[#10172d] border border-[#353a52] rounded-md px-3 py-2 outline-none focus:border-[#16f2b3]"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Your Email:</label>
          <input
            type="email"
            name="email"
            value={userInput.email}
            onChange={handleChange}
            className="bg-[#10172d] border border-[#353a52] rounded-md px-3 py-2 outline-none focus:border-[#16f2b3]"
          />
          {error.email && (
            <p className="text-sm text-red-400">
              Please enter a valid email!
            </p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Your Message:</label>
          <textarea
            name="message"
            rows="4"
            value={userInput.message}
            onChange={handleChange}
            className="bg-[#10172d] border border-[#353a52] rounded-md px-3 py-2 outline-none focus:border-[#16f2b3]"
          />
        </div>

        {/* Errors */}
        {error.required && (
          <p className="text-sm text-red-400 mb-3">
            All fields are required!
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-medium uppercase text-white disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send Message"}
          <TbMailForward size={18} />
        </button>
      </form>
    </div>
  );
}
