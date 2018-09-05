import React from 'react';
import {connect} from 'react-redux';
import './sort-by.css';
import {sortByPop} from '../actions/sort-by';


export class SortBy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: null
        }
    }

    toggleDropdown() {
        if (this.state.show) {
            this.setState({
                show: null
            })
        } else if (!this.state.show) {
            this.setState({
                show: "show"
            })
        }
    }

    popularSort() {
        console.log("sort by pop dispatched");
        this.props.dispatch(sortByPop())
        this.setState({
            show: null
        })
    }

    distanceSort() {

    }

    render() {
        if (this.state.show) {

        }
        return (
            <div className="dropdown">
                <button onClick={() => this.toggleDropdown()}>Sort Results</button>
                <div id="dropdown" className={"dropdown-content " + this.state.show}>
                    <a onClick={() => this.popularSort()}>Popularity</a>
                    <a onClick={() => this.distanceSort()}>Distance</a>    
                </div>
            </div>
        );
    }  
}

const mapStateToProps = state => ({
   
});

export default connect(mapStateToProps)(SortBy);