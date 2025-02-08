import { Link } from "react-router-dom";
import { SiEventbrite } from "react-icons/si";
import { BsFillBellFill } from "react-icons/bs";
import { MdAddCard } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
const Header = () => {
  return (
    <>
    <header className="bg-white fixed top-0 w-full shadow-md py-3 px-6 flex justify-between items-center">
      <Link className="text-3xl font-bold flex italic w-1/3"><SiEventbrite className="text-amber-400 text-4xl"/>ventify</Link>
      <nav className="flex items-center space-x-6 justify-end w-1/2">
      <BsFillBellFill className="text-2xl"/>
        <Link to="/createevent" className="font-bold text-lg flex gap-1"><MdAddCard className="text-2xl self-center"/>Event</Link>
        <Link to="/signin" className="flex items-center space-x-2 font-bold text-lg gap-1"><IoPersonCircleSharp className="text-2xl self-center"/> SignIn
        </Link>
      </nav>
    </header>
    </>
  )
}

export default Header;