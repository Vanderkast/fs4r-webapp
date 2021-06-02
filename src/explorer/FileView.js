import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "shards-react";
import { ACTION_APPEND_PATH } from "../state/actions";
import { MODE_EXPLORE, MODE_READ } from "../state/explorerModes";
import { download } from "../util/api";
import "datejs";

import DeleteFile from './DeleteFile'
import Copy from './Copy'

import "./FileView.css";
import "./directoryContent.css";
import "../util/css/download.css";
import "../util/css/button.css";
import "../util/css/folder.css";

export default function FileView(props) {
  const { name, dir, size, created, modified, route } = props;
  if (dir)
    return (
      <OpenableDir
        name={name}
        size={size}
        created={created}
        modified={modified}
        actions={dirActions(route, name)}
      />
    );
  return (
    <OpenableFile
      name={name}
      size={size}
      created={created}
      modified={modified}
      route={route}
      actions={fileActions(route, name)}
    />
  );
}

function File(props) {
  const { name, size, created, modified, actions } = props;
  return (
    <Row className="directory-content">
      <Col>
        <button onClick={() => props.open(name)}>{name}</button>
      </Col>
      {actions}
      <Col className="file-info">{pretty(size)}</Col>
      <Col className="file-info" title="created / modified">
        {new Date(created).toString("dd.MM.yy HH:mm")} /{" "}
        {new Date(modified).toString("dd.MM.yy HH:mm")}
      </Col>
    </Row>
  );
}

function fileActions(route, name) {
  return (
    <Col id='actions-container'>
      <button
        className='gg-software-download'
        onClick={() => download(route, name)}
      />
      <Copy file={name} />
      <DeleteFile file={name} />
    </Col>
  );
}

function dirActions(route, name) {
  return (
    <Col id='actions-container'>
      <p></p>
      <Copy file={name} />
      <DeleteFile />
    </Col>
  );
}

function pretty(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes > 1024) return Math.floor(bytes / 1024) + " KB";
  if (bytes > 1048576) return Math.floor(bytes / 1048576) + " MB";
  if (bytes > 1073741824) return Math.floor(bytes / 1073741824) + " GB";
}

const extentionPattern =
  "\\.txt$|\\.text$|\\.md$|\\.java$|\\css$|\\.js$|\\.json$";

const mapFileDispatchProps = (dispatch) => ({
  open: (name) => {
    if (name.match(extentionPattern))
      dispatch({
        type: ACTION_APPEND_PATH,
        mode: MODE_READ,
        path: name,
      });
    else alert("Target file has incompatible type and can't be opened.");
  },
});

const OpenableFile = connect(null, mapFileDispatchProps)(File);

const mapDirDispatchProps = (dispath) => ({
  open: (name) =>
    dispath({
      type: ACTION_APPEND_PATH,
      mode: MODE_EXPLORE,
      path: name,
    }),
});

const OpenableDir = connect(null, mapDirDispatchProps)(File);
