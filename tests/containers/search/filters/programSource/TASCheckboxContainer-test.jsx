/**
 * Created by Max Kendall
 * 03/25/2020
 */
import React from 'react';
import { shallow } from 'enzyme';

import { fetchTas } from "helpers/searchHelper";

import { TASCheckboxTree } from "../../../../../src/js/containers/search/filters/programSource/TASCheckboxTreeContainer";

import {
    agencyLevel,
    federalAccountLevel,
    tasLevel,
    defaultProps,
    treePopulatedToFederalAccountLevel,
    hashUrlWithFederalAccountSelected,
    hashUrlWithTasSelected
} from '../programSource/mockTas';

jest.mock("helpers/searchHelper", () => ({
    fetchTas: jest.fn()
}));

describe('TASCheckboxContainer', () => {
    describe('loading tree from url hash', () => {
        it('fetches federal account nodes', async () => {
            const mockFn = jest.fn(() => Promise.resolve());
            const container = shallow(<TASCheckboxTree
                {...defaultProps}
                checkedFromHash={hashUrlWithFederalAccountSelected} />);

            container.instance().fetchTas = mockFn;
            await container.instance().componentDidMount();
            // second call to fetchTas is for the agency
            expect(mockFn).toHaveBeenLastCalledWith('012');
            // only calls for agency 12 once
            expect(mockFn).toHaveBeenCalledTimes(2);
        });
        it('fetches tas nodes', async () => {
            const mockFn = jest.fn(() => Promise.resolve());
            const container = shallow(<TASCheckboxTree
                {...defaultProps}
                checkedFromHash={hashUrlWithTasSelected} />);

            container.instance().fetchTas = mockFn;

            await container.instance().componentDidMount();

            expect(mockFn).toHaveBeenLastCalledWith('012/012-8226');
            // only calls for federal account 012-8226 once
            expect(mockFn).toHaveBeenCalledTimes(3);
        });
        // Can't really test the setCheckedStateFromUrlHash fn b/c the parameter, newChecked, requires this.props.nodes to be defined, and this sequence is only kicked off when componentDidMount is fired w/o any nodes in props. This points to an improvement we could use w/ our test configuration to include a test-redux store that updates our components props as we go along w/ the test. IE, redux-mock-store npm package, cited here: https://redux.js.org/recipes/writing-tests.
    });
    describe('fetchTAS', () => {
        const mockFn = jest.fn();
        const container = shallow(<TASCheckboxTree {...defaultProps} setTasNodes={mockFn} />);
        beforeEach(async () => {
            mockFn.mockReset();
        });
        it('populates the tree trunk w/ agencies & placeholder data for federal agencies', async () => {
            fetchTas.mockImplementation(() => ({
                promise: Promise.resolve({ data: agencyLevel })
            }));
            await container.instance().componentDidMount();
            const newNodes = mockFn.mock.calls[0][1];
            expect(newNodes.length).toEqual(10);

            newNodes
                .forEach((agency) => {
                    expect(agency.children.length).toEqual(1);
                    expect(agency.children[0].isPlaceHolder).toEqual(true);
                });
        });
        it('populates the tree branches w/ federal accounts & placeholder data for TAS accounts', async () => {
            fetchTas.mockImplementation(() => ({
                promise: Promise.resolve({ data: federalAccountLevel })
            }));
            await container.instance().fetchTas('012');
            
            const newFederalAccounts = mockFn.mock.calls[0][1];

            newFederalAccounts
                .forEach((federalAccount) => {
                    // 4. should be grand children tas account
                    expect(federalAccount.children.length).toEqual(1);
                    // 5. it should be a placeholder
                    expect(federalAccount.children[0].isPlaceHolder).toEqual(true);
                });
        });
        it('populates the tree leaves w/ tas accounts', async () => {
            fetchTas.mockImplementation(() => ({
                promise: Promise.resolve({ data: tasLevel })
            }));
            await container.instance().fetchTas('012/012-8226');

            const newTasAccounts = mockFn.mock.calls[0][1];

            // no place holders
            expect(newTasAccounts.some((grand) => grand.isPlaceHolder)).toEqual(false);
        });
    });
    describe('onExpand', () => {
        let container;
        const mockSetExpanded = jest.fn();
        const mockFetchTas = jest.fn();

        beforeEach(async () => {
            mockSetExpanded.mockReset();
            mockFetchTas.mockReset();
            container = shallow(<TASCheckboxTree
                {...defaultProps}
                nodes={treePopulatedToFederalAccountLevel}
                setExpandedTas={mockSetExpanded} />);
            container.instance().fetchTas = mockFetchTas;
        });
        it('calls fetchTas w/ agency & federal account when necessary', async () => {
            container.instance().onExpand('012-8226', ['012', '012-8226'], true, { treeDepth: 1 });

            expect(mockFetchTas).toHaveBeenLastCalledWith('012/012-8226');
        });
        it('calls fetchTas w/ only agency when necessary', () => {
            container.instance().onExpand('012', ['012'], true, { treeDepth: 0 });

            expect(mockFetchTas).toHaveBeenLastCalledWith('012');
        });
        it('always sets the expanded state', () => {
            container.instance().onExpand('012', ['012'], true, { treeDepth: 0 });
            let newExpanded = mockSetExpanded.mock.calls[0][0];
            // 1. When we expand an agency
            expect(newExpanded).toEqual(['012']);
            // 2. When we expand a federal account
            container.instance().onExpand('012-8226', ['012', '012-8226'], true, { treeDepth: 1 });
            newExpanded = mockSetExpanded.mock.calls[1][0];
            expect(newExpanded).toEqual(['012', '012-8226']);
        });
    });
    describe('onCollapse', () => {
        it('updates the state.expanded array', () => {
            const mockFn = jest.fn();
            const container = shallow(
                <TASCheckboxTree
                    {...defaultProps}
                    expanded={['1', '11']}
                    setExpandedTas={mockFn} />);
            container.instance().onCollapse(['11']);
            const newExpanded = mockFn.mock.calls[0][0];
            expect(newExpanded).toEqual(['11']);
        });
    });
    describe('onCheck', () => {
        it('updates the checked array', async () => {
            const mockFn = jest.fn();
            const container = shallow(<TASCheckboxTree
                {...defaultProps}
                setCheckedTas={mockFn}
                nodes={treePopulatedToFederalAccountLevel} />);
            container.instance().onCheck(['012']);
            const newChecked = mockFn.mock.calls[0][0];
            expect(newChecked).toEqual(['012']);
        });
    });
    describe('onUncheck', () => {
        it('updates the checked array', async () => {
            const mockFn = jest.fn();
            const container = shallow(<TASCheckboxTree
                {...defaultProps}
                setCheckedTas={mockFn}
                nodes={treePopulatedToFederalAccountLevel}
                checked={['012']} />);

            container.instance().onUncheck([], { value: '012', checked: false });

            const newChecked = mockFn.mock.calls[0][0];
            expect(newChecked).toEqual([]);
        });
    });
});
