import React from "react";
import AddMoviePage from "components/movies/add";
import PropTypes from "prop-types";
import axios from "axios";
import { baseUrl } from "constants/index";

const AddMovieContainer = ({ history }) => {
  const handleSubmit = (e, movie) => {
    e.preventDefault();

    if (movie && movie.title && movie.year && movie.format && movie.stars) {
      axios
        .post(`${baseUrl}/api/movies`, movie)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            history.push("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } else alert("All the fields are required");
  };

  return <AddMoviePage handleSubmit={handleSubmit} />;
};

AddMovieContainer.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default AddMovieContainer;
