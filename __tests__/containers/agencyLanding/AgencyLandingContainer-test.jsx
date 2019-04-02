/**
 * AgencyLandingContainer-test.jsx
 * Created by Lizzie Salita 7/18/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { AgencyLandingContainer } from
    'containers/agencyLanding/AgencyLandingContainer';
import AgencyLandingContent from
    'components/agencyLanding/AgencyLandingContent';


import { mockComponent, unmockComponent } from '../../testResources/mockComponent';
import { mockData, mockPopulated, mockAgenciesOrder } from './mockToptierAgencies';

jest.mock('helpers/agencyLandingHelper', () => require('./agencyLandingHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => shallow(<AgencyLandingContainer {...props} />);
const setupMount = (props) => mount(<AgencyLandingContainer {...props} />);

// spy on specific functions inside the component
const fetchAgenciesSpy = sinon.spy(AgencyLandingContainer.prototype, 'fetchAgencies');
const parseAgenciesSpy = sinon.spy(AgencyLandingContainer.prototype, 'parseAgencies');
const performSearchSpy = sinon.spy(AgencyLandingContainer.prototype, 'performSearch');

describe('AgencyLandingContainer', () => {
    beforeAll(() => {
        mockComponent(AgencyLandingContent);
    });

    it('should make an API request on mount', async () => {
        // mount the container
        const container = setupMount({
            agenciesOrder: mockAgenciesOrder
        });

        await container.instance().agenciesRequest.promise;

        expect(fetchAgenciesSpy.callCount).toEqual(1);
        expect(parseAgenciesSpy.callCount).toEqual(1);

        // reset the spy
        fetchAgenciesSpy.reset();
        parseAgenciesSpy.reset();
        performSearchSpy.reset();
    });

    it('should perform a local search when the sort order changes', async () => {
        // mount the container
        const container = setupMount({
            agenciesOrder: mockAgenciesOrder
        });

        await container.instance().agenciesRequest.promise;

        expect(performSearchSpy.callCount).toEqual(1);

        // change the sort order
        container.setProps({
            agenciesOrder: {
                sort: 'budget_authority_amount',
                direction: 'asc'
            }
        });

        await container.instance().agenciesRequest.promise;

        expect(performSearchSpy.callCount).toEqual(2);
    });

    describe('showColumns', () => {
        it('should build the table', async () => {
            // mount the container
            const container = setup({
                agenciesOrder: mockAgenciesOrder
            });
            container.instance().showColumns();

            await container.instance().agenciesRequest.promise;

            // validate the state contains the correctly parsed values
            const expectedState = [
                {
                    columnName: "agency_name",
                    defaultDirection: "asc",
                    displayName: "Agency Name"
                },
                {
                    columnName: "budget_authority_amount",
                    defaultDirection: "desc",
                    displayName: "Budgetary Resources"
                },
                {
                    columnName: "percentage_of_total_budget_authority",
                    defaultDirection: "desc",
                    displayName: "Percent of Total"
                }
            ];

            expect(container.state().columns).toEqual(expectedState);
        });
    });

    describe('parseAgencies', () => {
        it('should parse the API response and update the container state', () => {
            const container = setup({
                agenciesOrder: mockAgenciesOrder
            });

            // mount the container
            container.instance().parseAgencies(mockData);
            expect(container.state().fullData).toEqual(mockPopulated);
        });
    });

    afterAll(() => {
        // restore the mocked component's lifecycle functions
        unmockComponent(AgencyLandingContent);
    });
});
