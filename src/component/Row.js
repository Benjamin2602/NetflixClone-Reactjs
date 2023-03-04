// import React from 'react';
import React, { useState , useEffect } from 'react';
import axios from '../axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title,fetchUrl, isLargeRow }) {
  // state is basically the way to write variable in react
  const [movies, setMovies] = useState([]) ;

  const [trailerUrl, setTrailerUrl] = useState('');
  
  // a snippet of code which runs based on a specific condition/variable

// what i am going to achieve here is 
//i need to run a piece of code when Row loads
// what row loads ?
// example trending now i am gonna make a request to tmdb which is that movie  server

// now what useEffect does here is every time the row loads this useEffect of code runs

  useEffect(() =>{
    // if [], run once when the row loads , and don't run again
    // async means we are requesting from a third-party app or service
    async function fetchData() {
        // await gonna say when you make the request wait for the answer to comeback
        const request = await axios.get(fetchUrl);
        // we get "http://api.themoviedb.org/3",
        //"http://api.themoviedb.org/3/discover/tv?api_key=${APIKEY}&with_networks=213", from requests.js(netflix originals)
        setMovies(request.data.results);
        return request;

    }
    fetchData();
  },[fetchUrl]);

  // console.table(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  
 

  const handleClick = (movie) => {
    if (trailerUrl) {
        setTrailerUrl("");
    } else {
        movieTrailer(movie?.name || movie?.title || movie?.original_name || movie?.original_title)
        .then(url => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => console.log(error));
    }
};






return (
  <div className='row'>
      <h2 className='row__title'>{title}</h2>
      
      <div className="row__posters">
          {movies.map(movie => (
              <img 
              key={movie.id} 
              onClick={() => handleClick(movie)}
              className= {`row__poster ${isLargeRow && "row__posterLarge"}`} 
              src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
              alt={movie.name} 
               />
          ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} className="trailerVideo" />}

  </div>
)
}

export default Row;