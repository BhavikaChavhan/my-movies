import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// API details
const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null); // Store movie info
  const [cast, setCast] = useState([]);     // Store cast list

  // Get movie details from TMDB
  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data); // set movie data
    } catch (error) {
      console.log("Error fetching movie details:", error);
    }
  };

  // Get cast members
  const fetchMovieCast = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setCast(data.cast.slice(0, 10)); // show top 10 cast
    } catch (error) {
      console.log("Error fetching cast:", error);
    }
  };

  // Fetch data when component loads or when id changes
  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  // Show loading message until movie data comes
  if (!movie) {
    return <p className="text-white text-center mt-10">Loading movie details...</p>;
  }

  return (
    <div className="bg-gray-800 text-white p-6 min-h-screen">
      {/* Movie Info Section */}
      <div className="bg-black p-6 rounded-lg max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-6">
        
        {/* Movie Poster */}
        <div className="w-full md:w-[300px]">
          <img
            src={movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image"}
            alt={movie.title}
            className="w-full h-[300px] object-full rounded"
          />
        </div>

        {/* Movie Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>
          <p className="text-blue-400 mb-2">Rating: {movie.vote_average}</p>
          <p className="text-red-400 mb-2">
            Genres: {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="text-green-400 mb-2">Release Date: {movie.release_date}</p>
          <p>
            <span className="font-semibold">Overview:</span><br /> {movie.overview}
          </p>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">

          {cast.map((actor) => (
            <div key={actor.cast_id} className="text-center">
              <img
                src={actor.profile_path ? IMG_URL + actor.profile_path : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={actor.name}
                className="w-full h-[240px] object-full rounded mb-2"
              />
              <p className="text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-300">as {actor.character}</p>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
