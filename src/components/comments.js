import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Comment from './single-comment';
require('./comments.css');

export class Comments extends React.Component {

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
                    return <Comment key={index} time={user.time} user={user.user.username} body={user.body} />
                })
            return (
                <div class="comments-container">
                    <ul>
                        {displayComments}
                    </ul>
                </div>
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