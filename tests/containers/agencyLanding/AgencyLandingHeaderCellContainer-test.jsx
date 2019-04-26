/**
 * AgencyLandingHeaderCellContainer-test.jsx
 * Created by Emily Gullo 09/22/2017
 */

import React from 'react';
import { shallow } from 'enzyme';

import { AgencyLandingHeaderCellContainer } from
    'containers/agencyLanding/table/AgencyLandingHeaderCellContainer';

import { mockAgenciesOrder } from './agencyLandingHelper';

const setupShallow = (props) => shallow(<AgencyLandingHeaderCellContainer {...props} />);

describe('AgencyLandingContainer', () => {
    describe('setAgenciesOrder', () => {
        it('should set agency sort order to redux', () => {
            const container = setupShallow({
                order: mockAgenciesOrder,
                setAgenciesOrder: jest.fn()
            });

            // mount the container
            container.instance().setAgenciesOrder('agency_name', 'desc');
            expect(container.instance().props.setAgenciesOrder).toBeCalled();
            expect(container.instance().props.setAgenciesOrder).toBeCalledWith({
                direction: 'desc',
                field: 'agency_name'
            });
        });
    });
});
