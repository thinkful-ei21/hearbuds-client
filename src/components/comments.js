import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {getComments} from '../actions/comments'

export class Comments extends React.Component {

    componentDidMount() {
        this.props.dispatch(getComments())
    }

    render() {
        // console.log("singleEvent state", this.props.comments)
        const {loading, error, comments} = this.props;
        

        if (loading) {
           return <h1>loading comments...</h1>
        }

        if (error) {
            return <h1>{this.props.error}</h1>
        }

        if (comments) {
              const displayComments = comments.map((user, index) => {
                    // console.log("user", user, "comment", comments[user])
                    return <li key={index}>{user.user.username}: {user.body}</li>
                })
            return (
                <ul>
                    {displayComments}
                </ul>
            )
        
        }

        return null
    } 
    
}

const mapStateToProps = state => {
    return {
        comments: state.event.selectedEvent.event.comments,
        loading: state.event.loading,
        error: state.event.error
    };
};
// export default connect(mapStateToProps)(Comments);
export default requiresLogin()(connect(mapStateToProps)(Comments));