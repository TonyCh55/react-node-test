import React, { useState } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";

const AddMovie = ({ handleSubmit }) => {
  const [movie, setValue] = useState(null);

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={s.page}>
      <h2 className={s.pageTitle}>Add movie</h2>

      <form
        className={s.pageForm}
        onSubmit={(e) => handleSubmit(e, movie)}
        method="post"
      >
        <input
          className={s.pageFormInput}
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Movie title"
        />
        <input
          className={s.pageFormInput}
          type="number"
          name="year"
          onChange={handleChange}
          placeholder="Movie year"
        />
        <input
          className={s.pageFormInput}
          type="text"
          name="format"
          onChange={handleChange}
          placeholder="Movie format"
        />

        <input
          className={s.pageFormInput}
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="Movie stars"
        />

        <button className={s.pageFormSubmit} type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

AddMovie.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AddMovie;
