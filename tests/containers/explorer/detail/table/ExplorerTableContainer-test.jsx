/**
 * ExplorerTableContainer-test.jsx
 * Created by Lizzie Salita 10/17/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { ExplorerTableContainer } from
    'containers/explorer/detail/table/ExplorerTableContainer';
import ExplorerTable from
    'components/explorer/detail/visualization/table/ExplorerTable';


import { mockComponent, unmockComponent } from '../../../../testResources/mockComponent';
import { mockApiResponse, mockActions, mockTable, mockParsedResults, mockPager } from '../mockData';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => shallow(<ExplorerTableContainer {...props} />);
const setupMount = (props) => mount(<ExplorerTableContainer {...props} />);

// spy on specific functions inside the component
const setPageOfItemsSpy = sinon.spy(ExplorerTableContainer.prototype, 'setPageOfItems');
const getPagerSpy = sinon.spy(ExplorerTableContainer.prototype, 'getPager');

describe('ExplorerTableContainer', () => {
    beforeAll(() => {
        mockComponent(ExplorerTable);
    });

    it('should update the pagination when the sort order changes', () => {
        // mount the container
        const container = setupMount({
            order: mockTable.order,
            pageNumber: mockTable.pageNumber,
            results: mockApiResponse.results,
            total: mockApiResponse.total
        });

        // setPageOfItems is called once on mount
        expect(setPageOfItemsSpy.callCount).toEqual(1);

        // change the sort order
        container.setProps({
            order: {
                sort: 'fake_field',
                direction: 'asc'
            }
        });

        expect(setPageOfItemsSpy.callCount).toEqual(2);
        setPageOfItemsSpy.reset();
    });

    it('should update the pagination when the page number changes', () => {
        // mount the container
        const container = setupMount({
            order: mockTable.order,
            pageNumber: mockTable.pageNumber,
            results: mockApiResponse.results,
            total: mockApiResponse.total
        });

        // setPageOfItems is called once on mount
        expect(setPageOfItemsSpy.callCount).toEqual(1);

        // change the page number
        container.setProps({
            pageNumber: 1
        });

        expect(setPageOfItemsSpy.callCount).toEqual(2);
        setPageOfItemsSpy.reset();
    });

    describe('showColumns', () => {
        it('should build the table', () => {
            // mount the container
            const container = setup({
                order: mockTable.order,
                pageNumber: mockTable.pageNumber,
                results: mockApiResponse.results,
                total: mockApiResponse.total
            });

            container.instance().showColumns();

            // validate the state contains the correctly parsed values
            const expectedState = [
                {
                    columnName: "name",
                    defaultDirection: "asc",
                    displayName: "Name"
                },
                {
                    columnName: "obligated_amount",
                    defaultDirection: "desc",
                    displayName: "Obligated Amount"
                },
                {
                    columnName: "percent_of_total",
                    defaultDirection: "desc",
                    displayName: "Percent of Total"
                }
            ];

            expect(container.state().columns).toEqual(expectedState);
        });
    });

    describe('parseResults', () => {
        it('should parse the results and update the container state', () => {
            const container = setup({
                order: mockTable.order,
                pageNumber: mockTable.pageNumber,
                results: mockApiResponse.results,
                total: mockApiResponse.total
            });

            // validate the state contains the correctly parsed values
            container.instance().parseResults(mockApiResponse.results);

            expect(container.state().results).toEqual(mockParsedResults);
        });
    });

    describe('setPageOfItems', () => {
        it('should get the pager and a new page from the results and update the container state', () => {
            const container = setup({
                order: mockTable.order,
                pageNumber: 1,
                total: mockApiResponse.total
            });

            container.setState({
               results: mockParsedResults
            });

            container.instance().setPageOfItems();

            expect(container.state().pageOfItems).toEqual(mockParsedResults);
            expect(container.state().pager).toEqual(mockPager);
        });
    });

    afterAll(() => {
        // restore the mocked component's lifecycle functions
        unmockComponent(ExplorerTable);
    });
});
