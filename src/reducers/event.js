import {
    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_EVENT_ERROR,
    RSVP_REQUEST,
    RSVP_SUCCESS,
    RSVP_ERROR,
} from '../actions/single-event'

import {
    GET_EVENT_LIST_REQUEST,
    GET_EVENT_LIST_SUCCESS,
    GET_EVENT_LIST_ERROR,
    GET_NEXT_PAGE,
    GET_PREV_PAGE
} from '../actions/event-list'

import {
    SET_COMMENT_REQUEST,
    SET_COMMENT_SUCCESS,
    SET_COMMENT_ERROR
} from '../actions/comments'

const initialState = {
    eventList: null,
    page: 1,
    eventListPeek: null,
    selectedEvent: null,
    loading: false,
    error: null
}

export default function reducer(state = initialState, action) {
    if (action.type === GET_EVENT_REQUEST) {
        return {
            ...state,
            loading: true,
            error: null
        }
    } else if (action.type === GET_EVENT_SUCCESS) {
        return {
            ...state,
            selectedEvent: {
                event: action.event.getById,
                attending: false,
            },
            loading: false,
            error: null
        }
    } else if (action.type === RSVP_REQUEST) {
        return {
            ...state,
            loading: true,
            error: null
        }
    } else if (action.type === RSVP_SUCCESS) {
        return {
            ...state,
            loading: false,
            selectedEvent: {
                event: action.event.getById
            }
        }
    } else if(action.type === GET_EVENT_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.err.errors[0].message
        }
    } else if (action.type === GET_EVENT_LIST_REQUEST) {
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
    } else if (action.type === SET_COMMENT_REQUEST) {
        return {
            ...state,
            loading: true,
            error: null
        }
    } else if (action.type === SET_COMMENT_SUCCESS) {
        console.log(action.comments)
        return {
            ...state,
            loading: false,
            error: null
        }
    } else if (action.type === SET_COMMENT_ERROR) {
        return {
            ...state,
            loading: false,
            error: "an error occured"
        }
    } 
    return state;
}