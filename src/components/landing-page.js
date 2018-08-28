import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {getUnprotectedEventList} from '../actions/event-list';

export class LandingPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {  
            redirect: null
        }
    }
    
    componentDidUpdate() {
        this.setState({
            redirect: null
        })
    }
    
    seeEventList(e) {
        e.preventDefault();
        const zipcode = this.input.value;
        this.props.dispatch(getUnprotectedEventList(zipcode));
        return this.setState({
            redirect: <Redirect to="/peek" />
        }) 
    }

    render() {

        if (this.props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="landing-page">
                {this.state.redirect}
                <p className="landing-page-text">
                    We're revolutionizing the concert going experience!  
                    HearBuds helps you find cool shows and meet fun people
                    with similar musical taste. Find out what's happening 
                    in your area by entering your zip code below. 
                </p>
                <input ref={input => this.input = input} className="zipcode-search-box" type="text" placeholder="zipcode"></input>
                <button type="submit" className="zipcode-search-button" onClick={(e) => this.seeEventList(e)}>Search</button>
            </div>
        );
    }
    
    
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser != null
});

export default connect(mapStateToProps)(LandingPage)