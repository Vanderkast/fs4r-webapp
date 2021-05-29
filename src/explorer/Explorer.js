import React from "react";
import "./Explorer.css";
import "../util/ProgressBar.css";
import Logout from "../login/Logout";
import Content from "./FileView";
import * as Api from "../Api";
import { Breadcrumb, BreadcrumbItem, Container, Row, Col } from "shards-react";

class Explorer extends React.Component {
  route = window.location.pathname.split("/");

  constructor(props) {
    super(props);
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

function Navigator(props) {
  const route = props.route ? props.route.slice(1) : [];
  if (route.length === 1 && route[0] === "")
    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Root</a>
        </BreadcrumbItem>
      </Breadcrumb>
    );
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <a href="/">Root</a>
      </BreadcrumbItem>
      {route.map((path, i) => (
        <BreadcrumbItem>
          <a href={"/" + route.slice(0, i + 1).join("/")}>{path}</a>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default Explorer;
