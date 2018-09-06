import React from 'react';
import { shallow, mount } from 'enzyme';
import { Comments } from './comments';

describe('<Comments />', function() {
    it('renders without crashing', () => {
        shallow(<Comments />)
    });
});