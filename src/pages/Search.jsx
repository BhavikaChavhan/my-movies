import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

// API key
const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

function Search() {
  // State for movies, current page, total pages
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Get the search query from URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  // Fetch search results from TMDB API
  const fetchMoviesBySearch = async () => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
      );
      const data = await res.json();

      setMovies(data.results); // save movie list
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB max is 500 pages
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Fetch whenever query or page changes
  useEffect(() => {
    fetchMoviesBySearch();
  }, [query, page]);

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-black">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Search Results for: <span className="text-yellow-300">{query}</span>
      </h2>

      {/* If no movies found */}
      {movies.length === 0 ? (
        <p className="text-center text-red-400">No movies found.</p>
      ) : (
        <>
          {/* Movie cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination component */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export default Search;
