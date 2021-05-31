import axios from "axios";

import { getCreds } from "./auth";

const base_url = "http://localhost:8080/api";

const api = axios.create({
  baseURL: base_url,
});

export async function walk(route, onDone, onError) {
  api
    .get("/v1/main/walk/" + route.join("/"), {
      responseType: "json",
      crossdomain: true,
      headers: {
        Authorization: "Basic " + getCreds(),
      },
    })
    .then((response) => onDone(response.data))
    .catch(pushError(onError));
}

function pushError(call) {
  return (error) => {
    if(!error.response)
      call('Undefined error occured!')
    else if (error.response.status === 401)
      call("Incorrect auth credentials! Logout and try again.");
    else if (error.response.status === 403)
      call("You are not allowed to open this directory :(");
    else call(error.response.data ? error.response.data : error.message);
  };
}

export function download(route, file) {
  window.open(
    base_url + "/v1/main/download" + fileEndpoint(route, file),
    "_blank"
  );
}

export async function read(route, onDone, onError) {
  api
    .get("/v1/main/load/" + route.join("/"), {
      responseType: "text/plain",
      crossdomain: true,
      headers: {
        Authorization: "Basic " + getCreds(),
      },
    })
    .then((response) => onDone(response.data))
    .catch(pushError(onError));
}

function fileEndpoint(route, file) {
  let _route = route.join("/");
  return (_route.endsWith("/") ? _route : _route + "/") + file;
}
