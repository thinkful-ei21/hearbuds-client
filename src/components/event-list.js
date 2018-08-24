import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {getEventList} from '../actions/event-list'
import {Redirect} from 'react-router-dom';

export class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
        }
    }
    componentDidMount() {
        this.setState({
            redirect: null
        })
        this.props.dispatch(getEventList());
    }

    goToEvent(e) {
        e.preventDefault();
        console.log('clicked');
        let eventId = e.currentTarget.value;
        return this.setState({
            redirect: <Redirect to={'/dashboard/'+eventId} />
        })
    }

    render() {
        const {loading, error, eventList} = this.props;
        
        if (loading) {
            return <div>Loading event list...</div>
        }

        if (error) {
            return <div>{this.props.error}</div>
        }

        if (eventList) {
            return (eventList.map((event, index) => {
               
               return <ul key={index.toString() + 'ul'}>
                    {this.state.redirect}
                    <li className='event-name' key={index.toString()+'name'}>{event.name}</li>
                    <li className='event-date' key={index.toString()+'date'}>{event.dates.start.localDate}</li>
                    <img className='event-img' src={event.images[0].url} alt='event artist' />
                    {/* <li className='event-venue'key={index.toString()+'venue'}>{event.venues[0].name}</li> */}
                    {/* <li className='event-rsvp-count' key={index.toString()+'rsvp'}>RSVPs:  {event.rsvpCount}</li> */}
                    <button type='submit' value={event.id} onClick={(e) => this.goToEvent(e)}>See more info</button>
                </ul>

            }))

        }
        return <h1>Why won't this render how I want it to?</h1>
        }
    }

const mapStateToProps = state => {
    return {
        eventList: state.event.eventList,
        loading: state.event.loading,
        error: state.event.error
    };
}


export default requiresLogin()(connect(mapStateToProps)(EventList));