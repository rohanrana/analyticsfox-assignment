import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import Label from "reactstrap/es/Label";

const NumberInput = props => {
  return (
    <div className="input-form-label">
      <Input
        type="number"
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        name={props.name}

        value={props.value}
      />
      <Label>{props.title}</Label>
    </div>
  );
};

NumberInput.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

};
export default NumberInput;
