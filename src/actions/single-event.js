import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';

export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const getEventRequest = () => ({
    type: GET_EVENT_REQUEST
});

export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const getEventSuccess = (event) => ({
    type: GET_EVENT_SUCCESS,
    event
});

export const GET_EVENT_ERROR = 'GET_EVENT_ERROR';
export const getEventError = err => ({
    type: GET_EVENT_ERROR,
    err
});

export const getEvent = (eventId) => (dispatch, getState) => {
    dispatch(getEventRequest());
    const authToken = getState().auth.authToken;
    // make a fetch request to the graphql server
    return fetch(`${API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            // pass in the query to graphql
            // query: `{ getById(id: ${eventId}) { id name type}}`
            // query: `{getById(id: "${eventId}") { id name type _embedded { name id } url dates { start { localDate } } } }`
            // query: `{getById(id: "${eventId}") {id name ticketLink bandLink smallImage dates {start {localDate}}   }  }`
            query: `{getById(id: "${eventId}") {id name ticketLink bandLink smallImage comments { body created_at user { username id} } dates { start {localDate} } } }`


        })
    })
    // makes the response errors more readable
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ data }) => {
        console.log(data);
        // passes the response data into get event success
        dispatch(getEventSuccess(data))
    })
    // catches the error
    .catch(err => dispatch(getEventError(err)));
};

