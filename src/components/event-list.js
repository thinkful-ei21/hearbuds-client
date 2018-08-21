import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class EventList extends React.Component {


    render() {
        return 'Events';
    }
}

const mapStateToProps = state => {
    return {

    };
}

export default requiresLogin()(connect(mapStateToProps)(EventList));