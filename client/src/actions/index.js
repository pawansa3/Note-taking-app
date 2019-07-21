import axios from "axios";

export function getNotes(limit = 10, start = 0, order = "asc", list = "") {
  const request = axios
    .get(`/api/notes?skip=${start}&limit=${limit}&order=${order}`)
    .then(response => {
      if (list) {
        return [...list, ...response.data];
      } else {
        return response.data;
      }
    });

  return {
    type: "GET_NOTES",
    payload: request
  };
}

// same as get a note or edit a note
export function getANote(id) {
  const request = axios
    .get(`/api/getNote?id=${id}`)
    .then(response => response.data);

  return {
    type: "GET_A_NOTE",
    payload: request
  };
}

export function clearANote() {
  return {
    type: "CLEAR_A_NOTE",
    payload: null
  };
}

// update a note
export function updateNote(data) {
  const request = axios
    .post(`/api/note_update`, data)
    .then(response => response.data);

  return {
    type: "UPDATE_NOTE",
    payload: request
  };
}

// clear del note
export function clearDelNote() {
  return {
    type: "CLEAR_DEL_NOTE",
    payload: {
      book: {},
      updateNote: false,
      noteDeleted: false
    }
  };
}

// delete a note
export function deleteNote(id) {
  const request = axios
    .delete(`/api/delete_note?id=${id}`)
    .then(response => response.data);

  return {
    type: "DELETE_NOTE",
    payload: request
  };
}

// add note
export function addNote(note) {
  const request = axios.post("/api/note", note).then(response => response.data);

  return {
    type: "ADD_NOTE",
    payload: request
  };
}

// clear new note

export function clearNewNote() {
  return {
    type: "CLEAR_NEWNOTE",
    payload: {}
  };
}

// get user notes
export function getUserNotes(userId) {
  const request = axios
    .get(`/api/user_notes?user=${userId}`)
    .then(response => response.data);

  return {
    type: "USER_NOTES",
    payload: request
  };
}

/* User */

export function loginUser({ email, password }) {
  const request = axios
    .post(`/api/login`, { email, password })
    .then(response => response.data);

  return {
    type: "USER_LOGIN",
    payload: request
  };
}

// auth check
export function auth() {
  const request = axios.get("/api/auth").then(response => response.data);

  return {
    type: "USER_AUTH",
    payload: request
  };
}

// user register
export function userRegister(data) {
  const request = axios
    .post(`/api/register`, data)
    .then(response => response.data);

  return {
    type: "USER_REGISTER",
    payload: request
  };
}
