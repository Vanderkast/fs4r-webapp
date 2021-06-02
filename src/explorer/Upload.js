import React from 'react'
import { Row, Col } from 'shards-react'
import { connect } from 'react-redux'

import { ACTION_UPDATE_ROUTE } from '../state/actions'
import { upload } from '../util/api'

import './directoryContent.css'
import '../util/css/upload.css'
import '../util/css/button.css'
import '../util/css/progressLine.css'

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: false,
    }
    this.onFilePicked = this.onFilePicked.bind(this)
    this.submit = this.submit.bind(this)
  }

  onFilePicked(event) {
    this.setState({
      file: event.target.files[0]
    })
  }

  submit() {
    this.setState({
      file: this.state.file,
      loading: true,
    })
    upload(
      this.props.route,
      this.state.file,
      document.getElementById('replace').checked,
      _ => this.props.updateRoute(this.props.route),
      error => alert(error))
      .then(_ => this.setState({
        file: this.state.file,
        loading: false,
      }))
  }

  render() {
    if (this.state.loading)
      return (<Row><Col><div className='progress-line' /></Col></Row>)
    return (
      <Row className='directory-content'>
        <Col > Upload file</Col >
        <Col><input type='file' name='file' onChange={this.onFilePicked} /></Col>
        <Col><input id='replace' type="checkbox" /> replace if exists</Col>
        <Col>
          {
            this.state.file
              ? <button className='gg-software-upload' onClick={this.submit}></button>
              : <p></p>
          }
        </Col>
      </Row >
    )
  }
}

const mapStateProps = state => ({ route: state.explorer.route })
const mapDispatchProps = (dispatch) => ({
  updateRoute: (route) =>
    dispatch({
      type: ACTION_UPDATE_ROUTE,
      route: route,
    })
});

export default connect(mapStateProps, mapDispatchProps)(UploadFile);