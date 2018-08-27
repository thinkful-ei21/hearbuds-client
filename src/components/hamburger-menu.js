import React from 'react';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class HamburgerMenu extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render(){
        let logOutButton;
        let editProfileLink;

        // only render the buttons if logged in
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
            editProfileLink = (
                <Link to="/edit">Edit Profile</Link>
            )
        }

        return (
            <div className="toggle">

                <div className="menu"></div>
                <div className="menu"></div>
                <div className="menu"></div>

                {logOutButton}
                {editProfileLink}
            </div>
        );
    }
}

const mapStateToprops = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToprops)(HamburgerMenu);