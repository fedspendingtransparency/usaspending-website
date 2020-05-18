/**
 * AgencyContainer-test.jsx
 * Created by Kevin Li 6/15/17
 */

import React from 'react';
import { shallow } from 'enzyme';

import { AgencyProfileV2 } from 'containers/agency/AgencyContainerV2';

describe('AgencyContainer', () => {
    it('should make an API call for the selected agency on mount', () => {
        const component = shallow(<AgencyProfileV2 params={{ agencyId: '123' }} />);
        expect(component.exists()).toBe(true);
    });
});
