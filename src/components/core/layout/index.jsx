import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import s from "./styles.module.scss";

export const Layout = ({ children }) => {
  return (
    <div className={s.layout}>
      <nav className={s.layoutNav}>
        <NavLink to="/movies" activeClassName={s.activeLink}>
          Movies
        </NavLink>
        <NavLink to="/add" activeClassName={s.activeLink}>
          Add movie
        </NavLink>
      </nav>
      <div className={s.layoutMain}>
        <div className={s.layoutMainContainer}>{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
