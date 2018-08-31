import React from 'react';
import { connect } from 'react-redux';
import { changeRsvp } from '../actions/single-event';

export default function RSVPButton(props) {

    return <button onClick={() => props.onClick()}>RSVP to Event</button>;

}

// const mapStateToProps = state => {
//     return {};
// };

// export default connect(mapStateToProps)(RSVPButton);