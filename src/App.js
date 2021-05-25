import React from "react";
import Explorer from "./explorer/Explorer";

class App extends React.Component {
  constructor(props) {
    super(props);
    const creds = window.localStorage.getItem('creds');
  }

  render() {
    return (
      <div>
        <Explorer />
      </div>
    );
  }
}

export default App;
