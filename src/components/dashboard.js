import React from 'react';
import {connect} from 'react-redux';
// import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import EventList from './event-list';


export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
            <div className="dashboard">
                <h2>Welcome {this.props.username}!</h2>
            <EventList />
            
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        protectedData: state.protectedData.data
    };
};

export default connect(mapStateToProps)(Dashboard);
// export default requiresLogin()(connect(mapStateToProps)(Dashboard));
