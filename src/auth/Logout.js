import "./Logout.css";
import { Button } from "shards-react";
import { logout } from "../util/auth";
import { connect } from "react-redux";

function Logout(props) {
  return (
    <footer>
      <Button
        outline
        theme="light"
        id="logout-button"
        onClick={() => props.onClick()}
      >
        Logout
      </Button>
    </footer>
  );
}

const mapLogoutProps = (dispatch) => ({
  onClick: () => {
    logout();
    dispatch({ type: "LOGOUT" });
  },
});

export default connect(null, mapLogoutProps)(Logout);
