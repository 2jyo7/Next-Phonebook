"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

export interface PhBookType {
  PhNumber: string;
  contactName: string;
  _id: string;
}

const ListOfNumbers = () => {
  const [PhoneLists, setPhoneLists] = useState<PhBookType[]>([]);

  const handlePhDelete = async (id: string) => {
    try {
      const delPh = await axios.delete(`/api/DeletePh/${id}`);
      console.log("Deleted contact:", delPh);

      // Update the phone list after deletion
      setPhoneLists((prev) => prev.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const getAllContacts = async () => {
    try {
      const contacts = await axios.get("/api/ContactData");
      setPhoneLists(contacts?.data?.data || []);
    } catch (error) {
      console.log("Error getting contacts: ", error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  // console.log(PhoneLists);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Phone List
      </h1>
      <div className="space-y-4">
        {PhoneLists.map((contact) => (
          <article
            key={contact._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <ul className="text-gray-700">
              <li className="mb-2">
                <span className="font-semibold text-gray-900">PhNum:</span>{" "}
                {contact.PhNumber}
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  ContactName:
                </span>{" "}
                {contact.contactName}
              </li>
              <Link href={`updateNum/${contact._id}`}>
                <button>
                  <FaEdit />
                </button>
              </Link>

              <button onClick={() => handlePhDelete(contact._id)}>
                <MdDeleteSweep />
              </button>
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ListOfNumbers;
