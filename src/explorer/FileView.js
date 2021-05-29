
import React from "react";
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from "shards-react";
import * as Api from "../Api";
import "./Explorer.css"

export default function Content(props) {
  var content = props.content;
  if (content.length === 0) return <h>Directory is empty!</h>;
  return (
    <Container >
      {content.map((file) =>
        file.dir ? (
          <Directory name={file.name} />
        ) : (
          <File name={file.name} route={props.route} />
        )
      )}
    </Container>
  );
}

class File extends React.Component {
  info;

  constructor(props) {
    super(props);
    this.info = {
      route: props.route,
      name: props.name,
      previewable: props.name.endsWith('.txt') && props.name.endsWith('text'),
      created: props.created,
      modified: props.modified
    };
    this.preview = this.preview.bind(this);
    this.state = {
      preview: false,
      text: null
    };
  }

  render() {
    const { preview, text } = this.state;
    const info = this.info;
    return (
      <Row className="directory-content">
        <Col id="file" >
          {info.name}
        </Col>
        <Col lg="1">
          <a
            href={Api.downloadFile(info.route, info.name)}
            className="gg-software-download"
          ></a>
        </Col>
        <Col lg="1">
          <a className="gg-eye" onClick={() => this.preview()}></a>
          <Modal open={preview} toggle={this.preview}>
            <ModalHeader>{info.name}</ModalHeader>
            <ModalBody>{text}</ModalBody>
          </Modal>
        </Col>
      </Row>
    );
  }

  preview() {
    Api.read(this.info.route, this.info.name,
      text => this.setState({ preview: !this.state.preview, text: text }),
      err => alert(err))
  }
}

function Directory(props) {
  return (
    <Row >
      <Col className="directory-content">
        <a href={ref(props.name)} title="directory">
          {props.name}
        </a>
      </Col>
    </Row>
  );
}

function ref(path) {
  if (window.location.pathname.endsWith("/"))
    return window.location.pathname + path;
  return window.location.pathname + "/" + path;
}