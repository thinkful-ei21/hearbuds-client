import React from 'react';
import { API_BASE_URL } from '../config'

export default class User extends React.Component {
	constructor(props) {
		super(props);
	}
	handleClick() {
		console.log('clicked');
		fetch(`${API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            // pass in the query to graphql
            // query: `{ getById(id: ${eventId}) { id name type}}`
            query: `{getUser(id: "5b806a236775ee3fdec712c0") {username} }`
        })
    })
	}

	render() {
		return (
			<button onClick={e => this.handleClick(e)}>click me</button>
		)
	}
}