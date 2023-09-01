// import {accountService} from '../services';

export default {
    get,
    post,
    put,
    upload,
    delete: _delete
}

async function get(url) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(url, requestOptions).then(handleResponse);
}

async function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

async function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

async function upload(url, body) {
    const formData = new FormData();
    for (let x in body) {
        switch (typeof body[x]) {
            case 'object':
                // Exclude file
                if (body[x] instanceof Blob) {
                    formData.append(x, body[x]);
                } else {
                    // handle the nested field
                    for (let c in body[x]) {
                        formData.append(`${x}.${c}`, body[x][c]);
                    }
                }
                break;
            default:
                formData.append(x, body[x]);
        }
    }

    const requestOptions = {
        method: 'POST',
        body: formData
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
    };
    return fetch(url, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
    let data;
    try {
        data = await response.json();
    } catch (err) {
        return Promise.reject('Unexpected error');
    }

    if (!response.ok) {
        // if ([401, 403].includes(response.status) && accountService.userValue) {
        //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        //     accountService.logout();
        // }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
