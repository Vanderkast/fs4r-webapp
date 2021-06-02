import React from 'react'
import { connect } from 'react-redux'

import { doUpdateRoute } from '../state/actions'
import { deleteFile } from '../util/api'

import '../util/css/delete.css'
import '../util/css/button.css'

class DeleteFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.doDelete = this.doDelete.bind(this);
  }

  render() {
    if (this.state.loading)
      return <button disabled className='gg-delete' />
    return <button className='gg-delete' onClick={() => this.doDelete()} />
  }

  doDelete() {
    const route = this.props.route;
    const file = this.props.file;
    this.setState({ loading: true });
    deleteFile(
      route, file,
      _ => this.props.refresh(route),
      err => alert(err));
  }
}

const mapStateProps = state => ({
  route: state.explorer.route
})

const mapDispatchProps = dispatch => ({
  refresh: doUpdateRoute(dispatch)
})

export default connect(mapStateProps, mapDispatchProps)(DeleteFile)