import axios from "axios";
import { func } from "shards-react";

const base_url = "http://localhost:8080/api";

const Api = axios.create({
  baseURL: base_url,
});

export async function walk(route, onDone, onError) {
  await Api.get("/v1/main/walk" + route.join("/"), {
    responseType: "json",
    crossdomain: true,
    auth: {
      username: "reader",
      password: "123",
    },
  }).then((response) => {
    switch (response.status) {
      case 200:
        onDone(response.data);
        break;
      default:
        onError(response.status);
    }
  });
}

export function downloadFile(route, file) {
  const base = base_url + "/v1/main/download" + route.join("/");
  return (base.endsWith('/')? base : base + '/') + file;
}

export default Api;
