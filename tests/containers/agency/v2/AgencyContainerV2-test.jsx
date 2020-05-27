/**
 * AgencyContainer-test.jsx
 * Created by Kevin Li 6/15/17
 */

import React from 'react';
import { shallow } from 'enzyme';

import { AgencyProfileV2 } from 'containers/agency/v2/AgencyContainerV2';

const defaultProps = {
    params: { agencyId: '123' },
    agencyOverview: {
        name: 'test'
    }
};

describe('AgencyContainer', () => {
    it('should make an API call for the selected agency on mount', () => {
        const component = shallow(<AgencyProfileV2 {...defaultProps} />);
        expect(component.exists()).toBe(true);
    });
});
