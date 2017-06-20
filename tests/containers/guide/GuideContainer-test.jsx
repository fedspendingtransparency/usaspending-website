/**
 * GuideContainer-test.jsx
 * Created by Kevin Li 5/3/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { GuideContainer } from 'containers/guide/GuideContainer';
import * as GuideHelper from 'helpers/guideHelper';
import { Definition, initialState } from 'redux/reducers/guide/guideReducer';

import { mockActions, mockData, mockSearch, mockCache, standardTerm } from './mockGuide';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const populateCacheSpy = sinon.spy(GuideContainer.prototype, 'populateCache');
const performSearchSpy = sinon.spy(GuideContainer.prototype, 'performSearch');

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
    it('should populate the cache via an API call on mount', () => {
        mockGuideHelper('populateCache', 'resolve', mockCache);
        mockGuideHelper('performSearch', 'resolve', mockSearch);

        mount(<GuideContainer
            {...mockActions}
            guide={initialState} />);
        jest.runAllTicks();

        expect(populateCacheSpy.callCount).toEqual(1);
        populateCacheSpy.reset();
    });

    it('should only populate the cache when it is empty', () => {
        mockGuideHelper('populateCache', 'resolve', mockCache);
        mockGuideHelper('performSearch', 'resolve', mockSearch);

        populateCacheSpy.reset();
        performSearchSpy.reset();

        mount(<GuideContainer
            {...mockActions}
            guide={mockData} />);
        jest.runAllTicks();

        expect(populateCacheSpy.callCount).toEqual(0);
        expect(performSearchSpy.callCount).toEqual(1);
        populateCacheSpy.reset();
        performSearchSpy.reset();
    });

    describe('writeCache', () => {
        it('should create a Map of definitions', () => {
            mockGuideHelper('populateCache', 'resolve', mockCache);
            mockGuideHelper('performSearch', 'resolve', mockSearch);

            const mockSetCache = jest.fn();

            const actions = Object.assign({}, mockActions, {
                setGuideCache: mockSetCache
            });

            const container = shallow(<GuideContainer
                {...actions}
                guide={mockData} />);

            container.instance().writeCache(mockCache.results);

            expect(mockSetCache).toHaveBeenCalledWith({
                'test-term': standardTerm
            });
        });
    });

    describe('parseTerms', () => {
        it('should parse the API response into an array of Definition objects', () => {
            mockGuideHelper('populateCache', 'resolve', mockCache);
            mockGuideHelper('performSearch', 'resolve', mockSearch);

            const mockedSetGuideResults = jest.fn();

            const swizzledActions = Object.assign({}, mockActions, {
                setGuideResults: mockedSetGuideResults
            });

            const container = shallow(<GuideContainer
                {...swizzledActions}
                guide={mockData} />);

            container.instance().parseTerms(mockSearch.matched_objects.term);

            expect(mockedSetGuideResults).toHaveBeenCalledTimes(1);
            expect(mockedSetGuideResults).toHaveBeenCalledWith([standardTerm]);
        });

        it('should run any queued operations prepared before the API call finished', () => {
            mockGuideHelper('populateCache', 'resolve', mockCache);
            mockGuideHelper('performSearch', 'resolve', mockSearch);

            const container = shallow(<GuideContainer
                {...mockActions}
                guide={mockData} />);

            const mockOperation = jest.fn();
            container.instance().queuedOperations = [mockOperation];
            expect(mockOperation).toHaveBeenCalledTimes(0);

            container.instance().parseTerms(mockSearch.matched_objects.term);

            expect(mockOperation).toHaveBeenCalledTimes(1);
        });
    });

    describe('detectedUrlChange', () => {
        it('should queue any jump operations if the component is still loading', () => {
            mockGuideHelper('populateCache', 'resolve', mockCache);
            mockGuideHelper('performSearch', 'resolve', mockSearch);

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
            container.instance().parseTerms(mockSearch.matched_objects.term);

            // once the API response has come back it can be called
            expect(mockedJump).toHaveBeenCalledTimes(1);
        });

        it('should trigger jumpToTerm if the data has already loaded', () => {
            mockGuideHelper('populateCache', 'resolve', mockCache);
            mockGuideHelper('performSearch', 'resolve', mockSearch);

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
            mockGuideHelper('populateCache', 'resolve', mockCache);
            mockGuideHelper('performSearch', 'resolve', mockSearch);

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
            expect(mockSetGuide).toHaveBeenCalledWith(standardTerm);
            expect(mockShowGuide).toHaveBeenCalledTimes(1);
        });
        it('should do nothing when no terms with matching slugs exist', () => {
            mockGuideHelper('populateCache', 'resolve', mockCache);
            mockGuideHelper('performSearch', 'resolve', mockSearch);

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
