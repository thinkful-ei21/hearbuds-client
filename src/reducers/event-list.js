// import {
//     GET_EVENT_REQUEST,
//     GET_EVENT_SUCCESS,
//     GET_EVENT_ERROR,
//     RSVP_REQUEST,
//     RSVP_SUCCESS,
//     RSVP_ERROR,
// } from '../actions/single-event'

import {
    GET_EVENT_LIST_REQUEST,
    GET_EVENT_LIST_SUCCESS,
    GET_EVENT_LIST_ERROR,
    GET_NEXT_PAGE,
    GET_PREV_PAGE
} from '../actions/event-list'

// import {
//     SET_COMMENT_REQUEST,
//     SET_COMMENT_SUCCESS,
//     SET_COMMENT_ERROR
// } from '../actions/comments'

// import { 
//     SORT_BY_POP_REQUEST, 
//     SORT_BY_POP_ERROR, 
//     SORT_BY_POP_SUCCESS
// } from '../actions/sort-by';

const initialState = {
    eventList: null,
    page: 1,
    eventListPeek: null,
    loading: false,
    error: null
}

export default function reducer(state = initialState, action) {
    if (action.type === GET_EVENT_LIST_REQUEST) {
        return {
            ...state,
            eventList: null,
            loading: true,
            error: null
        }
    } else if (action.type === GET_EVENT_LIST_SUCCESS) {
        return {
            ...state,
            loading: false,
            eventList: action.eventList.getByZip,
            error: null
        }
    } else if (action.type === GET_EVENT_LIST_ERROR) {
        return {
            ...state,
            loading: false,
            error: "an error occured"
        }
    } else if (action.type === GET_NEXT_PAGE) {
        return {
            ...state,
            page: state.page + 1
        }
    } else if (action.type === GET_PREV_PAGE) {
        return {
            ...state,
            page: state.page - 1
        }
    }
    // } else if (action.type === SORT_BY_POP_REQUEST) {
    //     return {
    //         ...state,
    //         loading: true,
    //         error: false,
    //     }
    // } else if (action.type === SORT_BY_POP_ERROR) {
    //     return {
    //         ...state,
    //         loading: false,
    //         error: action.err,            
    //     }
    // } else if (action.type === SORT_BY_POP_SUCCESS) {
    //     return {
    //         ...state,
    //         loading: false,
    //         eventList: action.event.getByPop,
    //         error: null
    //     }
    // }
    return state;
}