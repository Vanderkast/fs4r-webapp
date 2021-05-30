import React from "react";
import Explorer from "./explorer/Explorer";
import Login from "./login/Login";
import Modes from './state/modes'
import { connect } from 'react-redux'

function AppView({ mode }) {
  console.log(mode)
  return (
    <div>
      {mode === Modes.MODE_LOGIN && !window.localStorage.getItem('creds') ? <Login /> : <Explorer />}
    </div>
  )
};

const mapProps = state => ({
  mode: state.mode
})

const App = connect(mapProps, null)(AppView)

export default App
