import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL parameters
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      const token = user?.token;
      try {
        if (token !== null) {
          const response = await axios.get(
            `http://localhost:5100/events/${id}`,
            {
              headers: { Authorization: token },
            }
          );
          setEvent(response.data);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, user, navigate, flag]);

  const handleJoin = async () => {
    Swal.fire({
      title: "Processing...",
      text: "Please wait while joining the event.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      await axios.put(
        `http://localhost:5100/events/${id}`,
        {
          attendees: [
            ...event.attendees,
            {
              userId: user.userId,
              userName: user.username,
              userEmail: user.email,
            },
          ],
        },
        { headers: { Authorization: user?.token } }
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "You successfully joined!",
      });
      setFlag(!flag);
      console.log("Successfully joined the event!");
    } catch (error) {
      console.log("Failed to join event", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to create event. Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    // Show a SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    // Show a SweetAlert loading spinner
    Swal.fire({
      title: "Deleting...",
      text: "Please wait while we delete the video.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      await axios.delete(`http://localhost:5100/events/${id}`, {
        headers: { Authorization: user?.token },
      });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The video has been deleted successfully!",
      });
      setFlag(!flag);
      console.log("Event deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Failed to delete event", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to delete the video. Please try again.",
      });
    }
  };

  const handleUpdate = async () => {
    Swal.fire({
      title: "Saving...",
      text: "Please wait while we save your changes.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await axios.put(`http://localhost:5100/events/${id}`, updatedEvent, {
        headers: { Authorization: user?.token },
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Video updated successfully!",
      });

      setFlag(!flag);
      console.log("Event updated successfully");
      setOpen(false);
    } catch (error) {
      console.log("Failed to update event", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to update the video. Please try again.",
      });
    }
  };

  const isAttendee = () => {
    const attendee = event.attendees.map(
      (attendee) => attendee.userEmail === user.email
    );
    return attendee.includes(true);
  };
  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!event)
    return <div className="text-center text-gray-500">No event found</div>;
  return (
    <>
      <div className="flex justify-center">
        <div className="p-4 md:p-8 md:w-5/6 mx-5 md:mx-10 my-20 bg-white rounded-xl shadow-lg border border-gray-200">
          <button
            onClick={() => navigate(-1)} // When clicked, navigate to the previous page
            className="flex items-center gap-2 mb-5 self-start text-base font-medium transition-colors duration-200 hover:scale-105"
          >
            <IoArrowBackCircle className="text-4xl sm:text-5xl" />
          </button>
          <div className="lg:flex w-full gap-5">
            <div className="w-full lg:w-1/3 self-center">
              <img
                src={event.eventImage}
                alt={event.eventName}
                className="w-full md:h-72 lg:h-64 object-cover rounded-xl"
              />
            </div>
            <div className="w-full lg:w-2/3 flex flex-col justify-start">
              <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
                {event.eventName}
              </h1>
              <div className="md:flex gap-8">
                <p className="text-gray-600 flex font-bold mt-2 text-lg md:text-xl gap-2">
                  <FaCalendarAlt className="self-center text-blue-600 text-xl md:text-2xl" />
                  {new Date(event.eventDate).toDateString()}
                </p>
                <p className="text-gray-700 flex font-bold mt-2 text-lg md:text-xl gap-2">
                  <FaMapLocationDot className="text-red-600 self-center text-xl md:text-2xl" />{" "}
                  {event.eventLocation}
                </p>
              </div>
              <p className="mt-2 text-gray-800 font-medium italic text-base md:text-lg leading-relaxed">
                {event.eventDescription}
              </p>
              <h2 className=" text-xs md:text-sm italic font-semibold mt-2 text-gray-600">
                Created By: {event.createdBy.creatorName} (
                {event.createdBy.creatorEmail})
              </h2>
              <h2 className="text-xl font-semibold mt-4 text-gray-900">
                Attendees: {event.attendees.length}
              </h2>
              {event.createdBy.creatorEmail !== user.email ? (
                <>
                  {isAttendee() ? (
                    <>
                      <button
                        disabled
                        className="bg-gradient-to-r mt-4 w-full md:w-1/3 from-gray-300 to-gray-600 font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform hover:shadow-lg text-xl"
                      >
                        Joined
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleJoin}
                        className="bg-gradient-to-r mt-4 w-full md:w-1/3 from-yellow-400 to-orange-500 text-white font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform hover:shadow-lg text-xl"
                      >
                        Join
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="md:flex gap-5">
                    <button
                      onClick={() => setOpen(true)}
                      className="mt-4 w-full md:w-1/3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform hover:shadow-lg text-xl"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-gradient-to-r mt-4 w-full md:w-1/3 from-rose-500 to-red-700 text-white font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform hover:shadow-lg text-xl"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Update Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold">Update Event</h2>
            <input
              className="w-full p-2 border rounded mt-2"
              placeholder="Event Name"
              defaultValue={event.eventName}
              onChange={(e) =>
                setUpdatedEvent({ ...updatedEvent, eventName: e.target.value })
              }
            />
            <input
              className="w-full p-2 border rounded mt-2"
              type="date"
              defaultValue={event.eventDate}
              onChange={(e) =>
                setUpdatedEvent({ ...updatedEvent, eventDate: e.target.value })
              }
            />
            <input
              className="w-full p-2 border rounded mt-2"
              placeholder="Location"
              defaultValue={event.eventLocation}
              onChange={(e) =>
                setUpdatedEvent({
                  ...updatedEvent,
                  eventLocation: e.target.value,
                })
              }
            />
            <textarea
              className="w-full p-2 border rounded mt-2"
              placeholder="Description"
              defaultValue={event.eventDescription}
              onChange={(e) =>
                setUpdatedEvent({
                  ...updatedEvent,
                  eventDescription: e.target.value,
                })
              }
            />
            <input
              className="w-full p-2 border rounded mt-2"
              placeholder="eventImage"
              defaultValue={event.eventImage}
              onChange={(e) =>
                setUpdatedEvent({
                  ...updatedEvent,
                  eventImage: e.target.value,
                })
              }
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetails;
