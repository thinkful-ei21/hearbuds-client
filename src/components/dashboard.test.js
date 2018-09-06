import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './dashboard';

describe(<Dashboard />, () => {
    it('render without crashing', () => {
        const match = {
            params: {
                zipcode: '90210'
            }
        }
        shallow(<Dashboard match={match}/>);
    });
})