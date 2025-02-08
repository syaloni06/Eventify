import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    description: "", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <>
    <div className="mx-auto w-1/2 p-6 mt-6">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="Event Name"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="Event Location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="Event Descriptiom"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    </>
  )
}

export default CreateEvent;