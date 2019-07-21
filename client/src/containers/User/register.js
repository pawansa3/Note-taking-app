import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userRegister } from "../../actions";

class Register extends PureComponent {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: ""
  };

  handleInputFirstname = event => {
    this.setState({
      firstname: event.target.value
    });
  };
  handleInputLastName = event => {
    this.setState({
      lastname: event.target.value
    });
  };
  handleInputEmail = event => {
    this.setState({
      email: event.target.value
    });
  };
  handleInputPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.register) {
      this.setState({ error: "Register Failed, Try again!" });
    } else {
      this.setState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      });
    }
  }

  submitForm = e => {
    e.preventDefault();
    this.setState({ error: "" });
    this.props.dispatch(userRegister(this.state));
  };

  render() {
    console.log(this.props);
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Register</h2>

          <div className="form_element">
            <input
              type="text"
              value={this.state.firstname}
              onChange={this.handleInputFirstname}
              placeholder="Enter your firstname"
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              value={this.state.lastname}
              onChange={this.handleInputLastName}
              placeholder="Enter your lastname"
            />
          </div>
          <div className="form_element">
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleInputEmail}
              placeholder="Enter your email"
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInputPassword}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Register</button>
          <div className="error">{this.state.error}</div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Register);
