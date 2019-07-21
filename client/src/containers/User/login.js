import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    success: false
  };

  handleInputEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleInputPassword = event => {
    this.setState({ password: event.target.value });
  };

  submitForm = e => {
    e.preventDefault();
    // console.log(this.state);
    this.props.dispatch(loginUser(this.state));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.login.isAuth) {
      this.props.history.push("/user");
    }
  }

  render() {
    let user = this.props.user;
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Log in here</h2>
          <div className="error">
            {user.login ? <div>{user.login.message}</div> : null}
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
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Login);
