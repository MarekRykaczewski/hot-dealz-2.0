"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const FinishAccountSetup = () => {
  const { userId } = useAuth();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Determine if user exists and what action to take
      let action;
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        action = data ? "patch" : "post";
      } catch (err) {
        console.error("Error checking user existence:", err);
        toast.error("Something went wrong. Please try again later.");
        return;
      }

      try {
        const response =
          action === "post"
            ? await axios.post(`/api/users/${userId}`, { username })
            : await axios.patch(`/api/users/${userId}`, { username });

        if (response.data.id) {
          toast.success(
            action === "post"
              ? "Account setup completed successfully!"
              : "Username updated successfully!"
          );
          router.push("/");
        }
      } catch (err) {
        console.error("Error saving username:", err);
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 justify-center">
      <h2 className="text-2xl font-bold mb-4">Finish Account Setup</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="mb-2 font-bold text-gray-800">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Username"}
        </button>
      </form>
    </div>
  );
};

export default FinishAccountSetup;
