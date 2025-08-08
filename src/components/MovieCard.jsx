import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  let poster;

    if (movie.poster_path) {
    poster = `${IMAGE_BASE_URL}${movie.poster_path}`;
    } else {
    poster = "https://via.placeholder.com/500x750?text=No+Image";
    }

  return (
    <div className="bg-gray-400 rounded w-60 m-3 shadow hover:shadow-lg transition duration-200">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={poster}
          alt={movie.title}
          className="w-full sm:h-80 object-full rounded-t"
        />
      </Link>

      <div className="p-2 sm:p-4">
        <h3 className=" text-sm sm:text-lg font-bold mb-1">{movie.title}</h3>
        <p className="text-sm font-semibold text-blue-700 mb-1">
          Rating: {movie.vote_average}
        </p>
        
      </div>
    </div>
  );
}
