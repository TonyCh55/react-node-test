import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formats } from "constants/index";
import s from "./styles.module.scss";

const AddMovie = ({ handleSubmit }) => {
  const date = new Date();
  const [movie, setValue] = useState({});
  const [stars, setStars] = useState([{ star: "", id: Date.now() }]);
  const [actors, setActors] = useState({});

  useEffect(
    () =>
      setValue((prev) => {
        return { ...prev, stars: Object.values(actors) };
      }),
    [actors]
  );

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    if (
      (e.target.name === "year" && Number(e.target.value) < 1850) ||
      Number(e.target.value) > date.getFullYear()
    ) {
      return null;
    }

    return setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActorsChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    return setActors((prev) => ({
      ...prev,
      [name]: value.trim(),
      // [name]: value.toLowerCase().trim(),
    }));
  };

  const addStar = () => {
    setStars([...stars, { star: "", id: Date.now() }]);
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
          required
          className={s.pageFormInput}
          name="title"
          onChange={handleChange}
          placeholder="Movie title"
        />

        <input
          required
          className={s.pageFormInput}
          type="number"
          name="year"
          min="1850"
          max={`${date.getFullYear()}`}
          onChange={handleChange}
          placeholder="Movie year"
        />

        <select
          required
          onChange={handleChange}
          onBlur={() => {}}
          className={s.pageFormInput}
          name="format"
          placeholder="Movie format"
        >
          {formats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.value}
            </option>
          ))}
        </select>

        <div className={s.pageFormAddStar}>
          <button onClick={addStar} type="button">
            add star
          </button>
        </div>

        {stars.map((el, idx) => (
          <input
            key={el.id}
            required
            className={s.pageFormInput}
            type="text"
            name={`star${idx}`}
            onChange={(e) => handleActorsChange(e)}
            placeholder="Movie star"
          />
        ))}

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
