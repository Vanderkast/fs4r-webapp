import axios from "axios";
import { deleteCreds } from "./login/Logout";

const base_url = "http://localhost:8080/api";

const Api = axios.create({
  baseURL: base_url,
});

export async function walk(route, onDone, onError) {
  await Api.get("/v1/main/walk" + route.join("/"), {
    responseType: "json",
    crossdomain: true,
    headers: {
      Authorization: "Basic " + window.localStorage.getItem("creds"),
    },
  })
    .then((response) => {
      if (response.status === 200) onDone(response.data);
    })
    .catch((response) => {
      if (response.message.includes("401")) deleteCreds();
      onError(response.message);
    });
}

export function downloadFile(route, file) {
  return base_url + "/v1/main/download" + fileEndpoint(route, file);
}

function fileEndpoint(route, file) {
  let _route = route.join("/");
  return (_route.endsWith("/") ? _route : _route + "/") + file;
}

export async function read(route, filename, onDone, onError) {
  await Api.get("v1/main/load" + fileEndpoint(route, filename), {
    responseType: "text/plain",
    crossdomain: true,
    headers: {
      Authorization: "Basic " + window.localStorage.getItem("creds"),
    },
  }).then(response => {
    if (response.status === 200) onDone(response.data);
  }).catch(error => {
    if (error.message.includes("401")) deleteCreds();
    onError(error.message);
  })
}

export default Api;
