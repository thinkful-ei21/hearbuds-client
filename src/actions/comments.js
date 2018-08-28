import {normalizeResponseErrors} from '../actions/utils'
import {API_BASE_URL} from  '../config';
import { loadAuthToken } from '../local-storage';

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const getCommentsRequest = () => ({
    type: GET_COMMENTS_REQUEST
});

export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const getCommentsSuccess = (comments) => ({
    type: GET_COMMENTS_SUCCESS,
    comments
});

export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';
export const getCommentsError = err => ({
    type: GET_COMMENTS_ERROR,
    err
});

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
    const eventId = getState().event.selectedEvent.event.id;
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
        console.log(data);
        dispatch(setCommentSuccess(data))
    })
    .catch(err => {
        console.log('an error occurred')
        dispatch(setCommentError(err))
    })
}


// export const getComments = (body) => (dispatch) => {
//     dispatch(getCommentsRequest());
//     fetch(`${API_BASE_URL}/graphql`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             // Authorization: `Bearer ${authToken}`
//         },
//         body: JSON.stringify({

//         })
//     })
//     dispatch(getCommentsSuccess());
    
    // fetch(`${API_BASE_URL}/graphql`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         // build query to get comments from the server db for specific user
    //         // query: "{getEvents {id name images {url}  dates {start {localDate}}}}"
    //     })
    // })
    // .then(res => normalizeResponseErrors(res))
    // .then(res => res.json())
    // .then(({data}) => {
    //     console.log(data);
    //     dispatch(getCommentsSuccess(data))
    // })
    // .catch(err => dispatch(getCommentstError(err)));
