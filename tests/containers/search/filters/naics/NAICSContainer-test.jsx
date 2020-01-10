/**
 * NAICSSearchContainer-test.jsx => NAICSContainer-test.jsx
 * Created by Emily Gullo 07/26/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import { NAICSContainer } from 'containers/search/filters/naics/NAICSContainer';
import { List } from 'immutable';
import {
    naicsMock2,
    populatedNAICSRedux,
    emptyNAICSProps,
    populatedState,
    naicsMockCleanData
} from './mockNAICS';

jest.mock('helpers/naicsHelper', () => require('./mockNAICSHelper'));

describe('NAICS Search Filter Container', () => {
    const fetchNAICS = jest.fn();
    const setStateFromRedux = jest.fn();
    const onExpand = jest.fn();
    const setExpanded = jest.fn();
    const onSearchChange = jest.fn();
    describe('Component Did Mount', () => {
        it('should call fetch naics on mount', async () => {
            const container = shallow(<NAICSContainer {...emptyNAICSProps} />);
            container.instance().fetchNAICS = fetchNAICS;
            await container.instance().componentDidMount();
            expect(fetchNAICS).toHaveBeenCalled();
        });
        it('should not call fetch naics on mount when there is a Redux value', async () => {
            const newProps = { ...emptyNAICSProps };
            newProps.nodes = populatedNAICSRedux.naics;
            const container = shallow(<NAICSContainer {...newProps} />);
            container.instance().setStateFromRedux = setStateFromRedux;
            await container.instance().componentDidMount();
            expect(setStateFromRedux).toHaveBeenCalled();
        });
    });
    it('should update state when onClear is called', () => {
        const newProps = { ...emptyNAICSProps };
        const container = shallow(<NAICSContainer {...newProps} />);
        container.instance().onClear();
        const {
            isSearch,
            searchString,
            naics,
            fromRedux
        } = container.instance().state;
        expect(isSearch).toEqual(false);
        expect(searchString).toEqual('');
        expect(Array.isArray(naics)).toEqual(true);
        expect(fromRedux).toEqual(true);
    });
    describe('Handle Text Input Change', () => {
        it('should update state when no search text', () => {
            const newProps = { ...emptyNAICSProps };
            const container = shallow(<NAICSContainer {...newProps} />);
            container.instance().handleTextInputChange({ target: { value: '' } });
            const {
                isSearch,
                searchString
            } = container.instance().state;
            expect(isSearch).toEqual(false);
            expect(searchString).toEqual('');
        });
        it('should update state when search text exists', () => {
            const newProps = { ...emptyNAICSProps };
            const container = shallow(<NAICSContainer {...newProps} />);
            container.instance().onSearchChange = onSearchChange;
            container.instance().handleTextInputChange({ target: { value: 'Maxwell' } });
            const {
                isSearch,
                searchString
            } = container.instance().state;
            expect(isSearch).toEqual(true);
            expect(searchString).toEqual('Maxwell');
            expect(onSearchChange).toHaveBeenCalled();
        });
    });
    it('should call fetchNAICS and setExpended when onExpand is called', () => {
        const newProps = { ...emptyNAICSProps };
        newProps.setExpanded = jest.fn();
        const container = shallow(<NAICSContainer {...newProps} />);
        container.instance().fetchNAICS = fetchNAICS;
        container.instance().onExpand({ value: 0 }, []);
        expect(fetchNAICS).toHaveBeenCalled();
        expect(container.instance().props.setExpanded).toHaveBeenCalled();
    });
    it('should call setExpanded when onCollapse is called', () => {
        const newProps = { ...emptyNAICSProps };
        newProps.setExpanded = jest.fn();
        const container = shallow(<NAICSContainer {...newProps} />);
        container.instance().onExpand({ value: 0 }, []);
        expect(container.instance().props.setExpanded).toHaveBeenCalled();
    });
    it('should call setNaics when setRedux is called', () => {
        const newProps = { ...emptyNAICSProps };
        newProps.setNaics = jest.fn();
        const container = shallow(<NAICSContainer {...newProps} />);
        container.instance().setRedux([]);
        expect(container.instance().props.setNaics).toHaveBeenCalled();
    });
    it('should setState when setStateFromRedux is called', () => {
        const container = shallow(<NAICSContainer {...emptyNAICSProps} />);
        const { naics, expanded, checked } = populatedState;
        container.instance().setStateFromRedux(new List(naics), new List(expanded), new List(checked));
        const { state } = container.instance();
        expect(state.naics).toEqual(naics);
        expect(state.expanded).toEqual(expanded);
        expect(state.checked).toEqual(checked);
        expect(state.fromRedux).toEqual(true);
    });
    describe('FecthNaics', () => {
        it('should set property nodes in state to API response', async () => {
            const container = shallow(<NAICSContainer />);
            await container.instance().fetchNAICS();
            const {
                naics,
                isLoading,
                isError,
                errorMessage,
                requestType
            } = container.instance().state;
            expect(naics).toEqual(naicsMock2);
            expect(isLoading).toEqual(false);
            expect(isError).toEqual(false);
            expect(errorMessage).toEqual('');
            expect(requestType).toEqual('');
        });
        it('should set properties isError and errorMessage from API response', async () => {
            const container = shallow(<NAICSContainer />);
            await container.instance().fetchNAICS(true);
            const {
                naics,
                isLoading,
                isError,
                errorMessage
            } = container.instance().state;
            expect(naics).toEqual([]);
            expect(isLoading).toEqual(false);
            expect(isError).toEqual(true);
            expect(errorMessage).toEqual('Bad');
        });
        it('should set fromRedux property to false when true', async () => {
            const newProps = { ...emptyNAICSProps };
            newProps.nodes = new List(naicsMockCleanData);
            const container = shallow(<NAICSContainer {...newProps} />);
            await container.instance().componentDidMount();
            await container.instance().fetchNAICS();
            expect(container.instance().state.fromRedux).toEqual(false);
        });
    });
});
