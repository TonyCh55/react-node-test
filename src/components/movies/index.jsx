import React, { useState } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "components/core/movie-card";
import { Link } from "react-router-dom";
import s from "./styles.module.scss";

const MoviesPage = ({ data, onSearch, onSort, onDelete }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={s.page}>
      <div className={s.pageInputWrapper}>
        <input
          type="text"
          className={s.pageInput}
          onChange={handleChange}
          value={value}
          placeholder="Search"
        />

        <button
          onClick={() => onSort()}
          type="button"
          className={s.pageSortBtn}
        >
          Sort
        </button>
      </div>

      {data.map((el) => (
        <Link key={el._id} to={`movies/${el._id}`}>
          <MovieCard className={s.pageCard} card={el} onDelete={onDelete} />
        </Link>
      ))}
    </div>
  );
};

MoviesPage.propTypes = {
  data: PropTypes.arrayOf(MovieCard.propTypes.card).isRequired,
  onSearch: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MoviesPage;
