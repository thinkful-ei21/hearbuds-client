import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {getEventList} from '../actions/event-list'
import {Redirect, withRouter} from 'react-router-dom';

export class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            message: null,
            eventId: null
        }
    }
    componentDidMount() {
        this.setState({
            redirect: null
        })
        console.log("event list is mounting")
        if (this.props.loggedIn) {
            this.props.dispatch(getEventList(null));
        } else {
            this.props.dispatch(getEventList(this.props.zipcode))
        }
    }

    goToEvent(e) {
        e.preventDefault();
        console.log('clicked');
        let eventId = e.currentTarget.value;
        if (this.props.loggedIn) {
            return this.setState({
                redirect: true,
                eventId
            })
        } else {
            return this.setState({
                redirect: false,
                message: <p>"You must be logged in to access this page"</p>
            })
        }
       
    
    }

    render() {
        const {loading, error, eventList} = this.props;
        
        if (loading) {
            return <div>Loading event list...</div>
        }

        if (error) {
            return <div>{this.props.error}</div>
        }

        if (this.state.redirect) {
            return <Redirect to={'/dashboard/'+this.state.eventId} />
        }

        if (eventList) {
            return (eventList.map((event, index) => {
               
               return <ul key={index.toString() + 'ul'}>
                    {this.state.message}
                    <li className='event-name' key={index.toString()+'name'}>{event.name}</li>
                    <li className='event-date' key={index.toString()+'date'}>{event.dates.start.localDate}</li>
                    <img className='event-img' src={event.smallImage} width="200px" alt='event artist' />
                    {/* <li className='event-venue'key={index.toString()+'venue'}>{event.venues[0].name}</li> */}
                    {/* <li className='event-rsvp-count' key={index.toString()+'rsvp'}>RSVPs:  {event.rsvpCount}</li> */}
                    <button type='submit' value={event.id} onClick={(e) => this.goToEvent(e)}>See more info</button>
                </ul>

            }))

        }
        return null
        }
    }

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.currentUser != null,
        eventList: state.event.eventList,
        loading: state.event.loading,
        error: state.event.error
    };
}

export default withRouter(connect(mapStateToProps)(EventList));
// export default requiresLogin()(connect(mapStateToProps)(EventList));