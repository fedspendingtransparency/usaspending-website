/**
 * KeywordContainer-test.jsx
 * Created by Lizzie Salita 1/10/18
 */

import React from 'react';
import { shallow } from 'enzyme';

import { KeywordContainer } from 'containers/keyword/KeywordContainer';

import { mockRedux, mockSummary, mockActions } from './mockResults';

jest.mock('helpers/keywordHelper', () => require('./keywordHelper'));
jest.mock('helpers/bulkDownloadHelper', () => require('../bulkDownload/mockBulkDownloadHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/keyword/KeywordPage', () =>
    jest.fn(() => null));

describe('KeywordContainer', () => {
    describe('updateKeyword', () => {
        it('should set the keyword state', () => {
            const container = shallow(<KeywordContainer
                {...mockRedux}
                {...mockActions} />);

            container.instance().updateKeyword('blah blah');

            expect(container.state().keyword).toEqual('blah blah');
        });
    });

    describe('fetchSummary', () => {
        it('should set the summary state', async () => {
            const container = shallow(<KeywordContainer
                {...mockRedux}
                {...mockActions} />);

            const expectedState = {
                primeCount: 111111,
                primeAmount: 222222.22
            };

            expect(container.state().summary).toBeFalsy();

            container.instance().fetchSummary();
            await container.instance().summaryRequest.promise;

            expect(container.state().summary).toEqual(expectedState);
        });
    });

    describe('startDownload', () => {
        it('should make an API call with the given keyword filter', () => {
            const container = shallow(<KeywordContainer
                {...mockActions}
                {...mockRedux} />);

            container.setState({
                keyword: 'test'
            });

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            const expectedParams = {
                award_levels: ['prime_awards'],
                filters: {
                    keyword: 'test'
                },
                file_format: 'csv'
            };

            container.instance().startDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, "awards");
        });
    });

    describe('requestDownload', () => {
        it('should set the expected file and url', async () => {
            const container = shallow(<KeywordContainer
                {...mockActions}
                {...mockRedux} />);

            container.setState({
                keyword: 'test'
            });

            container.instance().requestDownload();
            await container.instance().downloadRequest.promise;

            expect(mockActions.setDownloadExpectedFile).toHaveBeenCalledWith('mock_file.zip');
            expect(mockActions.setDownloadExpectedUrl).toHaveBeenCalledWith('mockurl/mock_file.zip');

            //expect(container.props().expectedUrl).toEqual('mockurl/mock_file.zip');
            //expect(container.props().expectedFile).toEqual('mock_file.zip');
        });
    });
});
