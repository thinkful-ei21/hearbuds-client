import React from 'react';
import {connect} from 'react-redux';
import EventListPeek from './event-list-peek';


export class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <h2>Welcome!</h2>
            <EventListPeek />
            
            </div>
        );
    }
}

const mapStateToProps = state => {
    // const {currentUser} = state.auth;
    // return {
    //     username: state.auth.currentUser.username,
    //     protectedData: state.protectedData.data
    // };
};

export default connect(mapStateToProps)(Dashboard);
// export default requiresLogin()(connect(mapStateToProps)(Dashboard));
