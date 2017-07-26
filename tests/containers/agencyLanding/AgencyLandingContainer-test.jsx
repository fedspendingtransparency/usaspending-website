/**
 * AgencyLandingContainer-test.jsx
 * Created by Lizzie Salita 7/18/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Immutable from 'immutable';
import { Agency } from 'redux/reducers/agencyLanding/agencyLandingReducer';

import { AgencyLandingContainer } from
    'containers/agencyLanding/AgencyLandingContainer';
import { AgencyLandingSearchBarContainer } from
    'containers/agencyLanding/AgencyLandingSearchBarContainer';
import AgencyLandingResultsSection from
    'components/agencyLanding/AgencyLandingResultsSection';


import { mockComponent, unmockComponent } from '../../testResources/mockComponent';
import { mockData, mockMeta, mockAgenciesOrder } from './mockToptierAgencies';

jest.mock('helpers/agencyLandingHelper', () => require('./agencyLandingHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// spy on specific functions inside the component
const fetchAgenciesSpy = sinon.spy(AgencyLandingContainer.prototype, 'fetchAgencies');

describe('AgencyLandingContainer', () => {
    beforeAll(() => {
        mockComponent(AgencyLandingResultsSection);
        mockComponent(AgencyLandingSearchBarContainer);
    });

    const mockRedux = {
        agencies: new Immutable.OrderedSet([]),
        agenciesOrder: mockAgenciesOrder,
        meta: mockMeta,
        autocompleteAgencies: []
    };

    const props = {
        agencies: new Immutable.OrderedSet([]),
        agenciesOrder: mockAgenciesOrder,
        meta: mockMeta,
        autocompleteAgencies: []
    };

    it('should make an API request on mount', async () => {
        // mount the container
        const container =
            shallow(<AgencyLandingContainer agencyLanding={mockRedux} {...props} />);

        // componentDidMount doesn't get called automatically with shallow
        container.instance().showColumns();

        await container.instance().agenciesRequest.promise;

        expect(fetchAgenciesSpy.callCount).toEqual(1);

        // reset the spy
        fetchAgenciesSpy.reset();
    });

    describe('showColumns', () => {
        it('should build the table on mount', async () => {
            // mount the container
            const container =
                shallow(<AgencyLandingContainer agencyLanding={mockRedux} {...props} />);

            container.instance().showColumns();

            await container.instance().agenciesRequest.promise;

            // validate the state contains the correctly parsed values
            const expectedState = {
                columns: [
                    {
                        columnName: "agency_name",
                        defaultDirection: "desc",
                        displayName: "Agency Name",
                        width: 0.35
                    },
                    {
                        columnName: "budget_authority_amount",
                        defaultDirection: "desc",
                        displayName: "Budget Authority",
                        width: 0.3
                    },
                    {
                        columnName: "percentage_of_total_budget_authority",
                        defaultDirection: "desc",
                        displayName: "Percent of Total U.S. Budget",
                        width: 0.35
                    }
                ],
                inFlight: false,
                currentFY: '',
                agencySearchString: '',
                autocompleteAgencies: [],
                noResults: false
            };

            expect(container.state()).toEqual(expectedState);
        });
    });

    describe('parseAgencies', () => {
        it('should parse the API response and overwrite the Redux agencies', (done) => {
            const expected = new Immutable.OrderedSet([
                new Agency({
                    agency_id: 1,
                    agency_name: <a href="/#/agency/1">Test 1</a>,
                    budget_authority_amount: "$1,234,567",
                    percentage_of_total_budget_authority: "0.01%"
                }),
                new Agency({
                    agency_id: 2,
                    agency_name: <a href="/#/agency/2">Test 2</a>,
                    budget_authority_amount: "$2,345,678",
                    percentage_of_total_budget_authority: "0.02%"
                })
            ]);
            delete expected._jsid;

            const reduxAction = jest.fn((args) => {
                const model = Object.assign({}, new Immutable.OrderedSet(args));
                delete model._jsid;

                expect(model).toEqual(expected);
                done();
            });

            // mount the container
            const container =
                shallow(<AgencyLandingContainer agencyLanding={mockRedux} {...props} setAgencies={reduxAction} />);

            container.instance().parseAgencies(mockData);
        });
    });

    afterAll(() => {
        // restore the mocked component's lifecycle functions
        unmockComponent(AgencyLandingResultsSection);
        unmockComponent(AgencyLandingSearchBarContainer);
    });
});
