import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getEvent} from '../actions/single-event';
import Comments from './comments';
import  {data} from '../utils/sampleResponse';
import RSVPButton from './rsvp-button';


class SingleEvent extends React.Component {
    componentDidMount() {
        // action calls will go here
        const id  = this.props.match.params.id;
        console.log(id);
        this.props.dispatch(getEvent(id));
    }

    render() {
        // destructuring props 
        const { loading, error, event } = this.props;

        if (loading) {
            return <div>Loading event...</div>;
        }

        if (error) {
            return <div>{this.props.error}</div>;
        }

        if (event) {
            
            return (
                // React Fragments work like divs to wrap elements
                // Link to React Fragment docs: 
                // https://reactjs.org/docs/fragments.html
                <React.Fragment>
                    {/* this is all dummy data for now */}
                    {/* <h3>{this.props.event.name}</h3>
                    <p>{this.props.event.venue}</p>
                    <p>{this.props.event.address}, {this.props.event.city}</p>
                    <img src={this.props.event.img} width="200px" alt="aubrey graham in a random city"></img> */}

                    <h1>{this.props.event.event.name}</h1>
                    
                    <RSVPButton />
    
                    <Comments />
    
                </React.Fragment>
            )

        }
        return <div>something</div>

    }
}

const mapStateToProps = state => {
    return {
        event: state.event.selectedEvent,
        username: state.auth.currentUser.username,
        protectedData: state.protectedData.data
    };
};

// export default connect(mapStateToProps)(SingleEvent);
export default requiresLogin()(connect(mapStateToProps)(SingleEvent));
