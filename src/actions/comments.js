// import {normalizeResponseErrors} from '../actions/utils'
// import {API_BASE_URL} from  '../config';
import {comments} from '../utils/sampleComments'

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
export const getCommentstError = err => ({
    type: GET_COMMENTS_ERROR,
    err
});

export const getComments = () => (dispatch) => {
    dispatch(getCommentsRequest());
    console.log(comments, "get comments fired");
    dispatch(getCommentsSuccess(comments));
    
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
};