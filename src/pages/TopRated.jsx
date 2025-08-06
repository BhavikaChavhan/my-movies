import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

// TMDB API key
const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

function TopRated() {
  // States for storing movie data, current page, and total pages
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch top rated movies
  const fetchTopRatedMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      const data = await response.json();

      // Save movies and total pages in state
      setMovies(data.results);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // limit max pages to 500
    } catch (error) {
      console.log("Error fetching top rated movies:", error);
    }
  };

  // Call API whenever the page changes
  useEffect(() => {
    fetchTopRatedMovies();
  }, [page]);

  return (
    <div className="bg-gray-800 min-h-screen text-black py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Top Rated Movies</h1>

      {/* Movie Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default TopRated;
