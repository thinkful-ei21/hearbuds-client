import React from 'react';
import {Link} from 'react-router-dom';

import EditForm from './edit-form';

export function EditPage(props) {
    return (
        <div className="home">
            <h2>Update Your Information</h2>
            <EditForm />
            <Link to="/dashboard">Cancel</Link>
        </div>
    );
}

export default EditPage;