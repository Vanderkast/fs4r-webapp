import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem } from 'shards-react'
import { ACTION_UPDATE_ROUTE } from '../state/actions';

import './Navigator.css'

function Navigator(props) {
    console.log('navigator', props)
    const { route, updateRoute } = props;
    if (route.length === 1 && route[0] === "")
        return (
            <Breadcrumb>
                {root(updateRoute)}
            </Breadcrumb>
        );
    return (
        <Breadcrumb>
            {root(updateRoute)}
            {route.map((path, i) => (
                <BreadcrumbItem>
                    <button>{path}</button>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}

const root = updateRoute => (
    <BreadcrumbItem>
        <button onClick={() => updateRoute([])}>Root</button>
    </BreadcrumbItem>
)

const mapDispatch = dispatch => ({
    updateRoute: route => dispatch({
        type: ACTION_UPDATE_ROUTE,
        route: route
    })
})

export default connect(null, mapDispatch)(Navigator)