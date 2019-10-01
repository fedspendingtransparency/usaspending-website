/**
 * AwardDataArchiveContainer-test.jsx
 * Created by Lizzie Salita 12/18/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { List } from 'immutable';
import sinon from 'sinon';
import moment from 'moment';

// mock the bulkDownload helper
jest.mock('helpers/bulkDownloadHelper', () => require('../mockBulkDownloadHelper'));

import AwardDataArchiveContainer from 'containers/bulkDownload/archive/AwardDataArchiveContainer';
import { mockAgencies, mockArchiveResponse } from '../mockData';
import { currentFiscalYear } from '../../../../src/js/helpers/fiscalYearHelper';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/bulkDownload/archive/AwardDataArchiveContent', () => jest.fn(() => null));

// spy on specific functions inside the component
const setAgencyListSpy = sinon.spy(AwardDataArchiveContainer.prototype, 'setAgencyList');
const requestResultsSpy = sinon.spy(AwardDataArchiveContainer.prototype, 'requestResults');

const defaultFilterState = {
    agency: {
        id: 'all',
        name: 'All'
    },
    type: {
        name: 'contracts',
        display: 'Contracts'
    },
    fy: '2019'
};

describe('AwardDataArchiveContainer', () => {
    it('should make an API call for the agencies on mount', async () => {
        const container = mount(<AwardDataArchiveContainer/>);

        await container.instance().agencyListRequest.promise;

        expect(setAgencyListSpy.callCount).toEqual(1);

        setAgencyListSpy.reset();
        requestResultsSpy.reset();
    });
    it('should make an API call with the default parameters on mount', async () => {
        const container = mount(<AwardDataArchiveContainer/>);

        await container.instance().resultsRequest.promise;

        expect(requestResultsSpy.callCount).toEqual(1);

        setAgencyListSpy.reset();
        requestResultsSpy.reset();
    });
    describe('setAgencyList', () => {
        it('should parse the agencies and update the state', async () => {
            const container = mount(<AwardDataArchiveContainer/>);

            await container.instance().agencyListRequest.promise;

            expect(container.state().agencies.cfoAgencies).toEqual(mockAgencies.cfo_agencies);
            expect(container.state().agencies.otherAgencies).toEqual(mockAgencies.other_agencies);
        });
    });
    describe('updateFilter', () => {
        it('should update the state for the specified filter', async () => {
            const container = mount(<AwardDataArchiveContainer />);

            const expectedFilterState = {
                ...defaultFilterState,
                type: {
                    name: 'mockType',
                    display: 'Mock Type'
                }
            };

            await container.instance().setState({ filters: defaultFilterState });

            container.instance().updateFilter('type', {
                name: 'mockType',
                display: 'Mock Type'
            });

            expect(container.state().filters).toEqual(expectedFilterState);
        });
    });
    describe('parseResults', () => {
        it('should parse the results and update the state', () => {
            const container = mount(<AwardDataArchiveContainer/>);

            const formattedResults = [
                {
                    agency: "Mock Agency 1 (ABC)",
                    fileName: "mockFile1.zip",
                    url: "http://mockFile_full.zip",
                    fy: "FY 1988",
                    date: "12/12/1987"
                },
                {
                    agency: "Mock Agency 2 (DEF)",
                    fileName: "mockFile2.zip",
                    url: "http://mockFile_delta.zip",
                    fy: "FY 1988",
                    date: "12/18/1987"
                }
            ];

            container.instance().parseResults(mockArchiveResponse.monthly_files);

            expect(container.state().results).toEqual(formattedResults);
        });
    });
});
