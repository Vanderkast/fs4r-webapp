import React from "react";
import "./Explorer.css";

const serverUrl = "http://localhost:8080";
const walkUrl = serverUrl + "/api/v1/main/walk";
const downloadUrl = serverUrl + "/api/v1/main/download";

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      loaded: false,
      content: [],
    };
  }

  render() {
    const { err, loaded, content } = this.state;
    if (err)
      return (
        <div className="Explorer">
          <p>err</p>
        </div>
      );
    else if (!loaded)
      return (
        <div className="Explorer">
          <p>Fetching folder content...</p>
          <Loader />
        </div>
      );
    return (
      <ul>
        {content.map((item) => (
          <Path key={item.id} name={item.name} dir={item.dir} />
        ))}
      </ul>
    );
  }

  componentDidMount() {
    fetch(walkUrl + window.location.pathname)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            content: result,
          });
        },
        (error) => {
          this.setState({
            loaded: true,
            err: error,
          });
        }
      );
  }
}

function Path(props) {
  if (props.dir)
    return (
      <li className="Path" key={props.key}>
        <Dir name={props.name} />
      </li>
    );
  return (
    <li className="Path" key={props.key}>
      <File name={props.name} />
    </li>
  );
}

function File(props) {
  return (
    <div title="download file">
      <a
        name={props.name}
        href={downloadUrl + window.location.pathname + '/' + props.name}
      >
        {props.name}
      </a>
    </div>
  );
}

function Dir(props) {
  return (
    <div>
      <a
        name={">>" + props.name}
        href={
          window.location.href.endsWith("/")
            ? window.location.href + props.name
            : window.location.href + "/" + props.name
        }
      >
        {">>" + props.name}
      </a>
    </div>
  );
}

class Loader extends React.Component {
  render() {
    return <div className="Loader"></div>;
  }
}

export default Explorer;
