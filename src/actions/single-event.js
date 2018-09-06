import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';

export const RSVP_REQUEST = 'RSVP_REQUEST';
export const rsvpRequest = () => ({
    type: RSVP_REQUEST
});

export const RSVP_SUCCESS = 'RSVP_SUCCESS';
export const rsvpSuccess = (data) => ({
    type: RSVP_SUCCESS,
    data
});

export const RSVP_ERROR = 'RSVP_ERROR';
export const rsvpError = err => ({
    type: RSVP_ERROR,
    err
});

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

            query: `{getById(id: "${eventId}") {id name attending {id username} ticketLink bandLink smallImage venue { name } comments { id body time user { username id} } dates { start {localDate} } } }`

        })
    })
    // makes the response errors more readable
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ data }) => {
        // passes the response data into get event success
        dispatch(getEventSuccess(data))
    })
    // catches the error
    .catch(err => dispatch(getEventError(err)));
};

export const changeRsvp = (eventId, attending) => (dispatch, getState) => {
    dispatch(rsvpRequest());
    const authToken = getState().auth.authToken;
    
    let query = `
        mutation {
            setRSVP(attending: ${attending}, eventID: "${eventId}") {attending {id username}}
        }
    `;

    return fetch(`${API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ query })
    })
    // normalizes the error messages
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then( ({ data}) => dispatch(rsvpSuccess(data)))
    .catch(err => dispatch(rsvpError(err)));

}
