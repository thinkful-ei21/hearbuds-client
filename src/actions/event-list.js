
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

export const GET_NEXT_PAGE = 'GET_NEXT_PAGE';
export const getNextPage = () => ({
    type: GET_NEXT_PAGE
});

export const GET_PREV_PAGE = 'GET_PREV_PAGE';
export const getPrevPage = () => ({
    type: GET_PREV_PAGE
});

export const getEventList = (zipcode) => (dispatch, getState) => {
        dispatch(getEventListRequest());
        
        const authToken = getState().auth.authToken;
        const pageNumber = getState().events.page;

        let query;
        if (zipcode) {
            query = `{getByZip(zip: ${zipcode}, page: ${pageNumber}) {id name attending {username} smallImage venue { name } dates {start {localDate}}   }  }`
        } else {
            query = `{getByZip(page: ${pageNumber}) {id name attending {username} smallImage venue { name } dates {start {localDate}}   }  }`
        }
        
        fetch(`${API_BASE_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({

                query
                // query: "{getEvents {id name images {url}  dates {start {localDate}}}}"
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => {
            dispatch(getEventListSuccess(data))
        })
        .catch(err => {
            dispatch(getEventListError(err))
        });
};
