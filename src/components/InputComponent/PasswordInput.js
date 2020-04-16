import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import Label from "reactstrap/es/Label";

const PasswordInput = props => {
  return (
    <Input.Password
      size="large"
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
      name={props.name}
      onBlur={props.onBlur}
      value={props.value}
      className={props.className}
      prefix={props.prefix}
      onChange={props.handleChange}
    />
  );
};

PasswordInput.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default PasswordInput;
