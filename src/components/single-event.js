import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getEvent} from '../actions/single-event';
import Comments from './comments';
import RSVPButton from './rsvp-button';
import AddComment from './add-comment'; 
import { changeRsvp } from '../actions/single-event';
import moment from 'moment';
import './single-event.css'

class SingleEvent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            attending: false
        }
    }



    componentDidMount() {
        // if (this.props.event && this.props.event.attending) {
        //     this.setState({
        //         attending: this.props.event.attending
        //     });
        // }
        // action calls will go here
        const id  = this.props.match.params.id;
        // console.log(id);
        this.props.dispatch(getEvent(id))
        .then(() => {
            if (this.props.event && this.props.event.attending) {
                this.setState({
                    attending: this.props.event.attending
                });
            }
        })
        .catch(err => console.log(err));
    }

    rsvp() {
        // grabs the eventId from props passed down
        const eventId = this.props.match.params.id;
        // passes in eventId to the action
        this.props.dispatch(changeRsvp(eventId, !this.state.attending));
        
        // this will call an action that adds user
        // to the events list of confirmed users
    }

    render() {
        // destructuring props 
        const { loading, error, event } = this.props;

        if (loading) {
            return <div>Loading event...</div>;
        }

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

                    <RSVPButton onClick={() => this.rsvp()}/>
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
        // attending: state.event.selectedEvent,
        event: state.event.selectedEvent,
        username: state.auth.currentUser.username
    };
};

// export default connect(mapStateToProps)(SingleEvent);
export default requiresLogin()(connect(mapStateToProps)(SingleEvent));
