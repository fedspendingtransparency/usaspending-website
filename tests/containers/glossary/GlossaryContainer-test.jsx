/**
 * GlossaryContainer-test.jsx
 * Created by Kevin Li 5/3/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { GlossaryContainer } from 'containers/glossary/GlossaryContainer';
import * as GlossaryHelper from 'helpers/glossaryHelper';
import { Definition, initialState } from 'redux/reducers/glossary/glossaryReducer';

import { mockActions, mockData, mockSearch, mockCache, standardTerm } from './mockGlossary';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const populateCacheSpy = sinon.spy(GlossaryContainer.prototype, 'populateCache');
const performSearchSpy = sinon.spy(GlossaryContainer.prototype, 'performSearch');
const populateGlossaryWithAllTermsSpy = sinon.spy(GlossaryContainer.prototype, 'populateGlossaryWithAllTerms');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/glossary/AnimatedGlossaryWrapper', () =>
    jest.fn(() => null));

const mockGlossaryHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    GlossaryHelper[functionName] = jest.fn(() => {
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

const unmockGlossaryHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/glossaryHelper');
};

describe('GlossaryContainer', () => {
    mockGlossaryHelper('populateCache', 'resolve', mockCache);
    mockGlossaryHelper('performSearch', 'resolve', mockSearch);

    mount(<GlossaryContainer
        {...mockActions}
        glossary={initialState} />);
    jest.runAllTicks();

    it('should populate the cache via an API call on mount', () => {
        expect(populateCacheSpy.callCount).toEqual(1);
        expect(performSearchSpy.callCount).toEqual(0);
        expect(populateGlossaryWithAllTermsSpy.callCount).toEqual(0);
        populateCacheSpy.reset();
        performSearchSpy.reset();
        populateGlossaryWithAllTermsSpy.reset();
    });

    it('should only populate the cache when it is empty', () => {
        mockGlossaryHelper('populateCache', 'resolve', mockCache);
        mockGlossaryHelper('performSearch', 'resolve', mockSearch);

        populateCacheSpy.reset();
        performSearchSpy.reset();
        populateGlossaryWithAllTermsSpy.reset();

        mount(<GlossaryContainer
            {...mockActions}
            glossary={mockData} />);
        jest.runAllTicks();

        expect(populateCacheSpy.callCount).toEqual(0);
        expect(performSearchSpy.callCount).toEqual(1);
        expect(populateGlossaryWithAllTermsSpy.callCount).toEqual(1);

        populateCacheSpy.reset();
        performSearchSpy.reset();
        populateGlossaryWithAllTermsSpy.reset();
    });

    it('should only call populateGlossaryWithAllTerms when search term is empty', () => {
        populateCacheSpy.reset();
        performSearchSpy.reset();
        populateGlossaryWithAllTermsSpy.reset();

        const mockDataWithDefinedSearchTerm = Object.assign(mockData, {
            search: {
                input: 'test',
                results: mockData.search.results
            }
        });

        mount(<GlossaryContainer
            {...mockActions}
            glossary={mockDataWithDefinedSearchTerm} />);
        jest.runAllTicks();

        expect(populateGlossaryWithAllTermsSpy.callCount).toEqual(0);
        expect(performSearchSpy.callCount).toEqual(1);
        
        populateCacheSpy.reset();
        performSearchSpy.reset();
        populateGlossaryWithAllTermsSpy.reset();
    });

    describe('writeCache', () => {
        it('should create a Map of definitions', () => {
            mockGlossaryHelper('populateCache', 'resolve', mockCache);
            mockGlossaryHelper('performSearch', 'resolve', mockSearch);

            const mockSetCache = jest.fn();

            const actions = Object.assign({}, mockActions, {
                setGlossaryCache: mockSetCache
            });

            const container = shallow(<GlossaryContainer
                {...actions}
                glossary={mockData} />);

            container.instance().writeCache(mockCache.results);

            expect(mockSetCache).toHaveBeenCalledWith({
                'test-term': standardTerm
            });
        });
    });

    describe('parseTerms', () => {
        it('should parse the API response into an array of Definition objects', () => {
            mockGlossaryHelper('populateCache', 'resolve', mockCache);
            mockGlossaryHelper('performSearch', 'resolve', mockSearch);

            const mockedSetGlossaryResults = jest.fn();

            const swizzledActions = Object.assign({}, mockActions, {
                setGlossaryResults: mockedSetGlossaryResults
            });

            const container = shallow(<GlossaryContainer
                {...swizzledActions}
                glossary={mockData} />);

            container.instance().parseTerms(mockSearch.matched_objects.term);

            expect(mockedSetGlossaryResults).toHaveBeenCalledTimes(1);
            expect(mockedSetGlossaryResults).toHaveBeenCalledWith([standardTerm]);
        });

        it('should run any queued operations prepared before the API call finished', () => {
            mockGlossaryHelper('populateCache', 'resolve', mockCache);
            mockGlossaryHelper('performSearch', 'resolve', mockSearch);

            const container = shallow(<GlossaryContainer
                {...mockActions}
                glossary={mockData} />);

            const mockOperation = jest.fn();
            container.instance().queuedOperations = [mockOperation];
            expect(mockOperation).toHaveBeenCalledTimes(0);

            container.instance().parseTerms(mockSearch.matched_objects.term);

            expect(mockOperation).toHaveBeenCalledTimes(1);
        });
    });

    describe('detectedUrlChange', () => {
        it('should queue any jump operations if the component is still loading', () => {
            mockGlossaryHelper('populateCache', 'resolve', mockCache);
            mockGlossaryHelper('performSearch', 'resolve', mockSearch);

            const container = shallow(<GlossaryContainer
                {...mockActions}
                glossary={mockData} />);

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
            mockGlossaryHelper('populateCache', 'resolve', mockCache);
            mockGlossaryHelper('performSearch', 'resolve', mockSearch);

            const container = shallow(<GlossaryContainer
                {...mockActions}
                glossary={mockData} />);

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
        it('should show the glossary and load the specified term when a term with a matching slug exists', () => {
            mockGlossaryHelper('populateCache', 'resolve', mockCache);
            mockGlossaryHelper('performSearch', 'resolve', mockSearch);

            const mockShowGlossary = jest.fn();
            const mockSetGlossary = jest.fn();

            const swizzledActions = Object.assign({}, mockActions, {
                setGlossaryTerm: mockSetGlossary,
                showGlossary: mockShowGlossary
            });

            const container = shallow(<GlossaryContainer
                {...swizzledActions}
                glossary={mockData} />);

            container.instance().jumpToTerm('test-term');

            expect(mockSetGlossary).toHaveBeenCalledTimes(1);
            expect(mockSetGlossary).toHaveBeenCalledWith(standardTerm);
            expect(mockShowGlossary).toHaveBeenCalledTimes(1);
        });
        it('should do nothing when no terms with matching slugs exist', () => {
            mockGlossaryHelper('populateCache', 'resolve', mockCache);
            mockGlossaryHelper('performSearch', 'resolve', mockSearch);

            const mockShowGlossary = jest.fn();
            const mockSetGlossary = jest.fn();

            const swizzledActions = Object.assign({}, mockActions, {
                setGlossaryTerm: mockSetGlossary,
                showGlossary: mockShowGlossary
            });

            const container = shallow(<GlossaryContainer
                {...swizzledActions}
                glossary={mockData} />);

            container.instance().jumpToTerm('xxxxx');

            expect(mockSetGlossary).toHaveBeenCalledTimes(0);
            expect(mockShowGlossary).toHaveBeenCalledTimes(0);
        });
    });
});
