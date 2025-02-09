import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/API_URL";

const SignUp = () => {
  // State to hold form input values
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // State to hold validation error messages
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Navigate to other routes after successful signup

  // Handle input field changes and perform real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate individual field on change
    validateField(name, value);
  };

  // Validate individual input fields
  const validateField = (name, value) => {
    const fieldErrors = { ...errors };

    switch (name) {
      case "username":
        fieldErrors.username =
          value.trim() === "" ? "Username is required." : ""; // Check if username is not empty
        break;
      case "email":
        fieldErrors.email = value.includes("@") ? "" : "Invalid email address."; // Validate email format
        break;
      case "password":
        fieldErrors.password =
          value.length < 6
            ? "Password must be at least 6 characters long."
            : ""; // Ensure password is at least 6 characters long
        break;
    }

    setErrors(fieldErrors);
  };

  // Validate the entire form before submission
  const validateForm = () => {
    const fieldErrors = {};
    if (!formData.username) fieldErrors.username = "Username is required.";
    if (!formData.email.includes("@"))
      fieldErrors.email = "Invalid email address."; // Check for valid email
    if (formData.password.length < 6)
      fieldErrors.password = "Password must be at least 6 characters long."; // Password length check

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if form is not valid

    try {
      const response = await axios.post(
        `${API_URL}/register`, // Send POST request to register the user
        formData
      );

      if (response.status === 201) {
        setErrors({}); // Clear errors on successful signup
        navigate("/signin"); // Redirect to sign-in page
      } else {
        setErrors({ form: "Unexpected response from the server." });
      }
    } catch (err) {
      console.error("Error:", err);
      setErrors({ form: "Failed to sign up. Please try again." }); // Handle errors from the server
    }
  };

  return (
    <div className="flex items-center mt-40 lg:mt-20 justify-center ">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        {/* Display form submission errors */}
        {errors.form && (
          <p className="text-red-500 text-sm text-center mb-4">{errors.form}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username input field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          {/* Email input field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Password input field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {/* Redirect link to Sign In page */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;