import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center py-4 bg-transparent-400 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/cities" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/allCity" className="hover:text-gray-300">
            Cities
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
