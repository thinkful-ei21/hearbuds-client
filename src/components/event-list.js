import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class EventList extends React.Component {
    

    render() {
        // eventually this will be populated with events
        // from the API
        // loop through the array of events and display a list
        let eventList;
        return (
            <div>
                {eventList}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // we'll put props here from redux state
    };
}

export default requiresLogin()(connect(mapStateToProps)(EventList));