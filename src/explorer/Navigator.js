import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "shards-react";
import { doUpdateRoute } from "../state/actions";

import "../util/css/button.css";

function Navigator(props) {
  const { route, refresh } = props;
  if (route.length === 1 && route[0] === "")
    return <Breadcrumb>{root(refresh)}</Breadcrumb>;
  return (
    <Breadcrumb>
      {root(refresh)}
      {route.map((path, i) => (
        <BreadcrumbItem>
          <button onClick={() => refresh(route.slice(0, i + 1))}>
            {path}
          </button>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

const root = (updateRoute) => (
  <BreadcrumbItem>
    <button onClick={() => updateRoute([])}>Root</button>
  </BreadcrumbItem>
);

const mapDispatch = (dispatch) => ({
  refresh: doUpdateRoute(dispatch)
});

export default connect(null, mapDispatch)(Navigator);
