import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class Comments extends React.Component {

    render() {
        return (
            <h3>Comments</h3>
        )
    }
}

const mapStateToProps = state => {
    return {
        // some comments will come form state
    };
}

export default requiresLogin()(connect(mapStateToProps)(Comments));