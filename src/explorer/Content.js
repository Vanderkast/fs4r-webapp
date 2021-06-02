import React from "react";
import { connect } from "react-redux";
import { Container } from "shards-react";
import Paste from "./Paste";
import FileView from "./FileView";
import UploadFile from './Upload'

import { walk } from "../util/api";

import "../util/css/progressLine.css";
import "./Content.css";

class DirContent extends React.Component {
  loadedPath;
  refresh;

  constructor(props) {
    super(props);
    this.refresh = props.refresh;
    this.state = {
      loaded: false,
      error: null,
      content: null,
    };
  }

  render() {
    const { loaded, error, content } = this.state;
    console.log('path', this.props.route)
    if (!loaded) return <div className="progress-line"></div>;
    if (error) return <p className="error">{error}</p>;
    return (
      <Container id='content-root'>
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
        <Paste />
      </Container>
    );
  }

  componentDidMount() {
    this.walkDir();
  }

  componentDidUpdate() {
    const version = this.props.refresh;
    if (this.props.route !== this.loadedPath || this.refresh !== version) {
      this.refresh = version;
      this.setState({
        loaded: false,
      });
      this.walkDir();
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
          content: content,
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

const mapStateProps = state => ({
  route: state.explorer.route,
  refresh: state.explorer.refresh
});

export default connect(mapStateProps)(DirContent);
