import React from 'react';
import { shallow } from 'enzyme';
import { Comments } from './comments';

describe('<Comments />', function() {
    it('renders without crashing', () => {
        shallow(<Comments />)
    });
});