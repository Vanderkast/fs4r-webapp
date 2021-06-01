import React from "react";
import { connect } from "react-redux";
import { Container } from "shards-react";
import FileView from "./FileView";
import UploadFile from './Upload'

import { walk } from "../util/api";

import "../util/css/progressLine.css";
import "./Content.css";

class DirContent extends React.Component {
  loadedPath;

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: null,
      content: null,
    };
  }

  render() {
    const { loaded, error, content } = this.state;

    if (!loaded || this.props.refresh) return <div className="progress-line"></div>;
    if (error) return <p className="error">{error}</p>;
    return (
      <Container>
        {content.map((file) => (
          <FileView
            name={file.name}
            dir={file.dir}
            size={file.size}
            created={file.created}
            modified={file.lastTimeModified}
            route={this.props.route}
          />
        ))}
        <UploadFile />
      </Container>
    );
  }

  componentDidMount() {
    this.walkDir();
  }

  componentDidUpdate() {
    if (this.props.route !== this.loadedPath) {
      this.walkDir();
      this.setState({
        loaded: false,
      });
    }
  }

  walkDir() {
    const route = this.props.route;
    this.loadedPath = route;
    walk(
      route,
      (content) =>
        this.setState({
          loaded: true,
          error: null,
          content,
        }),
      (error) =>
        this.setState({
          loaded: true,
          error: error,
          content: null,
        })
    );
  }
}

const mapStateProps = state => ({ route: state.explorer.route});

export default connect(mapStateProps)(DirContent);
