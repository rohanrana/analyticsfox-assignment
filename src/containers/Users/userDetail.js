import React, { Component } from "react";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import TextInput from "../../components/InputComponent/TextInput";
import PasswordInput from "../../components/InputComponent/PasswordInput";
import { ValidateInput } from "./ValidateRegister";
import ValidationErrorComponent from "../../components/ValidationErrorComponent/ValidationErrorComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userSignIn } from "../../redux/actions";
import { uniqueId } from "lodash";
import OpenNotification from "../../components/OpenNotification";
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      phone: "",
      email: "",
      password: "",
      errors: ""
    };
  }

  componentDidMount() {

    let users = JSON.parse(localStorage.getItem("AF-ALL-USERS"));
    let edit_id = this.props.match.params.id;
    let found_user = users.find(d => d._id === edit_id);
    this.setState({
      user_name: found_user.user_name,
      phone: found_user.phone,
      email: found_user.email,
      password: found_user.password
    });
  }
  handleChange = e => {
    let errors = null;
    let name = e.target.name;
    let value = e.target.value;
    if (this.state.errors) {
      errors = Object.assign("", this.state.errors);
      delete errors[e.target.name];
    }

    this.setState({ [e.target.name]: e.target.value, errors: errors }, () => {
      if (this.state[name] !== "") {
        let data = {
          [name]: value
        };
        const errors = ValidateInput(data);
        if (!errors.isValid) {
          this.setState({ errors: errors.errors });
        }
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    let data = {
      user_name: this.state.user_name,
    //   password: this.state.password,
      email: this.state.email,
      phone: this.state.phone
    };

    const errors = ValidateInput(data);
    if (!errors.isValid) {
      this.setState({ errors: errors.errors, adding: false });
    } else {
      let edit_id = this.props.match.params.id;

      let users = JSON.parse(localStorage.getItem("AF-ALL-USERS"));
      let foundUser = users.find(
        d => d._id===edit_id
      );

      let exceptUsers = users.filter(d => d._id !== edit_id);

      let validateUser = exceptUsers.find(
        d => d.user_name === data.user_name || d.email === data.email
      );

      // if(foundUser._id===edit_id && foundUser.user_name)

      if (
        validateUser &&
        (validateUser.user_name === data.user_name ||
          validateUser.email === data.email)
      ) {
        OpenNotification({
          type: "error",
          title: "Email or Username already used"
        });
      } else {
        if (foundUser) {
          foundUser.user_name = data.user_name;
        //   foundUser.password = data.password;
          foundUser.email = data.email;
          foundUser.phone = data.phone;

          localStorage.setItem("AF-ALL-USERS", JSON.stringify(users));
          OpenNotification({
            type: "success",
            title: "User Detail Updated"
          });
          this.props.history.push("/")
        }
      }

      console.log("EDITED USER", users);
      //   if (users) {
      //     let foundUser = users.find(
      //       d => d.user_name === data.user_name || d.email === data.email
      //     );
      //     if (foundUser) {
      //       OpenNotification({
      //         title: "Email or Username is already used",
      //         type: "error"
      //       });
      //     } else {
      //       let payload = {
      //         _id: uniqueId("AF_"),
      //         user_name: this.state.user_name,
      //         password: this.state.password,
      //         email: this.state.email,
      //         phone: this.state.phone
      //       };
      //       users.push(payload);
      //       // this.setState({user})
      //       localStorage.setItem("AF-ALL-USERS", JSON.stringify(users));
      //       this.props.history.push("/login");
      //     }
      //   } else {
      //     let payload1 = {
      //       _id: uniqueId("AF_"),

      //       user_name: this.state.user_name,
      //       password: this.state.password,
      //       email: this.state.email,
      //       phone: this.state.phone
      //     };
      //     let user = [payload1];
      //     console.log("USER INSER", payload1);
      //     localStorage.setItem("AF-ALL-USERS", JSON.stringify(user));
      //     this.props.history.push("/login");
      //   }
    }
  };
  render() {
    let { errors, user_name, password, phone, email } = this.state;
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="login-wrapper">
          <div>
            {/* --- INPUTS USED HERE ARE REUSABLE COMPONENT--- */}
            <TextInput
              placeholder="Username"
              name={"user_name"}
              value={user_name}
              className="lgn-input-field"
              prefix={<UserOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.user_name}
                className="validation-error"
              />
            )}
            <TextInput
              placeholder="Phone"
              name={"phone"}
              value={phone}
              className="lgn-input-field"
              prefix={<PhoneOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.phone}
                className="validation-error"
              />
            )}
            <TextInput
              placeholder="Email"
              name={"email"}
              value={email}
              className="lgn-input-field"
              prefix={<MailOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.email}
                className="validation-error"
              />
            )}
            {/* <PasswordInput
              className="lgn-input-field"
              size="large"
              name={"password"}
              value={password}
              prefix={<LockOutlined />}
              placeholder="Password"
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.password}
                className="validation-error"
              />
            )} */}
          </div>
          <div className="login-btn-wrapper">
            <button
              //   style={{ background: "white", color: "black" }}
              className="btn-login"
              onClick={this.handleSubmit}
            >
              UPDATE
            </button>
            <span className="register-link">
              <Link to="/">Go Back</Link>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default (withRouter(UserDetail));
