import isEmpty from "lodash/isEmpty";
import validator from "validator";
export function ValidateInput(data) {
  let errors = {};

  if (data.user_name !== undefined && validator.isEmpty(data.user_name)) {
    errors.user_name = "Username is required";
  }

    // if (data.user_name !== undefined && validator.isEmpty(data.user_name)===false) {
    //   if (!validator.matches(data.user_name, /^[a-zA-Z ]*$/)) {
    //     errors.user_name = "Only Alphabets Allowed";
    //   }
    // }

  if (data.password !== undefined && validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (data.password !== undefined && !validator.isEmpty(data.password)) {
    // if (
    //   data.password !== undefined &&
    //   validator.matches(data.password, regx) === false
    // ) {
    //   errors.password = ;
    // }
    if (
      data.password !== undefined &&
      validator.isLength(data.password, { min: 6 }) === false
    ) {
      errors.password =  "Passowrd should be minimum of 6 charcter";
    }
  }
  return { errors, isValid: isEmpty(errors) };
}
