/**
 * KeywordContainer-test.jsx
 * Created by Lizzie Salita 1/10/18
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { KeywordContainer } from 'containers/keyword/KeywordContainer';

import { mockRedux, mockSummary, mockActions } from './mockResults';
import Router from './mockRouter';

jest.mock('helpers/keywordHelper', () => require('./keywordHelper'));
jest.mock('helpers/bulkDownloadHelper', () => require('../bulkDownload/mockBulkDownloadHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/keyword/KeywordPage', () => jest.fn(() => null));
jest.mock('containers/router/Router', () => require('./mockRouter'));

describe('KeywordContainer', () => {
    describe('updateKeyword', () => {
        it('should set the keyword state', () => {
            const container = shallow(<KeywordContainer
                {...mockRedux}
                {...mockActions} />);

            container.instance().updateKeyword('blah blah');

            expect(container.state().keyword).toEqual('blah blah');
        });
        it('should update the page url', () => {
            const container = shallow(<KeywordContainer
                {...mockRedux}
                {...mockActions} />);

            container.instance().updateKeyword('blah blah');

            expect(Router.history.replace).toHaveBeenLastCalledWith('/keyword_search/blah%20blah');
        });
    });

    describe('handleInitialUrl', ()=> {
       it('should update the state if there is a keyword in the url', () => {
           const modifiedRedux = Object.assign({}, mockRedux, {
              params: {
                  keyword: 'test'
              }
           });
           const container = mount(<KeywordContainer
               {...modifiedRedux}
               {...mockActions} />);

           expect(container.state().keyword).toEqual('test');
       });
       it('should not update the state if the keyword is less than three characters', () => {
           const modifiedRedux = Object.assign({}, mockRedux, {
               params: {
                   keyword: 'hi'
               }
           });
           const container = mount(<KeywordContainer
               {...modifiedRedux}
               {...mockActions} />);

           expect(container.state().keyword).toEqual('');
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
                }
            };

            container.instance().startDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams);
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
        });
    });
});
