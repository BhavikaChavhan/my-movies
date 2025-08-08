import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      console.log("Error fetching movie details:", error);
    }
  };

  const fetchMovieCast = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setCast(data.cast.slice(0, 10));
    } catch (error) {
      console.log("Error fetching cast:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  if (!movie) {
    return <p className="text-white text-center mt-10 text-sm sm:text-base">Loading movie details...</p>;
  }

  return (
    <div className="bg-gray-800 text-white pt-5 p-1 sm:p-4 min-h-screen">
      {/* Movie Info */}
      <div className="bg-black p-3 sm:p-6 rounded-lg max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-4 sm:gap-6">
        
        {/* Poster */}
        <div className="w-full md:w-[300px]">
          <img
            src={
              movie.poster_path
                ? IMG_URL + movie.poster_path
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className="w-full h-[220px] xs:h-[260px] sm:h-[300px] object-full rounded"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1 text-xs xs:text-sm sm:text-base">
          <h1 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-3">{movie.title}</h1>
          <p className="text-blue-400 mb-1 sm:mb-2">Rating: {movie.vote_average}</p>
          <p className="text-red-400 mb-1 sm:mb-2">
            Genres: {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="text-green-400 mb-1 sm:mb-2">Release Date: {movie.release_date}</p>
          <p>
            <span className="font-semibold">Overview:</span><br /> {movie.overview}
          </p>
        </div>
      </div>

      {/* Cast */}
      <div className="mt-6 sm:mt-10 max-w-6xl mx-auto px-1 pb-4">
        <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4">Cast</h2>
        <div className="grid grid-cols-1 min-[240px]:grid-cols-2 xs:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-4">


          {cast.map((actor) => (
            <div key={actor.cast_id} className="text-center text-[10px] xs:text-xs">
              <img
                src={
                  actor.profile_path
                    ? IMG_URL + actor.profile_path
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={actor.name}
                className="w-full h-[180px] sm:h-[240px] object-full rounded mb-1 sm:mb-2"
              />
              <p className="font-medium truncate">{actor.name}</p>
              <p className="text-gray-300 truncate">as {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
