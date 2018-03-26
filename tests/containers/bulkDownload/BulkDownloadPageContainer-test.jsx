/**
 * BulkDownloadPageContainer-test.jsx
 * Created by Lizzie Salita 11/6/17
 */

import React from 'react';
import { shallow } from 'enzyme';
import Router from './mockRouter';

// mock the bulkDownload helper
jest.mock('helpers/bulkDownloadHelper', () => require('./mockBulkDownloadHelper'));

import { BulkDownloadPageContainer } from 'containers/bulkDownload/BulkDownloadPageContainer';
import { mockActions, mockRedux } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/bulkDownload/BulkDownloadPage', () => jest.fn(() => null));
jest.mock('containers/router/Router', () => require('./mockRouter'));

describe('BulkDownloadPageContainer', () => {
    it('should make an API call when startDownload() is called', () => {
        const container = shallow(<BulkDownloadPageContainer
            {...mockRedux}
            {...mockActions} />);

        const expectedParams = {
            award_levels: ['prime_awards'],
            columns: [],
            file_format: 'csv',
            filters: {
                agency: '123',
                award_types: ['grants', 'loans'],
                recipient_locations: [
                    {
                        country: 'USA',
                        state: 'HI'
                    }
                ],
                date_range: {
                    end_date: '11-01-2017',
                    start_date: '11-01-2016'
                },
                date_type: 'action_date',
                sub_agency: 'Mock Sub-Agency'
            }
        };

        const requestDownload = jest.fn();
        container.instance().requestDownload = requestDownload;

        container.instance().startAwardDownload();

        expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'awards');
    });
    describe('validateDataType', () => {
        it('should default to custom award data if no type is provided', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...mockRedux}
                {...mockActions} />);

            container.instance().validateDataType('');

            expect(Router.history.replace).toHaveBeenLastCalledWith('/download_center/custom_award_data');
        });
        it('should update the Redux state for a valid data type', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...mockRedux}
                {...mockActions} />);

            container.instance().validateDataType('award_data_archive');

            expect(mockActions.setDataType).toHaveBeenCalledWith('award_data_archive');
        });
        it('should go to the error page for an invalid data type', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...mockRedux}
                {...mockActions} />);

            container.instance().validateDataType('test');

            expect(Router.history.replace).toHaveBeenLastCalledWith('/error');
        });
    });
});
