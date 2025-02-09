/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SearchEvent = ({
  setEventList,
  searchText,
  setSearchText,
  fullEventList,
}) => {
  const navigate = useNavigate();

  const searchEvents = () => {
    const searchedEvent = fullEventList.filter((event) => {
      if (!searchText || searchText.trim() === "") return true; // If no search term, return all videos

      // Split the search term into individual words
      const searchWords = searchText
        .toLowerCase()
        .split(" ")
        .filter((word) => word.trim() !== "");

      // Check if any word matches either the title, description, or uploader
      const matchesSearch = searchWords.some(
        (word) =>
          event.eventName?.toLowerCase().includes(word) ||
          event.eventDescription?.toLowerCase().includes(word) ||
          event.eventLocation?.toLowerCase().includes(word) ||
          event.createdBy.creatorName?.toLowerCase().includes(word)
      );

      return matchesSearch;
    });

    // Update the video list with filtered videos
    setEventList(searchedEvent);
    navigate("/"); // Navigate to the home page
  };

  return (
    <>
      <div className="flex mt-6 md:mt-8 justify-center">
        <div className="flex items-center mx-4 md:mx-28 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out w-full lg:w-2/3 self-center">
          <input
            className="w-full md:flex-grow rounded-l-full py-2 px-4 md:px-6 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-10 lg:h-12 transition-all duration-200 ease-in-out"
            type="text"
            name="task"
            value={searchText}
            id="task"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-yellow-400 to-orange-500 md:p-3 rounded-r-full h-10 lg:h-12 w-16 md:w-24 border border-yellow-400 flex items-center justify-center hover:bg-yellow-400 transition-all duration-200 ease-in-out"
            onClick={searchEvents}
          >
            <FaSearch className="text-white text-lg lg:text-2xl transition-transform duration-200 ease-in-out transform hover:scale-110" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchEvent;
