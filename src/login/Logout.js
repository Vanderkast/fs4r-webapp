import "./Logout.css";
import { Button } from "shards-react";
import { connect } from 'react-redux'
import { logout } from '../state/actions'

function LogoutView({ onClick }) {
  return (
    <Button outline theme="light" id="logout-button"
      onClick={() => {
        deleteCreds();
        onClick();
      }}>
      Logout
    </Button>
  );
}

export function deleteCreds() {
  console.log("logout");
  window.localStorage.removeItem("creds");
}

const mapLogoutDispatch = dispath => ({
  onClick: () => dispath(logout)
})

const Logout = connect(null, mapLogoutDispatch)(LogoutView)

export default Logout;
