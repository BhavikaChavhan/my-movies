import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

// TMDB API key
const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

function Upcoming() {
  // State for movie list
  const [movies, setMovies] = useState([]);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch upcoming movies from API
  const fetchUpcomingMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await res.json();

      setMovies(data.results); // save movie list
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // limit to 500 pages
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  // Call API when page changes
  useEffect(() => {
    fetchUpcomingMovies();
  }, [page]);

  return (
    <div className="bg-gray-800 min-h-screen text-black py-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Upcoming Movies</h1>

      {/* Movies grid */}
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Upcoming;
