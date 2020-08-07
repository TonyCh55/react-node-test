import React from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";

const MoviePage = ({ movie }) => {
  return (
    movie && (
      <div className={s.page}>
        <h2 className={s.pageTitle}>{movie.title}</h2>
        <p className={s.pageInfo}>{movie.year}</p>
        <p className={s.pageInfo}>{movie.format}</p>
        <p className={s.pageInfo}>{movie.stars}</p>
      </div>
    )
  );
};

MoviePage.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    stars: PropTypes.string.isRequired,
  }),
};

MoviePage.defaultProps = {
  movie: null,
};

export default MoviePage;
