import { useEffect, useState, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3/movie/upcoming";

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch upcoming movies
  const fetchUpcomingMovies = useCallback(async () => {
    try {
      const res = await fetch(
        `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await res.json();

      if (data?.results?.length > 0) {
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // max 500 pages
      }
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchUpcomingMovies();
  }, [fetchUpcomingMovies]);

  return (
    <div className="bg-gray-800 min-h-screen py-6">
      <h1 className="text-xl sm:text-3xl font-bold text-center text-white mb-6">
        Upcoming Movies
      </h1>

      {/* Movie List */}
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white">No upcoming movies found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
