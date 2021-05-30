import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'shards-react'
import { ACTION_APPEND_PATH } from '../state/actions';
import { MODE_EXPLORE } from '../state/explorerModes';

import './FileView.css'

export default function FileView(props) {
    const { name, dir, size, created, modified } = props;
    if (dir)
        return <OpenableDir name={name}></OpenableDir>
    return <File name={name} size={size} created={created} modified={modified} />
}

const formatter = new Intl.DateTimeFormat('ru-RU');

function File(props) {
    const { name, size, created, modified } = props;
    return (
        <Row className="directory-content">
            <Col>{name}</Col>
            <Col>size: {size}b</Col>
            <Col title='created / modified'>{formatter.format(new Date(created))} / {formatter.format(new Date(modified))}</Col>

        </Row >
    )
}

const PreviewableFile = connect()(File)

function Dir(props) {
    const name = props.name;
    return (
        <Row className="directory-content">
            <Col onClick={() => props.open(name)}>{name}</Col>
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
