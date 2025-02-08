/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/eventdetails/${event._id}`);
  };

  return (
    <div className="w-full sm:w-80 lg:w-72 bg-white m-5 flex flex-col rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 border border-gray-200 overflow-hidden relative">
      {/* Event Image */}
      <div className="w-full h-40 bg-gray-200 overflow-hidden">
        <img
          src={event.eventImage}
          alt={event.eventName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="p-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 truncate">
          {event.eventName}
        </h2>
        <p className="text-gray-500 text-base font-bold mt-1 flex justify-center gap-1">
          <FaCalendarAlt className="self-center text-lg" />
          {new Date(event.eventDate).toLocaleDateString("en-GB")}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-auto flex justify-center pb-4">
        <button
          onClick={handleViewDetails}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform hover:shadow-lg"
        >
          View Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
