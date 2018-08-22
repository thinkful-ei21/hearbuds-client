import {
    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_EVENT_ERROR,
    GET_EVENT_LIST_ERROR,
    GET_EVENT_LIST_SUCCESS,
    GET_EVENT_LIST_REQUEST
} from '../actions/single-event'

const initialState = {
    eventList: [],
    selectedEvent: {},
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
        console.log(action.err);
        return {
            ...state,
            loading: false,
            error: action.err
        }
    } else if (action.type === GET_EVENT_LIST_REQUEST) {
        return {
            ...state,
            loading: true,
            error: null
        }
    } else if (action.type === GET_EVENT_LIST_SUCCESS) {
        return {
            ...state,
            loading: false,
            eventList: [
                action.event.list
            ],
            error: null
        }
    } else if (action.type === GET_EVENT_LIST_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.err
        }
    }
    return state;
}