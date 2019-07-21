import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserNotes } from "../../actions";
import moment from "moment-js";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

class UserNotes extends Component {
  componentWillMount() {
    this.props.dispatch(getUserNotes(this.props.user.login.id));
  }

  showUserNotes = user =>
    user.usernotes
      ? user.usernotes.map(item => (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td>{item.body}</td>
            <td>{moment(item.createdAt).format("MM/DD/YY at h:mm:ss")}</td>
            <td>
              <Link to={`/user/edit/${item._id}`} className="btn">
                <FontAwesome name="pencil" style={{ color: "#fff" }} />
              </Link>
            </td>
          </tr>
        ))
      : null;

  render() {
    // console.log(this.props.user);
    let user = this.props.user;
    return (
      <div className="user_notes">
        <h4>My Notes</h4>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.showUserNotes(user)}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(UserNotes);
