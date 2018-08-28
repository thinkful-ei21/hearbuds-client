import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

export function LandingPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    
    return (
        <div className="landing-page">
            <p>
            We're revolutionizing the concert going experience!  
            HearBuds helps you find cool shows and meet fun people
             with similar musical taste. Find out what's happening 
             in your area by entering your zip code below. 
            </p>
            <input className="zipcode-search-box" type="text" placeholder="zipcode"></input>
            <button type="submit" className="zipcode-search-button">Search</button>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser != null
});

export default connect(mapStateToProps)(LandingPage)