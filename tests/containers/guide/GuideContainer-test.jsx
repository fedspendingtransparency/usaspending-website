/**
 * GuideContainer-test.jsx
 * Created by Kevin Li 5/3/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { GuideContainer } from 'containers/guide/GuideContainer';
import * as GuideHelper from 'helpers/guideHelper';
import { Definition } from 'redux/reducers/guide/guideReducer';

import { mockActions, mockData, mockApi } from './mockGuide';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const fetchGuideListSpy = sinon.spy(GuideContainer.prototype, 'fetchGuideList');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/guide/AnimatedGuideWrapper', () =>
    jest.fn(() => null));

const mockGuideHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    GuideHelper[functionName] = jest.fn(() => {
        // Axios normally returns a promise, replicate this, but return the expected result
        const networkCall = new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (event === 'resolve') {
                    resolve({
                        data: expectedResponse
                    });
                }
                else {
                    reject({
                        data: expectedResponse
                    });
                }
            });
        });

        return {
            promise: networkCall,
            cancel: jest.fn()
        };
    });
};

const unmockGuideHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/guideHelper');
};

describe('GuideContainer', () => {
    it('should make an API call on mount', () => {
        mockGuideHelper('fetchAllTerms', 'resolve', mockApi);

        mount(<GuideContainer
            {...mockActions}
            guide={mockData} />);
        jest.runAllTicks();

        expect(fetchGuideListSpy.callCount).toEqual(1);
        fetchGuideListSpy.reset();
    });

    describe('parseTerms', () => {
        it('should parse the API response into an array of Definition objects', () => {
            mockGuideHelper('fetchAllTerms', 'resolve', mockApi);

            const mockedSetGuideResults = jest.fn();

            const swizzledActions = Object.assign({}, mockActions, {
                setGuideResults: mockedSetGuideResults
            });

            const container = shallow(<GuideContainer
                {...swizzledActions}
                guide={mockData} />);

            container.instance().parseTerms(mockApi);

            const expectedDefinition = new Definition({
                term: 'Test Term',
                slug: 'test-term',
                data_act_term: 'Test Terminology',
                plain: 'A test term',
                official: 'Terminology test'
            });

            expect(mockedSetGuideResults).toHaveBeenCalledTimes(1);
            expect(mockedSetGuideResults).toHaveBeenCalledWith([expectedDefinition]);
        });

        it('should run any queued operations prepared before the API call finished', () => {
            mockGuideHelper('fetchAllTerms', 'resolve', mockApi);
            const container = shallow(<GuideContainer
                {...mockActions}
                guide={mockData} />);

            const mockOperation = jest.fn();
            container.instance().queuedOperations = [mockOperation];
            expect(mockOperation).toHaveBeenCalledTimes(0);

            container.instance().parseTerms(mockApi);

            expect(mockOperation).toHaveBeenCalledTimes(1);
        });
    });

    describe('detectedUrlChange', () => {
        it('should queue any jump operations if the component is still loading', () => {
            mockGuideHelper('fetchAllTerms', 'resolve', mockApi);
            const container = shallow(<GuideContainer
                {...mockActions}
                guide={mockData} />);

            container.instance().setState({
                loading: true
            });

            // override the jumpToTerm class function
            const mockedJump = jest.fn();
            container.instance().jumpToTerm = mockedJump;

            // it should be queued, not called
            container.instance().detectedUrlChange('blerg');
            expect(mockedJump).toHaveBeenCalledTimes(0);

            container.instance().setState({
                loading: false
            });
            container.instance().parseTerms(mockApi);

            // once the API response has come back it can be called
            expect(mockedJump).toHaveBeenCalledTimes(1);
        });

        it('should trigger jumpToTerm if the data has already loaded', () => {
            mockGuideHelper('fetchAllTerms', 'resolve', mockApi);
            const container = shallow(<GuideContainer
                {...mockActions}
                guide={mockData} />);

            container.instance().setState({
                loading: false
            });

            // override the jumpToTerm class function
            const mockedJump = jest.fn();
            container.instance().jumpToTerm = mockedJump;

            // it should be queued, not called
            container.instance().detectedUrlChange('blerg');
            expect(mockedJump).toHaveBeenCalledTimes(1);
        });
    });

    describe('jumpToTerm', () => {
        it('should show the guide and load the specified term when a term with a matching slug exists', () => {
            mockGuideHelper('fetchAllTerms', 'resolve', mockApi);

            const mockShowGuide = jest.fn();
            const mockSetGuide = jest.fn();

            const swizzledActions = Object.assign({}, mockActions, {
                setGuideTerm: mockSetGuide,
                showGuide: mockShowGuide
            });

            const container = shallow(<GuideContainer
                {...swizzledActions}
                guide={mockData} />);

            container.instance().jumpToTerm('test-term');

            expect(mockSetGuide).toHaveBeenCalledTimes(1);
            expect(mockSetGuide).toHaveBeenCalledWith(mockData.search.results[0]);
            expect(mockShowGuide).toHaveBeenCalledTimes(1);
        });
        it('should do nothing when no terms with matching slugs exist', () => {
            mockGuideHelper('fetchAllTerms', 'resolve', mockApi);

            const mockShowGuide = jest.fn();
            const mockSetGuide = jest.fn();

            const swizzledActions = Object.assign({}, mockActions, {
                setGuideTerm: mockSetGuide,
                showGuide: mockShowGuide
            });

            const container = shallow(<GuideContainer
                {...swizzledActions}
                guide={mockData} />);

            container.instance().jumpToTerm('xxxxx');

            expect(mockSetGuide).toHaveBeenCalledTimes(0);
            expect(mockShowGuide).toHaveBeenCalledTimes(0);
        });
    });
});
