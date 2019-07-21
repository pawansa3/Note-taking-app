import React from "react";
import { connect } from "react-redux";
import { getNotes } from "../actions";

import NoteItem from "../widgetsUI/note_item";

class HomeContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(getNotes(2, 0, "desc"));
  }

  renderItems = notes =>
    notes.list
      ? notes.list.map(item => <NoteItem key={item._id} {...item} />)
      : null;

  loadmore = () => {
    let count = this.props.notes.list.length;
    this.props.dispatch(getNotes(2, count, "desc", this.props.notes.list));
  };

  render() {
    return (
      <div>
        <h1>All Notes</h1>
        {this.renderItems(this.props.notes)}
        <div className="loadmore" onClick={this.loadmore}>
          Load More
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes
  };
}

export default connect(mapStateToProps)(HomeContainer);
