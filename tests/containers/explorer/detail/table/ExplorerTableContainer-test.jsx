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
const buildTableSpy = sinon.spy(ExplorerTableContainer.prototype, 'buildVirtualTable');

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

        // buildVirtualTable is called once on mount
        expect(buildTableSpy.callCount).toEqual(1);

        // change the sort order
        container.setProps({
            order: {
                sort: 'fake_field',
                direction: 'asc'
            }
        });

        expect(buildTableSpy.callCount).toEqual(2);
        buildTableSpy.reset();
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
        expect(buildTableSpy.callCount).toEqual(1);

        // change the page number
        container.setProps({
            pageNumber: 1
        });

        expect(buildTableSpy.callCount).toEqual(2);
        buildTableSpy.reset();
    });

    describe('buildVirtualTable', () => {
        it('should build the table', () => {
            // mount the container
            const container = setup({
                order: mockTable.order,
                pageNumber: mockTable.pageNumber,
                results: mockApiResponse.results,
                total: mockApiResponse.total
            });

            container.instance().buildVirtualTable();

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
        it('should parse the results and set a new page', () => {
            const container = setup({
                order: mockTable.order,
                pageNumber: 1,
                results: mockApiResponse.results,
                total: mockApiResponse.total
            });

            container.instance().buildVirtualTable();

            expect(container.state().pageOfItems).toEqual(mockParsedResults);
        });
        it('should set the number of total results', () => {
            const container = setup({
                order: mockTable.order,
                pageNumber: 1,
                results: mockApiResponse.results,
                total: mockApiResponse.total
            });

            container.instance().buildVirtualTable();

            expect(container.state().totalItems).toEqual(3);
        });
    });

    afterAll(() => {
        // restore the mocked component's lifecycle functions
        unmockComponent(ExplorerTable);
    });
});
