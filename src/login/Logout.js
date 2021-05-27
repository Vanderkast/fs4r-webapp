import "./Logout.css";
import { Button } from "shards-react";

export default function Logout() {
  return (
    <Button outline theme="light" id="logout-button" onClick={() => logout()}>
      Logout
    </Button>
  );
}

export function logout() {
  console.log("logout");
  window.localStorage.removeItem("creds");
  window.open(window.location.href, "_self");
}
