import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormInput } from 'shards-react'

import { doUpdateRoute, doFlushMove } from '../state/actions'
import { move } from '../util/api'

import '../util/css/button.css'
import "./directoryContent.css";

class Paste extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.doCopy = this.doCopy.bind(this)
  }

  render() {
    const origin = this.props.origin;
    const loading = this.state.loading;
    console.log('paste', this.props)
    if (!origin)
      return <Row className='directory-content'><Col>No file chosen to move</Col></Row>
    return (
      <Row className='directory-content'>
        <Col>{origin.file}</Col>
        <Col><FormInput id='rename-input' placeholder="Rename to" /></Col>
        {
          loading
            ? <Col>Moving...</Col>
            : <Col><button onClick={() => this.doCopy()}>Copy here</button></Col>
        }
        {
          loading
            ? <Col>Actions disabled</Col>
            : <Col><button onClick={() => this.doCopy(false)}>Move here</button></Col>
        }
      </Row>
    )
  }

  doCopy(copy = true) {
    this.setState({
      loading: true
    })
    const { route, origin } = this.props;
    let rename = document.getElementById("rename-input").value;
    move({
      origin: this.props.origin,
      target: {
        route: route,
        file: rename ? rename : origin.file
      },
      copy: copy
    },
      _ => this.props.refresh(route),
      err => alert(err))
      .then(() => this.setState({
        loading: false
      }))
  }
}

const mapStateProps = state => ({
  origin: state.move.origin,
  route: state.explorer.route
})

const mapDispatchProps = dispatch => ({
  refresh: () => {
    doFlushMove()
    doUpdateRoute(dispatch)
  }
})

export default connect(mapStateProps, mapDispatchProps)(Paste)