import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  // State to hold search input
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // Handle search form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    if (query.trim() !== "") {
      // Navigate to search page
      navigate(`/search?query=${query}`);
      setQuery(""); // clear input after submit
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-around">
      {/* Logo or name of the site */}
      <div className="text-2xl font-bold mb-2 md:mb-0">
        MovieDb
      </div>

      {/* Navigation links */}
      <ul className="flex gap-4 mb-2 md:mb-0 text-gray-400">
        <li>
          <Link to="/" className="hover:text-yellow-400">Popular</Link>
        </li>
        <li>
          <Link to="/top-rated" className="hover:text-yellow-400">Top Rated</Link>
        </li>
        <li>
          <Link to="/upcoming" className="hover:text-yellow-400">Upcoming</Link>
        </li>
      </ul>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie name"
          className="px-3 py-1 text-black rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 ml-2 rounded"
        >
          Search
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
