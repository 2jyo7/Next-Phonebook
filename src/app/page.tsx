import ListOfNumbers from "@/components/ListOfNumbers ";
import PhoneBook from "@/components/PhoneBook ";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-lg shadow-md">
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
        <PhoneBook />
      </div>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
        <ListOfNumbers />
      </div>
    </div>
  );
}
