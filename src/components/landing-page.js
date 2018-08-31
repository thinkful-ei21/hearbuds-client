import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
require('./landing-page.css');

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
            return <Redirect to={"/peek/"+this.state.zipcode} />
        }

        let imgSrc = `https://s3.amazonaws.com/fasfawefaf/yvette-de-wit-118721-unsplash.jpg`;

        return (
            <div className="landing-page">
                <img src={imgSrc} alt="background" className="background-image" />
                {this.state.redirect}
                <h1 className="landing-title">HearBuds</h1>
                <p className="landing-page-text">
                    We're revolutionizing the concert going experience. Find out who's going or someone to go with. 
                </p>
                <input ref={input => this.input = input} className="zipcode-search-box" type="text" placeholder="zipcode"></input>
                <button type="submit" className="zipcode-search-button" onClick={(e) => this.seeEventList(e)}>Go</button>
            </div>
        );
    }
    
    
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser != null
});

export default connect(mapStateToProps)(LandingPage);