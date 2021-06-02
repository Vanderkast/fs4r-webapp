import React from 'react'
import { connect } from 'react-redux'

import { doMove } from '../state/actions'

import '../util/css/copy.css'
import '../util/css/button.css'

function Copy(props) {
  const { route, file, doCopy } = props
  return (
    <button className='gg-copy' onClick={() => doCopy({ route: route, file: file })} />
  )
}

const mapStateProps = state => ({
  route: state.explorer.route
})

const mapDispatchProps = dispatch => ({
  doCopy: doMove(dispatch)
})

export default connect(mapStateProps, mapDispatchProps)(Copy)