import axios from "axios";
import {logout} from "./login/Logout";

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
      if (response.message.includes("401")) logout();
      onError(response.message);
    });
}

export function downloadFile(route, file) {
  const base = base_url + "/v1/main/download" + route.join("/");
  return (base.endsWith("/") ? base : base + "/") + file;
}

export default Api;
