import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Comment from './single-comment';
require('./comments.css');

export class Comments extends React.Component {

    render() {
        
        const {loading, error, comments} = this.props;
        

        if (loading) {
           return <h1>loading...</h1>
        }

        if (error) {
            return <h1>{this.props.error}</h1>
        }

        if (comments) {
              const displayComments = comments.map((user, index) => {
                    return <Comment key={index} time={user.time} user={user.user.username} body={user.body} />
                })
            return (
                <div className="comments-container">
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
        comments: state.singleEvent.selectedEvent.event.comments,
        loading: state.singleEvent.loading,
        error: state.singleEvent.error
    };
};
// export default connect(mapStateToProps)(Comments);
export default requiresLogin()(connect(mapStateToProps)(Comments));