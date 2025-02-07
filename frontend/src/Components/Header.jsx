import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
    <header className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <Link className="text-xl font-semibold text-yellow-500">Event Manager</Link>
      <nav className="flex items-center space-x-6">
        <Link to="/createevent" className="text-gray-700 hover:text-gray-900">Create Event</Link>
        <Link to="/signin" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
          <span>Login</span>
        </Link>
      </nav>
    </header>
    </>
  )
}

export default Header;