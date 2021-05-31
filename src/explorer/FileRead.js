import React from "react";

import { read } from "../util/api";

import "./Content.css";
import "../util/css/progressLine.css";
import "./FileRead.css";

export class FileRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: null,
      text: null,
    };
  }

  render() {
    const { error, loaded, text } = this.state;
    if (error) return <h5 className="error">{error}</h5>;
    if (!loaded) return <div className="progress-line"></div>;
    return <div id="filetext">{text}</div>;
  }

  componentDidMount() {
    read(
      this.props.route,
      (response) =>
        this.setState({
          loaded: true,
          error: null,
          text: textOf(response),
        }),
      (error) =>
        this.setState({
          loaded: true,
          error: error,
          text: null,
        })
    );
  }
}

function textOf(text) {
  try {
    if (typeof text === "object" && text !== null)
      return `${JSON.stringify(
        text,
        null,
        2
      )}`;
  } catch (_) {}
  return text;
}
