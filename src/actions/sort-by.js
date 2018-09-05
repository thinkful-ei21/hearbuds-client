import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';

export const SORT_BY_POP_REQUEST = 'SORT_BY_POP_REQUEST';
export const sortByPopRequest = () => ({
    type: SORT_BY_POP_REQUEST
});

export const SORT_BY_POP_SUCCESS = 'SORT_BY_POP_SUCCESS';
export const sortByPopSuccess = (event) => ({
    type: SORT_BY_POP_SUCCESS,
    event
});

export const SORT_BY_POP_ERROR = 'SORT_BY_POP_ERROR';
export const sortByPopError = err => ({
    type: SORT_BY_POP_ERROR,
    err
});

export const sortByPop = () => (dispatch, getState) => {
    dispatch(sortByPopRequest());
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
            query: `{getByPop {id name ticketLink bandLink smallImage venue { name } comments { id body time user { username id} } dates { start {localDate} } } }`
        })
    })
    // makes the response errors more readable
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ data }) => {
        // passes the response data into get event success
        dispatch(sortByPopSuccess(data))
    })
    // catches the error
    .catch(err => dispatch(sortByPopError(err)));
};

