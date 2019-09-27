/**
 * FederalAccountTableContainer-test.jsx
 * Created by Lizzie Salita 3/6/18
 */

import React from 'react';
import { shallow } from 'enzyme';

import { FederalAccountTableContainer } from
    'containers/awardV2/table/FederalAccountTableContainer';

import { mockFederalAccountFunding } from '../../../models/awardsV2/mockAwardApi';

import BaseFederalAccountFunding from 'models/v2/awardsV2/BaseFederalAccountFunding';

// mock the IDV helper
jest.mock('helpers/idvHelper', () => require('../idv/mockIdvHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/awardv2/table/FederalAccountTable', () =>
    jest.fn(() => null));

const mockRedux = {
    award: {
        id: '2342342',
        category: 'idv',
        overview: {
            generatedId: '2342342'
        }
    }
};

describe('FederalAccountTableContainer', () => {
    it('should make an API call for federal account funding data on mount', async () => {
        const container = shallow(<FederalAccountTableContainer
            {...mockRedux} />);

        const fetchSubmissions = jest.fn();
        container.instance().fetchSubmissions = fetchSubmissions;
        await container.instance().componentDidMount();

        expect(fetchSubmissions).toHaveBeenCalledTimes(1);
        expect(fetchSubmissions).toHaveBeenCalledWith(1, true);
    });

    describe('parseFundingData', () => {
        it('should parse the API response into BaseFederalAccountFunding objects for idv awards', () => {
            const container = shallow(<FederalAccountTableContainer
                {...mockRedux} />);

            container.instance().parseFundingData(mockFederalAccountFunding, true);

            const expectedResult = Object.create(BaseFederalAccountFunding);
            expectedResult.populate(mockFederalAccountFunding.results[0]);
            const actualResult = container.state().fundingResults[0];

            expect(container.state().fundingResults.length).toEqual(1);
            expect(actualResult).toEqual(expectedResult);
        });
        it('should append results to the existing list when reset is false', () => {
            const container = shallow(<FederalAccountTableContainer
                {...mockRedux} />);

            container.setState({
                fundingResults: ["mock item"]
            });

            container.instance().parseFundingData(mockFederalAccountFunding, false);
            expect(container.state().fundingResults.length).toEqual(2);
        });
    });

    describe('nextPage', () => {
        it('should load the next page of data when available', () => {
            const container = shallow(<FederalAccountTableContainer
                {...mockRedux} />);

            container.setState({
                nextPage: true,
                inFlight: false,
                page: 1
            });
            container.instance().fetchSubmissions = jest.fn();

            container.instance().nextPage();

            expect(container.instance().fetchSubmissions).toHaveBeenCalledTimes(1);
            expect(container.instance().fetchSubmissions).toHaveBeenCalledWith(2, false);
        });

        it('should not load more data when it is on the last page', () => {
            const container = shallow(<FederalAccountTableContainer
                {...mockRedux} />);

            container.setState({
                nextPage: false,
                inFlight: false,
                page: 2
            });
            container.instance().fetchSubmissions = jest.fn();

            container.instance().nextPage();

            expect(container.instance().fetchSubmissions).toHaveBeenCalledTimes(0);
        });

        it('should not load more data when it there are existing requests in flight', () => {
            const container = shallow(<FederalAccountTableContainer
                {...mockRedux} />);

            container.setState({
                nextPage: false,
                inFlight: true,
                page: 2
            });
            container.instance().fetchSubmissions = jest.fn();

            container.instance().nextPage();

            expect(container.instance().fetchSubmissions).toHaveBeenCalledTimes(0);
        });
    });

    describe('changeSort', () => {
        it('should update the state to the new sort values', () => {
            const container = shallow(<FederalAccountTableContainer
                {...mockRedux} />);

            container.instance().fetchSubmissions = jest.fn();

            container.instance().changeSort({
                field: 'test',
                direction: 'asc'
            });

            expect(container.state().sort).toEqual({
                field: 'test',
                direction: 'asc'
            });
        });

        it('it should make an API request for the first page, resetting existing data', () => {
            const container = shallow(<FederalAccountTableContainer
                {...mockRedux} />);

            container.instance().fetchSubmissions = jest.fn();

            container.instance().changeSort({
                field: 'test',
                direction: 'asc'
            });

            expect(container.instance().fetchSubmissions).toHaveBeenCalledTimes(1);
            expect(container.instance().fetchSubmissions).toHaveBeenCalledWith(1, true);
        });
    });
});
