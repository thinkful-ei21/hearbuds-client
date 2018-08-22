import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getEvent} from '../actions/single-event';
import Comments from './comments';
import  {data} from '../utils/sampleResponse';


class SingleEvent extends React.Component {
    componentDidMount() {
        // action calls will go here
        this.props.dispatch(getEvent());
    }

    render() {
        return (
            <div>
                <p>{data.name}</p>
                <Comments />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        // grab the event info from state here
        username: state.auth.currentUser.username,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(SingleEvent));
