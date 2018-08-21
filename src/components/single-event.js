import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import Comments from './comments';

export class SingleEvent extends React.Component {
    componentDidMount() {
        // action calls will go here
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
            <Comments />
        )
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(SingleEvent));
