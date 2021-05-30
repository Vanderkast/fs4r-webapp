import axios from "axios";

import { getCreds } from './auth'

const base_url = 'http://localhost:8080/api'

const api = axios.create({
    baseURL: base_url,
});

export async function walk(route, onDone, onError) {
    api.get('/v1/main/walk/' + route.join('/'), {
        responseType: 'json',
        crossdomain: true,
        headers: {
            Authorization: "Basic " + getCreds(),
        }
    }).then(response => {
        console.log('content', response.data)
        onDone(response.data)
    })
        .catch(error => {
            console.log(error)
            if (error.message.includes('401')) onError('Incorrect auth credentials! Logout and try again.')
            else if (error.message.includes('403')) onError('You are not allowed to open this directory :(')
            else onError(error.message);
        })
}

export function download(route, file) {
    window.open(base_url + "/v1/main/download" + fileEndpoint(route, file), '_blank');
}

function fileEndpoint(route, file) {
    let _route = route.join("/");
    return (_route.endsWith("/") ? _route : _route + "/") + file;
}
