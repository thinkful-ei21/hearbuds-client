import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getEvent} from '../actions/single-event';
import Comments from './comments';
import AddComment from './add-comment'; 
import moment from 'moment';
import './single-event.css'
import Spinner from 'react-spinkit';
import { changeRsvp } from '../actions/single-event';

class SingleEvent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id
        }
    }

    componentDidMount() {
        const id  = this.props.match.params.id;
        this.props.dispatch(getEvent(id))
    }

    // checks whether user has rsvp'd to the event
    rsvpCheck() {
        // arr is an array of objects with the user id and username of all rsvp'd users
        let arr = this.props.attending;
        console.log("arr:", arr)
        if (arr === null) {
            // if the array is null, no one has rsvp'd
            return false
        } else {
            // loop through the array and check to see if it contains the user
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].username === this.props.username) {
                  return true;
                 } 
             }
             return false;
        }
    }

    rsvp() {
        // grabs the eventId from props passed down
        const eventId = this.props.match.params.id;
        // see if user has already rsvp'd
        const attending = this.rsvpCheck();
        // passes in eventId and the opposite of user's current rsvp status to the action
        this.props.dispatch(changeRsvp(eventId, !attending));
    }

    render() {
        // destructuring props 
        const { loading, error, event } = this.props;
        // set the text in rsvp button depending on user's rsvp status
        let rsvpBool = this.rsvpCheck();
        let rsvpButton;
        if (rsvpBool) {
            rsvpButton = "Cancel RSVP"
        } else {
            rsvpButton = "RSVP to this event!"
        }
        // display a message while componenet is loading
        if (loading) {
            return  <div id="spinner">
                        <Spinner name="ball-grid-pulse" color="orange"/>
                    </div>
        }
        // display a message if there is an error
        if (error) {
            return <div>{this.props.error}</div>;
        }

        if (event) {
           // destructure event props
            const {name, dates, smallImage, bandLink, ticketLink, venue} = event.event
            // if there is a band link, generate an anchor tag for it
            let bandLinkXml;
            if (bandLink !== null) {
                bandLinkXml = <a href={bandLink}>Artist Website</a>
            }

            return (
                // React Fragments work like divs to wrap elements
                // Link to React Fragment docs: 
                // https://reactjs.org/docs/fragments.html
                <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <h1 className="center">{name}</h1>
                            <h3 className="center">Live at {venue.name} - {moment(dates.start.localDate).format("dddd, MMMM Do YYYY")}</h3>
                            <p className="right">
                                <a href={ticketLink}>Buy Tickets</a>
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <img id="event-image" src={smallImage} alt={name}></img>
                                {bandLinkXml}
                            </div>
                            <div className="col-6">
                            
                            </div>
                        </div>

                        

                    <button onClick={() => this.rsvp()}>{rsvpButton}</button>

                    <Comments />
                    <AddComment />

                    </div>
                    

                </React.Fragment>
            )
        }
        return null

    }
}

const mapStateToProps = state => {
    return {
        attending: state.singleEvent.attending,
        event: state.singleEvent.selectedEvent,
        username: state.auth.currentUser.username
    };
};


export default requiresLogin()(connect(mapStateToProps)(SingleEvent));
