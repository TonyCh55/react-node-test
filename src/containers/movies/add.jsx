import React, { useEffect, useState } from "react";
import AddMoviePage from "components/movies/add";
import PropTypes from "prop-types";
import axios from "axios";
import { baseUrl } from "constants/index";

const AddMovieContainer = ({ history }) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    return axios
      .get(`${baseUrl}/api/movies`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setMovies(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  };

  const handleSubmit = (e, movie) => {
    e.preventDefault();

    if (
      movie &&
      movie.stars &&
      !movie.stars.filter((item, index) => movie.stars.indexOf(item) !== index)
        .length
    ) {
      const filterStars = movie.stars.filter(
        (item, index) => movie.stars.indexOf(item) === index
      );

      if (
        !movies.find(
          (el) =>
            el.title === movie.title &&
            el.year === movie.year &&
            el.stars === filterStars.join(", ")
        )
      ) {
        axios
          .post(`${baseUrl}/api/movies`, {
            ...movie,
            stars: filterStars.join(", "),
          })
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              history.push("/movies");
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      } else {
        alert("This movie  already exists");
      }
    } else {
      alert("You can`t add the same actor");
    }
  };

  return <AddMoviePage handleSubmit={handleSubmit} />;
};

AddMovieContainer.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default AddMovieContainer;
