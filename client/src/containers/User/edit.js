import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getANote, updateNote, clearDelNote, deleteNote } from "../../actions";

class EditNote extends PureComponent {
  state = {
    formdata: {
      _id: this.props.match.params.id,
      title: "",
      body: ""
    }
  };

  handleInput = (e, name) => {
    const newFormdata = { ...this.state.formdata };
    newFormdata[name] = e.target.value;
    this.setState({ formdata: newFormdata });
  };

  submitForm = e => {
    e.preventDefault();
    // console.log(this.state.formdata);
    this.props.dispatch(updateNote(this.state.formdata));
  };

  deleteThis = () => {
    this.props.dispatch(deleteNote(this.props.match.params.id));
  };

  redirectUser = () => {
    setTimeout(() => {
      this.props.history.push("/user/user-notes");
    }, 1000);
  };

  componentWillMount() {
    this.props.dispatch(getANote(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    let note = nextProps.notes.note;
    // console.log(note);
    this.setState({
      formdata: {
        _id: note._id,
        title: note.title,
        body: note.body
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearDelNote());
  }

  render() {
    // console.log(this.props);
    let notes = this.props.notes;
    return (
      <div className="rl_container article">
        {notes.updateNote ? (
          <div className="edit_confirm">
            Note Updated,{" "}
            <Link to={`/notes/${notes.note._id}`}>Click to see your Note!</Link>
          </div>
        ) : null}

        {notes.noteDeleted ? (
          <div className="red_tag">
            Note Deleted
            {this.redirectUser()}
          </div>
        ) : null}
        <form onSubmit={this.submitForm}>
          <h2>Edit Note</h2>

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

          <button type="submit" style={{ cursor: "pointer" }}>
            Update Note
          </button>
          <div className="delete_note">
            <div
              className="button"
              onClick={this.deleteThis}
              style={{ cursor: "pointer" }}
            >
              Delete Note
            </div>
          </div>
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

export default connect(mapStateToProps)(EditNote);
