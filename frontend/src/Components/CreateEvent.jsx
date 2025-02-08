import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const CreateEvent = () => {
  // State to hold form input values
  const user = useSelector((state) => state.user.data);
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    description: "",
  });

  // State to hold validation error messages
  const [errors, setErrors] = useState({});

  // Handle input field changes and perform real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Validate individual input fields
  const validateField = (name, value) => {
    const fieldErrors = { ...errors };

    switch (name) {
      case "eventName":
        fieldErrors.eventName = value.trim() === "" ? "Event name is required." : "";
        break;
      case "date":
        fieldErrors.date = value ? "" : "Event date is required.";
        break;
      case "location":
        fieldErrors.location = value.trim() === "" ? "Event location is required." : "";
        break;
      case "description":
        fieldErrors.description = value.trim() === "" ? "Event description is required." : "";
        break;
    }

    setErrors(fieldErrors);
  };

  // Validate the entire form before submission
  const validateForm = () => {
    const fieldErrors = {};
    if (!formData.eventName) fieldErrors.eventName = "Event name is required.";
    if (!formData.date) fieldErrors.date = "Event date is required.";
    if (!formData.location) fieldErrors.location = "Event location is required.";
    if (!formData.description) fieldErrors.description = "Event description is required.";

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If form is not valid, stop submission
    if (!validateForm()) return;

    // Show a SweetAlert loading spinner
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we create the event.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      
      const event = {
        eventName: formData.eventName,
        eventDate: formData.date,
        eventLocation: formData.location,
        eventDescription: formData.description,
        createdBy: {
          creatorId: user.userId,
          creatorName: user.username,
          creatorEmail: user.email
        },
        attendees: [ {
          userId: user.userId,
          userName: user.username,
          userEmail: user.email
        }]
      };
      const token = user?.token; // Get user token
      const headers = {
        Authorization: token, // Set Authorization header
      };

      // Send POST request to create a new event
      const response = await axios.post(
        "http://localhost:5100/events",
        event,
        { headers }
      );

      if (response.status === 201) {
        setErrors({}); // Clear errors on success

        // Close the SweetAlert loading spinner and show success
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Event created successfully!",
        });

        setFormData({ eventName: "", date: "", location: "", description: "" });
      } else {
        setErrors({ form: "Unexpected response from the server." });
      }
    } catch (err) {
      console.error("Error:", err);
      // Close the SweetAlert loading spinner and show error
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to create event. Please try again.",
      });
    }
  };


  return (
    <div className="flex items-center my-20 justify-center">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Event</h2>
        {errors.form && <p className="text-red-500 text-sm text-center mb-4">{errors.form}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.eventName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Enter event name"
            />
            {errors.eventName && <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.date ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400 focus:border-blue-400"
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.location ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Enter event location"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.description ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Enter event description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
