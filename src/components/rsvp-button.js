import React from 'react';

export default class RSVPButton extends React.Component {

    rsvp(e) {
        e.preventDefault();
        console.log('confirm button pressed');

        // this will call an action that adds user
        // to the events list of confirmed users
    }

    render(){
        return <button onClick={(e) => this.rsvp(e)}>RSVP to Event</button>;
    }
}