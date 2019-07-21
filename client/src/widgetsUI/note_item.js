import React from "react";
import { Link } from "react-router-dom";

const NoteItem = props => {
  return (
    <Link to={`/notes/${props._id}`} className="note_item">
      <div className="note_header">
        <h2>{props.title}</h2>
      </div>
    </Link>
  );
};

export default NoteItem;
