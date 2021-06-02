import React from "react";
import "./Login.css";
import { Button, Form, FormGroup, FormInput } from "shards-react";
import { login } from '../util/auth'
import { connect } from "react-redux";

class Login extends React.Component {
  dispatchLogin;

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
    this.dispatchLogin = props.dispatchLogin
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
          <Button theme="success"
            onClick={() => this.login()}>
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
      login(username, password);
      this.dispatchLogin();
    }
  }
}

function StateFormInput(props) {
  if (!props.data)
    return <FormInput id={props.id} placeHolder={props.placeHolder} type={props.type} />;
  if (props.data === " ")
    return <FormInput invalid id={props.id} placeHolder={props.placeHolder} type={props.type} />;
  return <FormInput valid id={props.id} placeHolder={props.placeHolder} type={props.type} />;
}

function isValid(data) {
  return data && data !== " ";
}

const mapLoginProps = dispatch => ({ dispatchLogin: () => dispatch({ type: 'LOGIN' }) })

export default connect(null, mapLoginProps)(Login);