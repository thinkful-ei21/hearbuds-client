import {
    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_EVENT_ERROR,
} from '../actions/single-event'

    
import {
    GET_EVENT_LIST_REQUEST,
    GET_EVENT_LIST_SUCCESS,
    GET_EVENT_LIST_ERROR
} from '../actions/event-list'

import {
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_ERROR
} from '../actions/comments'

const initialState = {
    eventList: null,
    selectedEvent: null,
    comments: null,
    loading: false,
    error: null
    }


export default function reducer(state = initialState, action) {
    if (action.type === GET_EVENT_REQUEST) {
        console.log('loading');
        return {
            ...state,
            loading: true,
            error: null
        }
    } else if (action.type === GET_EVENT_SUCCESS) {
        console.log(action.event);
        return {
            ...state,
            selectedEvent: {
                name: action.event.namel,
                venue: action.event.venue,
                date: action.event.date,
                img: action.event.img,
                description: action.event.description,
                links: action.event.links
            },
            loading: false,
            error: null
        }
    } else if (action.type === GET_EVENT_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.err
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
            eventList: action.eventList.getEvents,
            error: null
        }
    } else if (action.type === GET_EVENT_LIST_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.err.errors[0].message
        }
    } else if (action.type === GET_COMMENTS_REQUEST) {
        return {
            ...state,
            loading: true,
            error: null
        }
    } else if (action.type === GET_COMMENTS_SUCCESS) {
        console.log(action.comments);
        return {
            ...state,
            loading: false,
            eventList: action.comments,
            error: null
        }
    } else if (action.type === GET_COMMENTS_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.err.errors[0].message
        }
    }
    return state;
}