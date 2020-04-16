import React, { Component } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import TextInput from "../../components/InputComponent/TextInput";
import PasswordInput from "../../components/InputComponent/PasswordInput";
import { ValidateInput } from "./ValidateLogin";
import ValidationErrorComponent from "../../components/ValidationErrorComponent/ValidationErrorComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userSignIn } from "../../redux/actions";
import   { uniqueId}  from "lodash"
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: "",
      errors: ""
    };
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
      password: this.state.password
    };

    const errors = ValidateInput(data);
    // debugger;
    // let date = moment(this.state.due_date).format()
    if (!errors.isValid) {
      this.setState({ errors: errors.errors, adding: false });
    } else {
      // this.setState({ user_name: "", password: "" }, () => {
        let payload = {
            // user_id:uniqueId("AF"),
            user_name: this.state.user_name,
            password: this.state.password
          };
        this.props.onSignIn(payload, this.props);
      // });
    }
  };
  render() {
    let { errors, user_name, password } = this.state;
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
            <PasswordInput
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
            )}
          </div>
          <div className="login-btn-wrapper">
            <button
              //   style={{ background: "white", color: "black" }}
              className="btn-login"
              onClick={this.handleSubmit}
            >
              Login
            </button>
            <span className="register-link">
              <Link to="/register">Click Here </Link> To Register
            </span>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (data, props) => dispatch(userSignIn(data, props))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
