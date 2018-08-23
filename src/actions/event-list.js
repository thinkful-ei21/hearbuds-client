
import {normalizeResponseErrors} from '../actions/utils'
import {API_BASE_URL} from  '../config';


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
        
        fetch(`${API_BASE_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: "{getEvents {id name images {url}  dates {start {localDate}}}}"
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => {
            console.log(data);
            dispatch(getEventListSuccess(data))
        })
        .catch(err => dispatch(getEventListError(err)));
};