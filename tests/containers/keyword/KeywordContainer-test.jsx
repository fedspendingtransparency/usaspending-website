/**
 * KeywordContainer-test.jsx
 * Created by Lizzie Salita 1/10/18
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Set } from 'immutable';
import KeywordContainer from 'containers/keyword/KeywordContainer';

import { mockApi, mockSummary, mockTabCount } from './mockResults';

jest.mock('helpers/keywordHelper', () => require('./keywordHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/keyword/KeywordPage', () =>
    jest.fn(() => null));

// canvas elements are not available in Jest, so mock the text measurement helper
jest.mock('helpers/textMeasurement', () => (
{
    measureText: jest.fn(() => 100),
    measureTableHeader: jest.fn(() => 220)
}
));

describe('KeywordContainer', () => {
    describe('updateKeyword', () => {
        it('should set the keyword state', () => {
            const container = shallow(<KeywordContainer />);

            container.instance().updateKeyword('blah blah');

            expect(container.state().keyword).toEqual('blah blah');
        });
    });

    describe('fetchSummary', () => {
        it('should set the summary state', async () => {
            const container = shallow(<KeywordContainer />);

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
});
