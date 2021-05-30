import React from 'react'
import { connect } from 'react-redux'
import Navigator from './Navigator'
import Content from './Content'
import { MODE_EXPLORE, MODE_READ } from '../state/explorerModes'

function ExplorerScreen({ route, mode }) {
    return (
        <div>
            <Navigator route={route} />
            {content(route, mode)}
        </div>
    )
}

function content(route, mode) {
    if (mode === MODE_EXPLORE)
        return <Content route={route}/>
    if (mode === MODE_READ)
        <h>READ</h>
    return <h>UNSUPPORTED EXPLORER MODE!!!</h>
}

const mapExplorerStateProps = state => {
    return {
        route: state.explorer.route,
        mode: state.explorer.mode
    };
}

export default connect(mapExplorerStateProps)(ExplorerScreen)