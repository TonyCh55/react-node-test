import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MoviePage from "components/movies/movie-page";
import axios from "axios";
import { baseUrl } from "constants/index";
import { Loader } from "components/core/loader";

const MoviesContainer = ({ ...props }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    const load = () => {
      return axios
        .get(`${baseUrl}/api/movies/${props.match.params.id}`)
        .then((res) => {
          setLoading(0);
          setMovie(res.data);
        })
        .catch((e) => {
          console.log(e);
          alert(e.message);
          setLoading(0);
        });
    };
    load();
  }, [props.match.params.id]);

  return loading ? <Loader /> : <MoviePage movie={movie} />;
};

MoviesContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MoviesContainer;
