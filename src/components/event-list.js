import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {getEventList, getNextPage, getPrevPage} from '../actions/event-list'
import {Redirect} from 'react-router-dom';
import moment from 'moment';
require('./event-list.css')

export class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            message: null,
            eventId: null
        }
    }

    getEvents() {
        if (this.props.loggedIn) {
            this.props.dispatch(getEventList());
        } else {
            this.props.dispatch(getEventList(this.props.zipcode))
        }
    }

    componentDidMount() {
        this.setState({
            redirect: null
        })
        
        this.getEvents();
    }

    prevPageClick() {
        this.props.dispatch(getPrevPage());
        this.getEvents();
    }

    nextPageClick(){
        this.props.dispatch(getNextPage());
        this.getEvents();
    }

    goToEvent(e) {
        e.preventDefault();
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
        const {loading, error, eventList, page} = this.props;
        let events;
        let prevPage;

        if (loading) {
            return <div>Loading event list...</div>
        }

        if (error) {
            return <div>{this.props.error.message}</div>
        }

        if (this.state.redirect) {
            return <Redirect to={'/dashboard/'+this.state.eventId} />
        }

        if (eventList) {
            events = eventList.map((event, index) => {
                // only display the previous page button
                // if page is not the first page
                if (page > 1) {
                    prevPage = <button onClick={() => this.prevPageClick()}>Prev Page</button>
                }


               return (
                    <div className="row"  key={index.toString()}>
                        <div className="col-5">
                            <img className="flex-img" src={event.smallImage} alt="event artist" />
                        </div>
                        <div className="col-4">
                            <div className="event-name">{event.name}</div>
                            <p>{moment(event.dates.start.localDate).calendar() } - {moment(event.dates.start.localDate).from(moment())}</p>
                            <p className="event-details">{event.venue.name} - x {event.rsvpCount} attending</p>

                        </div>
                            <div className="col-3">
                                <button className="info-button" type='submit' value={event.id} onClick={(e) => this.goToEvent(e)}>See more info</button>
                            </div>
                        
                    </div>)
            })

        }
        return (
            <div className="container">
                {events}
                {prevPage}
                <h1>Page: {page}</h1>
                {/* <button onClick={() => this.prevPageClick()}>Prev Page</button> */}
                <button onClick={() => this.nextPageClick()}>Next Page</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.currentUser != null,
        eventList: state.event.eventList,
        page: state.event.page,
        loading: state.event.loading,
        error: state.event.error
    };
}

export default connect(mapStateToProps)(EventList);
// export default requiresLogin()(connect(mapStateToProps)(EventList));