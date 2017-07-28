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

const setup = (props) => shallow(<AgencyLandingContainer {...props} />);

// spy on specific functions inside the component
const fetchAgenciesSpy = sinon.spy(AgencyLandingContainer.prototype, 'fetchAgencies');
const parseAgenciesSpy = sinon.spy(AgencyLandingContainer.prototype, 'parseAgencies');

describe('AgencyLandingContainer', () => {
    beforeAll(() => {
        mockComponent(AgencyLandingResultsSection);
        mockComponent(AgencyLandingSearchBarContainer);
    });

    it('should make an API request on mount', async () => {
        // mount the container
        const container = setup({
            agencies: new Immutable.OrderedSet([]),
            agenciesOrder: mockAgenciesOrder,
            meta: mockMeta,
            autocompleteAgencies: []
        });

        // componentDidMount doesn't get called automatically with shallow
        container.instance().showColumns();

        await container.instance().agenciesRequest.promise;

        expect(fetchAgenciesSpy.callCount).toEqual(1);
        expect(parseAgenciesSpy.callCount).toEqual(1);

        // reset the spy
        fetchAgenciesSpy.reset();
        parseAgenciesSpy.reset();
    });

    it('should make an API requeset when the sort order changes', async () => {

    });

    describe('showColumns', () => {
        it('should build the table', async () => {
            // mount the container
            const container = setup({
                agencies: new Immutable.OrderedSet([]),
                agenciesOrder: mockAgenciesOrder,
                meta: mockMeta,
                autocompleteAgencies: []
            });
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
                    percentage_of_total_budget_authority: "1.21%"
                }),
                new Agency({
                    agency_id: 2,
                    agency_name: <a href="/#/agency/2">Test 2</a>,
                    budget_authority_amount: "$2,345,678",
                    percentage_of_total_budget_authority: "2.32%"
                })
            ]);
            delete expected._jsid;

            const reduxAction = jest.fn((args) => {
                const model = Object.assign({}, new Immutable.OrderedSet(args));
                delete model._jsid;

                expect(model).toEqual(expected);
                done();
            });

            const container = setup({
                agencies: new Immutable.OrderedSet([]),
                agenciesOrder: mockAgenciesOrder,
                meta: mockMeta,
                autocompleteAgencies: [],
                setAgencies: reduxAction
            });
            // mount the container

            container.instance().parseAgencies(mockData);
        });
    });

    afterAll(() => {
        // restore the mocked component's lifecycle functions
        unmockComponent(AgencyLandingResultsSection);
        unmockComponent(AgencyLandingSearchBarContainer);
    });
});
