import React from 'react';
import { shallow } from 'enzyme';

import AddComment from './add-comment';

describe(<AddComment />, function() {
    it('renders without crashing', () => {
        shallow(<AddComment />);
    });

    
})