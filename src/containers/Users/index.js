import React, { Component } from "react";
import { Row, Col, Button, Table, Pagination, Modal } from "antd";
import { withRouter } from "react-router-dom";
import CardComponent from "../../components/CardComponent/CardComponent";
import ValidationErrorComponent from "../../components/ValidationErrorComponent/ValidationErrorComponent";
import TextInput from "../../components/InputComponent/TextInput";
import PasswordInput from "../../components/InputComponent/PasswordInput";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined
} from "@ant-design/icons";
import { ValidateInput } from "../Register/ValidateRegister";
import OpenNotification from "../../components/OpenNotification";
class Peoples extends Component {
  state = {
    offset: 5,
    current: 1,
    users: [],
    user_name: "",
    password: "",
    phone: "",
    email: "",
    edit_id:null,
    visible: false,

    errors: null,
    loading: false
  };
  componentDidMount() {
    this.GetUsersData();
  }

  GetUsersData = e => {
    let users = JSON.parse(localStorage.getItem("AF-ALL-USERS"));
    this.setState({ users });
  };

  editUser = user => {
    this.setState({
      visible: true,
      user_name: user.user_name,
      password: user.password,
      phone: user.phone,
      email: user.email
    });
  };
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
      // password: this.state.password,
      email: this.state.email,
      phone: this.state.phone
    };

    const errors = ValidateInput(data);
    if (!errors.isValid) {
      this.setState({ errors: errors.errors, adding: false });
    } else {
      this.setState(state => {
        let users = this.state.users;

        let user = users.find(d => d._id == this.state.edit_id);
      });
    }
  };
  hideModal = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    let { errors, user_name, password, phone, email, users } = this.state;

    return (
      <div className="site-card-border-less-wrapper">
      
        <Row>
          {users.map((user, index) => {
            return (
              <CardComponent editUser={this.editUser} {...this.props} {...user}>
                <div className="card-inner">
                  <h1>{user.user_name}</h1>
                </div>
              </CardComponent>
            );

            // return (
            //   <CardComponent
            //      key={index}
            //      metaData={data}
            //     {...this.props}
            //     id={index + 1}
            //     detailLBL="people"
            //     {...people}
            //   />
            // );
          })}
        </Row>

        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="Update"
          cancelText="Cancel"
        >
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
        </Modal>
      </div>
    );
  }
}

export default withRouter(Peoples);
