import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

// API key and base setup
const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

function Home() {
  // States to store movies, current page and total pages
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch popular movies from TMDB
  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await response.json();

      // Save results in state
      setMovies(data.results);
      
      // Limit total pages to max 500 (TMDB limit)
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
    } catch (error) {
      console.log("Error fetching popular movies:", error);
    }
  };

  // Fetch movies whenever the page changes
  useEffect(() => {
    getPopularMovies();
  }, [page]);

  return (
    <div className="py-7 bg-gray-800 min-h-screen">
      <h1 className="text-white xs:text-xl sm:text-3xl font-bold text-center mb-6">Popular Movies</h1>

      {/* Movie list */}
      <div className="flex flex-wrap justify-center gap-8">
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

export default Home;
