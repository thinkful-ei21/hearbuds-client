import React from 'react';
import { shallow } from 'enzyme';

import { EditPage } from './edit-page';

describe(<EditPage />, () => {
    it('renders without crashing', () => {
        shallow(<EditPage />);
    });
});