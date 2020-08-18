import React, { useState } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "components/core/movie-card";
import { Popup } from "components/core/popup";
import { Link } from "react-router-dom";
import s from "./styles.module.scss";

const MoviesPage = ({
  pages,
  paginatedData,
  pageNum,
  setPageNum,
  onSearch,
  onSort,
  onDelete,
}) => {
  const [value, setValue] = useState("");
  const [popup, setPopup] = useState(false);
  const [movie, setMovie] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  const togglePopup = (e, el) => {
    e.preventDefault();
    setMovie(el);
    setPopup((prev) => !prev);
  };

  const handleDelete = (id) => {
    onDelete(id);
    setPopup((prev) => !prev);
  };

  return (
    <div className={s.page}>
      <Popup visible={popup}>
        <div className={s.pagePopup}>
          <p className={s.pagePopupTitle}>
            Are you sure you want to remove `{movie && movie.title}` ?
          </p>
          <div className={s.pagePopupFooter}>
            <button
              type="button"
              onClick={togglePopup}
              className={s.pagePopupCancelBtn}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDelete(movie._id)}
              className={s.pagePopupRemoveBtn}
            >
              Remove
            </button>
          </div>
        </div>
      </Popup>

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

      {paginatedData.length ? (
        <>
          {paginatedData.map((el) => (
            <Link className={s.pageCard} key={el._id} to={`movies/${el._id}`}>
              <MovieCard card={el} onToggle={(e) => togglePopup(e, el)} />
            </Link>
          ))}
          <div className={s.pagePagination}>
            {pages.map((el) => (
              <button
                className={
                  Number(el) === Number(pageNum) && s.pagePaginationItemActive
                }
                onClick={(e) => setPageNum(e.target.id)}
                key={el}
                id={el}
                type="button"
              >
                {el}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className={s.pageNotFound}> Sorry, nothing was found!</p>
      )}
    </div>
  );
};

MoviesPage.propTypes = {
  // data: PropTypes.arrayOf(MovieCard.propTypes.card).isRequired,
  paginatedData: PropTypes.arrayOf(MovieCard.propTypes.card).isRequired,
  onSearch: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  setPageNum: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageNum: PropTypes.number.isRequired,
};

export default MoviesPage;
