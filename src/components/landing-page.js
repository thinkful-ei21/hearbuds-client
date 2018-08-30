import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';


export class LandingPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {  
            redirect: false,
            zipcode: null
        }
    }
    
    seeEventList(e) {
        e.preventDefault();
        const zipcode = this.input.value;
        console.log("zipcode" , zipcode)
        return this.setState({
            redirect: true,
            zipcode
        })  
    }

    render() {

        if (this.props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }
        
        if (this.state.redirect) {
            return <Redirect to={"/"+this.state.zipcode} />
        }

        return (
            <div className="landing-page">
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

export default withRouter(connect(mapStateToProps)(LandingPage));