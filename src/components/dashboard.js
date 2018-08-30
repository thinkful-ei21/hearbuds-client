import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import EventList from './event-list';
import './dashboard.css';


export class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <h2 className="dashboard-title">Welcome {this.props.username}!</h2>
                <EventList />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username
    };
};

// export default connect(mapStateToProps)(Dashboard);
export default requiresLogin()(connect(mapStateToProps)(Dashboard));
