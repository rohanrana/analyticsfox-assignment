import validator from "validator";
import isEmpty from "lodash/isEmpty";

export function ValidateInput(data) {
  let errors = {};


  console.log("Email",data)
  if (data.user_name !== undefined && validator.isEmpty(data.user_name)) {
    errors.user_name = "Username is required";
  }

  // if (
  //   data.user_name !== undefined &&
  //   validator.isEmpty(data.user_name) === false
  // ) {
  //   if (!validator.matches(data.user_name, /^[a-zA-Z ]*$/)) {
  //     errors.user_name = "Only Alphabets Are Allowed";
  //   }
  // }
  if (data.phone !== undefined && validator.isEmpty(data.phone)) {
    errors.phone = "Phone number is required";
  }
  if (data.phone !== undefined && !validator.isEmpty(data.phone)) {
    if (!validator.isNumeric(data.phone)) {
      errors.phone = "Enter valid phone no";
    }
    if (
      data.phone !== undefined &&
      validator.isNumeric(data.phone) &&
      validator.isLength(data.phone, { min: 10, max: 10 }) === false
    ) {
      errors.phone = "Phone no should be of 10 digit";
    }
  }
  if (data.email !== undefined && validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (data.email !== undefined && validator.isEmpty(data.email)===false) {
    if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }
  if (data.password !== undefined && validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (data.password !== undefined && !validator.isEmpty(data.password)) {
  
    if (
      data.password !== undefined &&
      validator.isLength(data.password, { min: 6 }) === false
    ) {
      errors.password = "Passowrd should be minimum of 6 charcter";
    }
  }
  return { errors, isValid: isEmpty(errors) };
}
