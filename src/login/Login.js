import React from "react";
import "./Login.css";
import { Button, Form, FormGroup, FormInput, func } from "shards-react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  render() {
    const { username, password } = this.state;
    return (
      <div id="login-form">
        <Form>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <StateFormInput
              data={username}
              id="#username"
              placeHolder="Vanderkast"
            ></StateFormInput>
          </FormGroup>
          <FormGroup>
            <label htmlFor="#password">Password</label>
            <StateFormInput
              data={password}
              type="password"
              id="#password"
              placeHolder="TopSecret"
            />
          </FormGroup>
        </Form>
        <div id="join-button">
          <Button theme="success" onClick={() => this.login()}>
            Join
          </Button>
        </div>
      </div>
    );
  }

  async login() {
    let username = document.getElementById("#username").value;
    let password = document.getElementById("#password").value;
    this.setState({
      username: username ? username : " ",
      password: password ? password : " ",
    });
    if (isValid(username) && isValid(password)) {
      window.localStorage.setItem("creds", btoa(username + ":" + password));
      window.open(window.location.href, "_self");
    }
  }
}

function StateFormInput(props) {
  if (!props.data)
    return <FormInput id={props.id} placeHolder={props.placeHolder} />;
  if (props.data === " ")
    return <FormInput invalid id={props.id} placeHolder={props.placeHolder} />;
  return <FormInput valid id={props.id} placeHolder={props.placeHolder} />;
}

function isValid(data) {
  return data && data !== " ";
}
