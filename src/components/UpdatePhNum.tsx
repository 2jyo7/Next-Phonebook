"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PhBookType } from "./ListOfNumbers";
import { useRouter } from "next/navigation";

const UpdatePhNum = ({ id }: { id: string }) => {
  const router = useRouter();
  const [oldNum, setOldNum] = useState<PhBookType | null>(null);
  const [formData, setFormData] = useState({ contactName: "", PhNumber: "" });

  // Fetch the existing number by ID
  const getOldNum = async () => {
    try {
      const res = await axios.get(`/api/getOneNum/${id}`);
      setOldNum(res.data.data);
      setFormData({
        contactName: res.data.data.contactName,
        PhNumber: res.data.data.PhNumber,
      });
    } catch (error) {
      console.error("Error fetching the phonebook entry:", error);
    }
  };

  // Update handler for form submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/api/updatePhData/${id}`, formData);
      console.log(res.data.message); // Display success message
      router.push("/");
    } catch (error) {
      console.error("Error updating the phonebook entry:", error);
      console.log("Failed to update the phonebook entry.");
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getOldNum();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-center mb-4">Update Contact</h2>
      {oldNum ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label
              htmlFor="contactName"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="PhNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="PhNumber"
              name="PhNumber"
              value={formData.PhNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500">Loading contact details...</p>
      )}
    </div>
  );
};

export default UpdatePhNum;
