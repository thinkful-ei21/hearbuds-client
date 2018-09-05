import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import EventList from './event-list';
import './dashboard.css';
import SortBy from './sort-by';


export class Dashboard extends React.Component {


    render() {

        if (!this.props.match.params.zipcode) {
            return <Redirect to="/" />;
        }

        let greeting;
        if(this.props.username) {
            greeting = <h2>Welcome back, {this.props.username.username}!</h2>
        } else {
            greeting = <h2>Welcome!</h2>
        }
        return (
            <div>
                {greeting}
                <SortBy />
                <EventList zipcode={this.props.match.params.zipcode}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.currentUser
    };
};

export default connect(mapStateToProps)(Dashboard);

