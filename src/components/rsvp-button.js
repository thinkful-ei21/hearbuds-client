import React from 'react';
import { connect } from 'react-redux';
import { changeRsvp } from '../actions/single-event';

class RSVPButton extends React.Component {

    rsvp() {
        // grabs the eventId from props passed down
        const eventId = this.props.eventId;
        // passes in eventId to the action
        this.props.dispatch(changeRsvp(eventId));
        
        // this will call an action that adds user
        // to the events list of confirmed users
    }

    render(){
        return <button onClick={() => this.rsvp()}>RSVP to Event</button>;
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(RSVPButton);