/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";
import axios from "axios";

const EventList = () => {
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(true); // State for loading status
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // Set loading state to true when fetching data
      const token = user?.token; // Get the user's token for authorization
      try {
        if (token !== null) {
          // Fetch video data from the server if the user is authenticated
          const response = await axios.get("http://localhost:5100/events", {
            headers: {
              Authorization: token, // Pass token in the Authorization header for security
            },
          });
          setEventList(response.data); // Update the Redux store with the fetched videos
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        console.error(err);
        navigate("/"); // Redirect the user to the home page
      } finally {
        setLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchEvents(); // Call the function to fetch videos when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="text-center">
        <h1 className="mt-32 text-6xl font-bold text-gray-900">
          Seamlessly <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">create</span>, organize,
          and manage unforgettable events with ease.
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          From planning to execution, elevate every experience with the ultimate
          event management tool.
        </p>
      </div>
      <div className="flex flex-wrap justify-center my-20">
        {eventList.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </>
  );
};

export default EventList;
