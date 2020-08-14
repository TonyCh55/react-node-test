import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import s from "./styles.module.scss";

export const Popup = ({ children, visible }) => (
  <div className={cx(s.modal, visible && s.modalVisible)}>
    <div className={s.modalInner}>{children}</div>
  </div>
);

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
};

Popup.defaultProps = {
  visible: false,
};
