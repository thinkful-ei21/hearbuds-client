import React from 'react';

export default function RSVPButton(props) {

    return <button onClick={() => props.onClick()}>RSVP to Event</button>;

}