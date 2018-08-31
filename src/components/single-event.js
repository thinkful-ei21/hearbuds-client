import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getEvent} from '../actions/single-event';
import Comments from './comments';
import RSVPButton from './rsvp-button';
import AddComment from './add-comment'; 
import { changeRsvp } from '../actions/single-event';


class SingleEvent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id
        }
    }

    componentDidMount() {
        // action calls will go here
        const id  = this.props.match.params.id;
        // console.log(id);
        this.props.dispatch(getEvent(id));
    }

    rsvp() {
        // grabs the eventId from props passed down
        // console.log(this.state);
        const eventId = this.props.match.params.id;
        // passes in eventId to the action
        this.props.dispatch(changeRsvp(eventId));
        
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
            const {name, dates, smallImage, bandLink, ticketLink} = event.event
            // if there is a band link, generate an anchor tag for it
            let bandLinkXml;
            if (bandLink !== null) {
                bandLinkXml = <a href={bandLink}>Band Website</a>
            }

            return (
                // React Fragments work like divs to wrap elements
                // Link to React Fragment docs: 
                // https://reactjs.org/docs/fragments.html
                <React.Fragment>
                    
                    <h1>{name}</h1>
                    <h2>{dates.start.localDate}</h2>
                    <p>
                        <a href={ticketLink}>Buy Tickets</a>
                    </p>
                    <img src={smallImage} alt={name} width="200px"></img>
                    {bandLinkXml}

                    <RSVPButton onClick={() => this.rsvp()}/>
                    <Comments />
                    <AddComment />
    
                </React.Fragment>
            )
        }
        return null

    }
}

const mapStateToProps = state => {
    return {
        event: state.event.selectedEvent,
        username: state.auth.currentUser.username
    };
};

// export default connect(mapStateToProps)(SingleEvent);
export default requiresLogin()(connect(mapStateToProps)(SingleEvent));
