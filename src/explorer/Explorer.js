import React from 'react'
import { connect } from 'react-redux'

import Navigator from './Navigator'
import Content from './Content'

import { MODE_EXPLORE, MODE_READ } from '../state/explorerModes'
import { FileRead } from './FileRead'

import './Explorer.css'


function ExplorerScreen({ route, mode }) {
    return (
        <div>
            <Navigator id='top-navigator' route={route} />
            {content(route, mode)}
        </div>
    )
}

function content(route, mode) {
    if (mode === MODE_EXPLORE)
        return <Content />
    if (mode === MODE_READ)
        return <FileRead />
    return <h>UNSUPPORTED EXPLORER MODE!!!</h>
}

const mapExplorerStateProps = state => {
    return {
        route: state.explorer.route,
        mode: state.explorer.mode
    };
}

export default connect(mapExplorerStateProps)(ExplorerScreen)