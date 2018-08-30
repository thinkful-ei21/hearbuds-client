import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {getProtectedEventList, getNextPage, getPrevPage} from '../actions/event-list'
import {Redirect} from 'react-router-dom';

export class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }
    componentDidMount() {
        this.setState({
            redirect: null
        })
        this.props.dispatch(getProtectedEventList());
    }

    prevPageClick(e) {
        this.props.dispatch(getPrevPage());
        this.props.dispatch(getProtectedEventList());
    }
    nextPageClick(e) {
        this.props.dispatch(getNextPage());
        this.props.dispatch(getProtectedEventList())
    }


    goToEvent(e) {
        e.preventDefault();
        let eventId = e.currentTarget.value;
        return this.setState({
            redirect: <Redirect to={'/dashboard/'+eventId} />
        })
    }

    render() {
        const {loading, error, eventList, page} = this.props;
        let events;
        let prevPage;

        if (loading) {
            return <div>Loading event list...</div>
        }

        if (error) {
            return <div>{this.props.error}</div>
        }

        if (eventList) {
            events = eventList.map((event, index) => {
                // only display the previous page button
                // if page is not the first page
                if (page > 1) {
                    prevPage = <button onClick={() => this.prevPageClick()}>Prev Page</button>
                }

               return <ul key={index.toString() + 'ul'}>
                    {this.state.redirect}
                    <li className='event-name' key={index.toString()+'name'}>{event.name}</li>
                    <li className='event-date' key={index.toString()+'date'}>{event.dates.start.localDate}</li>
                    <img className='event-img' src={event.smallImage} width="200px" alt='event artist' />
                    {/* <li className='event-venue'key={index.toString()+'venue'}>{event.venues[0].name}</li> */}
                    {/* <li className='event-rsvp-count' key={index.toString()+'rsvp'}>RSVPs:  {event.rsvpCount}</li> */}
                    <button type='submit' value={event.id} onClick={(e) => this.goToEvent(e)}>See more info</button>
                </ul>

            })

        }
        return (
            <div>
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
        eventList: state.event.eventList,
        page: state.event.page,
        loading: state.event.loading,
        error: state.event.error
    };
}


export default requiresLogin()(connect(mapStateToProps)(EventList));