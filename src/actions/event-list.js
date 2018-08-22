import {data} from '../utils/sampleEventList'

export const GET_EVENT_LIST_REQUEST = 'GET_EVENT_LIST_REQUEST';
export const getEventListRequest = () => ({
    type: GET_EVENT_LIST_REQUEST
});

export const GET_EVENT_LIST_SUCCESS = 'GET_EVENT_LIST_SUCCESS';
export const getEventListSuccess = (eventList) => ({
    type: GET_EVENT_LIST_SUCCESS,
    eventList
});

export const GET_EVENT_LIST_ERROR = 'GET_EVENT_LIST_ERROR';
export const getEventListError = err => ({
    type: GET_EVENT_LIST_ERROR,
    err
});

export const getEventList = () => (dispatch) => {
    dispatch(getEventListRequest());
    console.log('getEventList fired');
    dispatch(getEventListSuccess(data));

}

//will rewrite async call after server is connected
// export const getEvent = () => (dispatch) => {
    //     dispatch(getEventRequest());
    //     console.log('getEvent fired', API_KEY)
    //     const params = {
    //         'countryCode': 'US',
    //         'apikey': API_KEY,
    //         'id': 'Z7r9jZ1Ae8AGe'
    //     }
    //     let url = new URL(`${EVENT_API_BASE_URL}`);
    //     Object.keys(params).forEach(key => {
    //         console.log(params[key]);
    //         return url.searchParams.append(key, params[key])
    //     })
    //         return fetch(url, {
    //             method: 'GET',
    //             mode: 'cors',
    //             'Content-Type': 'application/json'
    //         })
    //         .then(res => normalizeResponseErrors(res))
    //         .then(res => res.json())
    //         .then(event => dispatch(getEventSuccess(event)))
    //         .catch(err => dispatch(getEventError(err)));
    // };