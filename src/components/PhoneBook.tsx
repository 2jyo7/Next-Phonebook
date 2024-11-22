"use client";
import axios from "axios";
import React, { useState } from "react";

const PhoneBook = () => {
  const [phoneBook, setPhoneBook] = useState({
    PhNumber: "",
    contactName: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPhoneBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneBook.PhNumber || !phoneBook.contactName) {
      alert("Both fields are required!");
      return;
    }

    setLoading(true);
    setSuccess(null);

    try {
      const res = await axios.post("/api/ContactData", phoneBook);
      if (res.status === 201) {
        setSuccess("Contact saved successfully!");
        setPhoneBook({ PhNumber: "", contactName: "" });
      }
    } catch (error) {
      setSuccess("Failed to save contact.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-96 w-full bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-700 mb-4">Add Contact</h2>

        <div className="mb-4">
          <label
            htmlFor="PhNumber"
            className="block text-gray-600 font-medium mb-1"
          >
            Phone Number:
          </label>
          <input
            type="text"
            id="PhNumber"
            name="PhNumber"
            placeholder="Enter Phone Number"
            value={phoneBook.PhNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contactName"
            className="block text-gray-600 font-medium mb-1"
          >
            Name:
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            placeholder="Enter Name"
            value={phoneBook.contactName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded-lg transition duration-200 ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Contact"}
        </button>
        {success && <p className="mt-4 text-center">{success}</p>}
      </form>
    </div>
  );
};

export default PhoneBook;
