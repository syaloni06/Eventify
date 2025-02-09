import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiEventbrite } from "react-icons/si";
import { BsFillBellFill } from "react-icons/bs";
import { FaCalendarPlus } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "../utils/userSlice";
import { RiLoginBoxFill } from "react-icons/ri";

const Header = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("wss://eventify-hhsz.onrender.com");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [...prev, data.message]);
      setFlag(true);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => socket.close();
  }, []);

  return (
    <>
      <header className="bg-white fixed top-0 w-full shadow-md z-50 py-3 px-6 flex justify-between items-center">
        <Link className="text-2xl md:text-3xl font-bold flex italic w-1/3">
          <SiEventbrite className="text-amber-400 text-2xl md:text-4xl self-center" />
          ventify
        </Link>
        <nav className="flex items-center space-x-6 justify-end w-1/2 relative">
          {/* Notification Bell */}
          <div className="relative">
            <BsFillBellFill
              className="text-xl md:text-2xl cursor-pointer"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setFlag(false);
              }}
            />
            {notifications.length > 0 && flag && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
                {notifications.length}
              </span>
            )}
          </div>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 bg-white shadow-md rounded-lg p-4 w-64">
              <h3 className="font-bold text-lg mb-2">🔔 Notifications</h3>
              {notifications.length > 0 ? (
                <ul className="space-y-2">
                  {notifications.map((note, index) => (
                    <li key={index} className="border-b pb-1 text-sm">
                      {note}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No new notifications</p>
              )}
            </div>
          )}

          {/* Create Event Button */}
          <Link to="/createevent" className="font-bold text-lg flex gap-1">
            <FaCalendarPlus className="text-xl md:text-2xl self-center" />
            <span className="hidden md:flex">Event</span>
          </Link>

          {/* User Authentication */}
          {user === null ? (
            <Link
              to="/signin"
              className="flex items-center space-x-2 font-bold text-lg gap-1"
            >
              <IoPersonCircleSharp className="text-xl md:text-3xl self-center" />{" "}
              <span className="hidden md:flex">SignIn</span>
            </Link>
          ) : (
            <button
              className="flex items-center space-x-2 font-bold text-lg gap-1"
              onClick={() => {
                dispatch(clearUserInfo());
                navigate("/");
              }}
            >
              <RiLoginBoxFill className="self-center text-2xl md:text-3xl" />
              <span className="hidden md:flex">Sign out</span>
            </button>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
