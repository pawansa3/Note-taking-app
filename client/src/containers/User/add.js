import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addNote, clearNewNote } from "../../actions";

class AddNote extends Component {
  state = {
    formdata: {
      title: "",
      body: ""
    }
  };

  handleInput = (e, name) => {
    const newFormdata = { ...this.state.formdata };
    newFormdata[name] = e.target.value;
    this.setState({ formdata: newFormdata });
  };

  showNewNote = note =>
    note.post ? (
      <div className="conf_link">
        Cool !!!{" "}
        <Link to={`/notes/${note.noteId}`}>
          Click the link to see the note.
        </Link>
      </div>
    ) : null;

  submitForm = e => {
    e.preventDefault();
    // console.log(this.state.formdata);
    this.props.dispatch(
      addNote({
        ...this.state.formdata,
        userId: this.props.user.login.id
      })
    );
  };

  componentWillUnmount() {
    this.props.dispatch(clearNewNote());
  }

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Add a Note</h2>

          <div className="form_element">
            <input
              type="text"
              value={this.state.formdata.title}
              onChange={e => this.handleInput(e, "title")}
              placeholder="Enter title"
            />
          </div>

          <div className="form_element">
            <textarea
              value={this.state.formdata.body}
              onChange={e => this.handleInput(e, "body")}
              placeholder="Enter body"
            />
          </div>

          <button type="submit">Add Note</button>

          {this.props.notes.newnote
            ? this.showNewNote(this.props.notes.newnote)
            : null}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    notes: state.notes
  };
}

export default connect(mapStateToProps)(AddNote);
