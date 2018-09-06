import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Link, withRouter} from 'react-router-dom';
import './nav.css';
import { stack as Menu } from 'react-burger-menu';

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
        let logoButton;
        let dashboard;

        if (this.props.loggedIn){
            dashboard = (
                <Link to="/dashboard">Dashboard</Link>
            );
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
            editProfileButton = (
                <Link to="/edit">Edit Profile</Link>
            );
            logoButton = (
                <Link to="/dashboard" className="logo-button"><h1 id="brand-text">Hearbuds</h1></Link>
            )
        }
        // display these links only when not logged in
        if (!this.props.loggedIn){
            loginButton = (
                <Link to="/login"><span>Sign in</span></Link> 
            );
            registerButton = (
                <Link to="/register"><span>Register</span></Link>
            );
            logoButton = (
                <Link to="/" className="logo-button"><h1 id="brand-text">Hearbuds</h1></Link>
            )
        }

        return (
            <nav>
                {logoButton}

                <Menu right width={'100%'} isOpen={ false } noOverlay>                   

                    {/* <a onClick={this.logOut()}>Logout</a> */}
                    {loginButton}
                    {registerButton}
                    {dashboard}
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

export default withRouter(connect(mapStateToProps)(Nav));
