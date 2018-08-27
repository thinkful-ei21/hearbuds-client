import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Link} from 'react-router-dom';
import './nav.css';
import HamburgerMenu from './hamburger-menu';

export class Nav extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        let editProfileLink;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
            editProfileLink = (
                <Link to="/edit">Edit Profile</Link>
            )
        }
        return (
            <React.Fragment>

                <Link to="/dashboard" className="logo-button"><h1>Hearbuds</h1></Link>

                <HamburgerMenu />
                {logOutButton}
                {editProfileLink}

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Nav);
