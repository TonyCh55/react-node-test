import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./styles.module.scss";

export const MovieCard = ({ card, className, onToggle }) => {
  return (
    <div className={cx(s.card, className)}>
      <img
        className={s.cardImg}
        src="https://miro.medium.com/max/3840/1*jfR0trcAPT3udktrFkOebA.jpeg"
        alt="movie"
      />
      <div className={s.cardContent}>
        <p className={s.cardContentItem}>
          <span>Title</span> {card.title}
        </p>
        <p className={s.cardContentItem}>
          <span>Year</span> {card.year}
        </p>
        <p className={s.cardContentItem}>
          <span>Format</span> {card.format}
        </p>
        <p className={s.cardContentItem}>{card.stars}</p>

        <button onClick={onToggle} type="button" className={s.cardRemoveBtn}>
          Remove
        </button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string,
    format: PropTypes.string.isRequired,
    stars: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
};

MovieCard.defaultProps = {
  className: null,
};
