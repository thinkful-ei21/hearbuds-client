import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class EventList extends React.Component {


    render() {
        // eventually this will be populated with events
        // from the API
        return 'Events';
    }
}

const mapStateToProps = state => {
    return {
        // we'll put props here from redux state
    };
}

export default requiresLogin()(connect(mapStateToProps)(EventList));