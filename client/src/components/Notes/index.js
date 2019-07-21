import React from "react";
import { connect } from "react-redux";
import { getANote, clearANote } from "../../actions";

class NoteView extends React.Component {
  componentWillMount() {
    this.props.dispatch(getANote(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearANote());
  }

  renderNote = note =>
    note.note ? (
      <div>
        <h2>{note.note.title}</h2>
        <p>{note.note.body}</p>
      </div>
    ) : null;

  render() {
    let note = this.props.notes;
    return <div>{this.renderNote(note)}</div>;
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes
  };
}

export default connect(mapStateToProps)(NoteView);
