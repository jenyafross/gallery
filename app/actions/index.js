export const REQUEST_DATA  = 'REQUEST_DATA'
export const RECEIVE_DATA  = 'RECEIVE_DATA'
export const TOGGLE_SCREEN = 'TOGGLE_SCREEN'
export const REQUEST_ERROR = 'REQUEST_ERROR'

function requestData(link) {
    return {
        type : REQUEST_DATA,
        link
    }
}

function receiveData(data) {
    return {
        type : RECEIVE_DATA,
        data        
    }
}

export function toggleScreen(link) {
    return {
        type : TOGGLE_SCREEN,
        link
    }
}

function requestError(err) {
    return {
        type : REQUEST_ERROR
    }
}

export function fetchData(link) {
    return dispatch => {
        dispatch(requestData(link))
        return fetch(link)
                .then(response => response.json())
                .then(data => dispatch(receiveData(data)))
                .catch(err => dispatch(requestError(err)));
    }
}