import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${query}`);
      setQuery("");
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-2 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-around">
        {/* Logo */}
        <div className="xs:text-md sm:text-xl font-bold">MovieDb</div>

        {/* Hamburger icon */}
        <div className="md:hidden flex items-center justify-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-4 text-gray-400">
          <li><Link to="/" className="hover:text-yellow-400">Popular</Link></li>
          <li><Link to="/top-rated" className="hover:text-yellow-400">Top Rated</Link></li>
          <li><Link to="/upcoming" className="hover:text-yellow-400">Upcoming</Link></li>
        </ul>

        {/* Desktop Search */}
        <form onSubmit={handleSubmit} className="hidden md:flex">
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
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center gap-3">
          {/* Nav Links */}
          <ul className="flex flex-col gap-2 text-gray-300 items-center xs:text-md sm:text-lg divide-y ">
            <li><Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Popular</Link></li> 
            <li><Link to="/top-rated" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Top Rated</Link></li>
            <li><Link to="/upcoming" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Upcoming</Link></li>
          </ul>

          {/* Search */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-2 px-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter movie..."
              className="w-full max-w-xs px-2 py-1 text-black rounded text-sm placeholder:text-sm placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="w-auto bg-blue-500 hover:bg-blue-600 text-white xs:px-1 sm:px-2 py-1 rounded text-sm"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
