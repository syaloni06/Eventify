/* eslint-disable react/prop-types */
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const SearchEvent = ({ setEventList, searchText, setSearchText, fullEventList }) => {
  
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
      <div className="flex items-center rounded-full shadow-sm lg:w-full self-center">
        <input
          className=" md:flex-grow rounded-l-full py-2  px-3 md:px-6 text-gray-700 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-8 lg:h-10"
          type="text"
          name="task"
          value={searchText}
          id="task"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="bg-gray-50 md:p-3 rounded-r-full h-8 lg:h-10  w-8 md:w-18 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
          onClick={searchEvents}
        >
          <CiSearch className="text-black text-base lg:text-2xl" />
        </button>
      </div>
    </>
  );
};

export default SearchEvent;
