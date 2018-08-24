import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {getComments} from '../actions/comments'

export class Comments extends React.Component {

    componentDidMount() {
        // get id from the url
        // const id = this.props.match.params.id;
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

        if (comments) {
              const displayComments = Object.keys(comments).map((user, index) => {
                    console.log(user, comments[user])
                    return <li key={index}>{user}: {comments[user]}</li>
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
        comments: state.event.comments,
        loading: state.event.loading,
        error: state.event.error
    };
};
// export default connect(mapStateToProps)(Comments);
export default requiresLogin()(connect(mapStateToProps)(Comments));