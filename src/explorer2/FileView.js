import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'shards-react'
import { ACTION_APPEND_PATH } from '../state/actions';
import { MODE_EXPLORE, MODE_READ } from '../state/explorerModes';
import { download } from '../util/api';

import './FileView.css'
import './button.css'

export default function FileView(props) {
    const { name, dir, size, created, modified, route } = props;
    if (dir)
        return <OpenableDir name={name} />
    return <OpenableFile name={name} size={size} created={created} modified={modified} route={route} />
}

const formatter = new Intl.DateTimeFormat('ru-RU');

function File(props) {
    const { name, size, created, modified, route } = props;
    return (
        <Row className="directory-content">
            <Col>
                <button onClick={() => props.read(name)}>{name}</button>
            </Col>
            <Col>size: {size}b</Col>
            <Col title='created / modified'>
                {formatter.format(new Date(created))} / {formatter.format(new Date(modified))}
            </Col>
            <Col>
                <button className='gg-software-download' onClick={() => download(route, name)}/>
            </Col>
        </Row >
    )
}

const extentionPattern = '\.txt$|\.text$|\.md$|\.java$|\.css$|\.js';

const mapFileDispatchProps = dispatch => ({
    read: name => {
        if (name.match(extentionPattern))
            dispatch({
                type: ACTION_APPEND_PATH,
                mode: MODE_READ,
                path: name
            })
        else
            alert('Target file has incompatible type and can\'t be opened.')
    }
})

const OpenableFile = connect(null, mapFileDispatchProps)(File)

function Dir(props) {
    const name = props.name;
    return (
        <Row className="directory-content">
            <Col >
                <button onClick={() => props.open(name)}>
                    {name}
                </button>
            </Col>
        </Row>
    )
}

const mapDirDispatchProps = dispath => ({
    open: name => dispath({
        type: ACTION_APPEND_PATH,
        mode: MODE_EXPLORE,
        path: name
    })
})

const OpenableDir = connect(null, mapDirDispatchProps)(Dir)
