import { Breadcrumb, BreadcrumbItem } from 'shards-react'
import { updateRoute } from '../state/actions'
import { connect } from 'react-redux'

function NavigatorView({ route, onPathClick }) {
    if (route.length === 1 && route[0] === "")
        return (
            <Breadcrumb>
                <BreadcrumbItem>
                    <a onClick={() => onPathClick([])}>Root</a>
                </BreadcrumbItem>
            </Breadcrumb>
        );
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <a onClick={() => onPathClick([])}>Root</a>
            </BreadcrumbItem>
            {route.map((path, i) => (
                <BreadcrumbItem>
                    <a onClick={() => onPathClick(route.slice(0, i + 1))}>{path}</a>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}

const mapRoute = state => ({ route: state.route })

const mapOnPathClick = ({
    onPathClick: updateRoute
})

export default Navigator = connect(mapRoute, mapOnPathClick)(NavigatorView);