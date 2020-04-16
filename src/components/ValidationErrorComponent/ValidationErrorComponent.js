import React from "react";
import PropTypes from "prop-types";

const ValidationErrorComponent = props => {
  return <span className={props.className}>{props.message}</span>;
};

ValidationErrorComponent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired
};
export default ValidationErrorComponent;
