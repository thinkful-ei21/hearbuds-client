import {
    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_EVENT_ERROR,
    RSVP_REQUEST,
    RSVP_SUCCESS,
    RSVP_ERROR,
} from '../actions/single-event'

import {
    SET_COMMENT_REQUEST,
    SET_COMMENT_SUCCESS,
    SET_COMMENT_ERROR
} from '../actions/comments'

const initialState = {
    selectedEvent: null,
    attending: null,
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
            },
            loading: false,
            error: null
        }
    } else if(action.type === GET_EVENT_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.err.errors[0].message
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
            attending: action.data.setRSVP.attending,
            error: null
        }
      } else if (action.type === RSVP_ERROR) {
            return {
                ...state,
                loading: false,
                error: "there was an error with the rsvp request"
            }
    } else if (action.type === SET_COMMENT_REQUEST) {
        return {
            ...state,
            loading: true,
            error: null
        }
    } else if (action.type === SET_COMMENT_SUCCESS) {
        
        return {
            ...state,
            loading: false,
            error: null
        }
    } else if (action.type === SET_COMMENT_ERROR) {
        return {
            ...state,
            loading: false,
            error: "an error occured with the comment request"
        }
    } 
    return state;
}