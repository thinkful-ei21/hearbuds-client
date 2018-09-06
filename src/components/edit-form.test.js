import React from 'react';
import { shallow } from 'enzyme';

import { EditForm } from './edit-form';

describe(<EditForm />, () => {
    it('renders without crashing', () => {
        shallow(<EditForm />)
    });
})