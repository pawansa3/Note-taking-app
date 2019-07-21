import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/home";
import NoteView from "./components/Notes";
import Layout from "./hoc/layout";
import Login from "./containers/User/login";
import Register from "./containers/User/register";
import Auth from "./hoc/auth";
import User from "./components/User";
import AddNote from "./containers/User/add";
import EditNote from "./containers/User/edit";
import UserNotes from "./components/User/userNotes";
import Logout from "./components/User/logout";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, true)} />
        <Route path="/notes/:id" exact component={Auth(NoteView, true)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/logout" exact component={Auth(Logout, true)} />
        <Route path="/user" exact component={Auth(User, true)} />
        <Route path="/user/add" exact component={Auth(AddNote, true)} />
        <Route
          path="/user/user-notes"
          exact
          component={Auth(UserNotes, true)}
        />
        <Route path="/user/edit/:id" exact component={Auth(EditNote, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
