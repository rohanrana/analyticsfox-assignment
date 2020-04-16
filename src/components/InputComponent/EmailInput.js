import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import Label from "reactstrap/es/Label";

const EmailInput = props => {
  return (
    <Input
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      name={props.name}
      value={props.value}
    />
  );
};

EmailInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default EmailInput;
