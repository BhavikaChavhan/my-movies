import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

// Reusable NavLinks component
function NavLinks({ onClick = () => {} }) {
  return (
    <ul className="flex flex-col md:flex-row gap-3 md:gap-4 text-gray-300 md:text-gray-400 items-center text-base">
      <li>
        <Link to="/" onClick={onClick} className="hover:text-yellow-400">
          Popular
        </Link>
      </li>
      <li>
        <Link
          to="/top-rated"
          onClick={onClick}
          className="hover:text-yellow-400"
        >
          Top Rated
        </Link>
      </li>
      <li>
        <Link
          to="/upcoming"
          onClick={onClick}
          className="hover:text-yellow-400"
        >
          Upcoming
        </Link>
      </li>
    </ul>
  );
}

// Reusable SearchForm component
function SearchForm({ query, setQuery, onSubmit, className = "" }) {
  return (
    <form onSubmit={onSubmit} className={`flex ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie name"
        className="px-3 py-1 text-black rounded text-sm placeholder:text-sm placeholder:text-gray-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 ml-2 rounded text-sm"
      >
        Search
      </button>
    </form>
  );
}

function Navbar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (query.trim() !== "") {
        navigate(`/search?query=${query}`);
        setQuery("");
        setIsOpen(false);
      }
    },
    [query, navigate]
  );

  return (
    <nav className="bg-gray-900 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-around">
        {/* Logo */}
        <div className="text-lg font-bold">MovieDb</div>

        {/* Hamburger icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg
              className="w-6 h-6"
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

        {/* Desktop Nav & Search */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLinks />
          <SearchForm
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center gap-4">
          <NavLinks onClick={() => setIsOpen(false)} />
          <SearchForm
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
            className="flex-col w-full max-w-xs items-center gap-2 px-2"
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
