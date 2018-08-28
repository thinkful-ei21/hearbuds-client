import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Link} from 'react-router-dom';
import './nav.css';
import { stack as Menu } from 'react-burger-menu';
import HamburgerMenu from './hamburger-menu';

export class Nav extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        let logOutButton;
        let editProfileButton;
        let loginButton;
        let registerButton;

        if (this.props.loggedIn){
            logOutButton = (
                <a onClick={() => this.logOut()}>Log out</a>
            );
            editProfileButton = (
                <Link to="/edit">Edit Profile</Link>
            );
        }
        // display these links only when not logged in
        if (!this.props.loggedIn){
            loginButton = (
            <Link to="/">Sign in</Link>
            );
            registerButton = (
                <Link to="/register">Register</Link>
            )

        }
        return (
            <nav>
                <Link to="/dashboard" className="logo-button"><h1>Hearbuds</h1></Link>

                <Menu right width={'100%'} isOpen={ false } noOverlay>
                        

                    {/* <a onClick={this.logOut()}>Logout</a> */}
                    {loginButton}
                    {registerButton}
                    {editProfileButton}
                    {logOutButton}
                </Menu>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Nav);
