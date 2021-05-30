import React from 'react'
import { connect } from 'react-redux';
import { Container, Form } from 'shards-react';
import FileView from './FileView';

import { walk } from '../util/api'

import './ProgressBar.css'

class DirContent extends React.Component {
    route;

    constructor(props) {
        super(props);
        console.log('dir content', props)
        this.route = props.route;
        this.state = {
            loaded: false,
            error: null,
            content: null
        }
    }

    render() {
        const { loaded, error, content } = this.state;

        if (!loaded)
            return <div className='progress-line'></div>
        if (error)
            return <p className='error'></p>
        return (
            <Container>
                {
                    content.map(file =>
                        <FileView
                            name={file.name}
                            dir={file.dir}
                            size={file.size}
                            created={file.created}
                            modified={file.lastTimeModified} />)
                }
            </Container>
        )
    }

    componentWillMount() {
        walk(this.route,
            content => this.setState({
                loaded: true,
                error: null,
                content
            }),
            error => this.setState({
                loaded: true,
                error,
                content: null
            }));
    }
}

const mapStateProps = state => {
    console.log('dir content map state', state)
    return({ route: state.explorer.route })
};

export default connect(mapStateProps)(DirContent);