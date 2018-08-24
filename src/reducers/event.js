

import {
    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_EVENT_ERROR,
} from '../actions/single-event'

    
import {
    GET_EVENT_LIST_REQUEST,
    GET_EVENT_LIST_SUCCESS,
    GET_EVENT_LIST_ERROR,
} from '../actions/event-list'

const initialState = {
    eventList: null,
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
        console.log(action.event.getById);
        return {
            ...state,
            selectedEvent: {
                // id: action.event.id,
                // name: action.event.name,
                // venue: action.event._embedded.venues[0].name,
                // address: action.event._embedded.venues[0].address.line1,
                // city: action.event._embedded.venues[0].city.name,
                // // date: action.event.date,
                // img: action.event.images[6].url,
                // // description: action.event.description,
                // links: action.event.outlets
                event: action.event.getById
            },
            loading: false,
            error: null
        }
    } else if (action.type === GET_EVENT_ERROR) {
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
        console.log(action.eventList.getByZip);
        return {
            ...state,
            loading: false,
            eventList: action.eventList.getByZip,
            error: null
        }
    } else if (action.type === GET_EVENT_LIST_ERROR) {
        console.log(action.err)
        return {
            ...state,
            loading: false,
            error: action.err.errors[0].message
        }
    }
    return state;
}