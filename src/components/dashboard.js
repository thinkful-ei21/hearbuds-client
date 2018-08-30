import React from 'react';
import {connect} from 'react-redux';
// import requiresLogin from './requires-login';
import EventList from './event-list';
import './dashboard.css';


export class Dashboard extends React.Component {

    render() {
        let greeting;
        if(this.props.username) {
            greeting = <h2>Welcome back, {this.props.username.username}!</h2>
        } else {
            greeting = <h2>Welcome!</h2>
        }
        return (
            <div>
                <h2 className="dashboard-title">Welcome {this.props.username}!</h2>
                <EventList zipcode={this.props.match.params.zipcode}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser
    };
};

export default connect(mapStateToProps)(Dashboard);
// export default requiresLogin()(connect(mapStateToProps)(Dashboard));
