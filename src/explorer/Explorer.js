import React from "react";
import "./Explorer.css";
import "../util/ProgressBar.css";
import Logout from "../login/Logout"
import Content from "./FileView"
import * as Api from "../Api"
import Navigator from './Navigator'
import { connect } from "react-redux";

class ExplorerView extends React.Component {
  route;
  
  constructor(props) {
    super(props);
    this.route = props.route;
    this.state = {
      loaded: false,
      content: [],
      error: null,
    };
  }

  render() {
    const { loaded, content, error } = this.state;
    if (error)
      return (
        <div>
          <Navigator />
          <h>{error}</h>
          <Logout />
        </div>
      );
    if (!loaded)
      return (
        <div>
          <Navigator route={this.route} />
          <div className="progress-line" />
        </div>
      );
    return (
      <div>
        <Navigator route={this.route} />
        <Content route={this.route} content={content}></Content>
        <Logout />
      </div>
    );
  }

  async componentDidMount() {
    Api.walk(
      this.route,
      (content) =>
        this.setState({ loaded: true, content: content, error: null }),
      (error) =>
        this.setState({
          loaded: true,
          content: [],
          error: "Error occurred during loading. Status code: " + error,
        })
    );
  }
}

const Explorer = connect(state => ({ route: state.route}), null)(ExplorerView)

export default Explorer;
