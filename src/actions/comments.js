import {normalizeResponseErrors} from '../actions/utils'
import {API_BASE_URL} from  '../config';
import { loadAuthToken } from '../local-storage';
import {getEvent} from '../actions/single-event';

export const SET_COMMENT_SUCCESS = 'SET_COMMENT_SUCCESS';
export const setCommentSuccess = (comment) => ({
    type: SET_COMMENT_REQUEST,
    comment
});

export const SET_COMMENT_ERROR = 'SET_COMMENT_ERROR';
export const setCommentError = () => ({
    type: SET_COMMENT_ERROR
});

export const SET_COMMENT_REQUEST = 'SET_COMMENT_REQUEST';
export const setCommentRequest = () => ({
    type: SET_COMMENT_REQUEST
})

export const setComment = (body) => (dispatch, getState) => {
    dispatch(setCommentRequest());
    const authToken = loadAuthToken();
    const eventId = getState().singleEvent.selectedEvent.event.id;
    let query = `
        mutation {
            setComment(body: "${body}", eventId: "${eventId}")
        }
    `
    fetch(`${API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({query})
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({data}) => {
        dispatch(setCommentSuccess(data));
    })
    .then(() => {
        dispatch(getEvent(eventId));
    })
    .catch(err => {
        dispatch(setCommentError(err))
    })
}
