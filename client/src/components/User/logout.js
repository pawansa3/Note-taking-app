import React from "react";
import axios from "axios";

const Logout = props => {
  axios.get("/api/logout").then(response => {
    setTimeout(() => {
      props.history.push("/login");
    }, 1000);
  });

  return (
    <div className="logout_container">
      <h1>Logged out successfully!</h1>
    </div>
  );
};

export default Logout;
