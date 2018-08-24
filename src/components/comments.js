import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {getComments} from '../actions/comments'

export class Comments extends React.Component {

    componentDidMount() {
        this.props.dispatch(getComments());
    }

    render() {
        const {loading, error, comments} = this.props;
        if (loading) {
           return <h1>loading comments...</h1>
        }

        if (error) {
            return <h1>{this.props.error}</h1>
        }

        // for (let username in comments) {
        //     return <li>{username}: {comments[username]}</li>
        // }
        return <h1>Why won't this render how I want it to?}</h1>
    } 
    
}

const mapStateToProps = state => {
    return {
        comments: state.event.comments,
        loading: state.event.loading,
        error: state.event.error
    };
};
export default connect(mapStateToProps)(Comments);
// export default requiresLogin()(connect(mapStateToProps)(Comments));