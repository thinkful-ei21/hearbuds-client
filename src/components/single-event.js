import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getEvent} from '../actions/single-event';
import Comments from './comments';

class SingleEvent extends React.Component {
    componentDidMount() {
        // action calls will go here
        this.props.dispatch(getEvent());
    }

    render() {
        return (
            <div>
                <h3>{this.props.event.name}</h3>
                <p>{this.props.event.venue}</p>
                <p>{this.props.event.address}, {this.props.event.city}</p>
                <img src={this.props.event.img} width="200px"></img>

                <Comments />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        event: state.event.selectedEvent,
        username: state.auth.currentUser.username
    };
};

export default requiresLogin()(connect(mapStateToProps)(SingleEvent));
