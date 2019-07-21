export default function(state = {}, action) {
  switch (action.type) {
    case "GET_NOTES":
      return { ...state, list: action.payload };
    case "GET_A_NOTE":
      return { ...state, note: action.payload };
    case "CLEAR_A_NOTE":
      return { ...state, note: action.payload };
    case "ADD_NOTE":
      return { ...state, newnote: action.payload };
    case "CLEAR_NEWNOTE":
      return { ...state, newnote: action.payload };
    case "UPDATE_NOTE":
      return {
        ...state,
        updateNote: action.payload.success,
        note: action.payload.doc
      };
    case "DELETE_NOTE":
      return { ...state, noteDeleted: action.payload };
    case "CLEAR_DEL_NOTE":
      return {
        ...state,
        updateNote: action.payload.updateNote,
        noteDeleted: action.payload.noteDeleted
      };
    default:
      return state;
  }
}
