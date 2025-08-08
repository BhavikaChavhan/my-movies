import { useEffect, useState, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3/movie/popular";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch movies (wrapped in useCallback for optimization)
  const getPopularMovies = useCallback(async () => {
    try {
      const res = await fetch(
        `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await res.json();

      if (data?.results?.length > 0) {
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDB max page limit
      }
    } catch (err) {
      console.error("Failed to fetch popular movies:", err);
    }
  }, [page]);

  // Trigger fetch on page change
  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  return (
    <div className="py-7 bg-gray-800 min-h-screen">
      <h1 className="text-white text-xl sm:text-3xl font-bold text-center mb-6">
        Popular Movies
      </h1>

      {/* Movie Grid */}
      <div className="flex flex-wrap justify-center gap-4 px-1">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white">No movies found.</p>
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
