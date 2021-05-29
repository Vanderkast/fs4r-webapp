import React from "react";
import Explorer from "./explorer/Explorer";
import Login from "./login/Login";

class App extends React.Component {

  render() {
    const creds = window.localStorage.getItem("creds");
    if (creds)
      return (
        <div>
          <Explorer />
        </div>
      );
    else
      return (
        <div>
          <Login />
        </div>
      );
  }
}

export default App;
