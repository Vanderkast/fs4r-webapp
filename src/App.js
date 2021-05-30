import React from 'react'
import { connect } from 'react-redux';
import Login from './auth/Login'
import Logout from './auth/Logout';
import Explorer from './explorer2/Explorer';

function App({ logged }) {
  if(!logged)
    return  <Login />;
  return (
    <div>
      <Explorer />
      <Logout />
    </div>
  )
}

export default connect(state => ({ logged: state.login }))(App)