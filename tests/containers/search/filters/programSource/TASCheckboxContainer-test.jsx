/**
 * Created by Max Kendall
 * 03/25/2020
 */
import React from 'react';
import { shallow } from 'enzyme';

import { fetchTas } from "helpers/searchHelper";

import TASCheckboxTreeContainer from "../../../../../src/js/containers/search/filters/programSource/TASCheckboxTreeContainer";

import { agencyLevel, federalAccountLevel, tasLevel } from '../programSource/mockTas';

jest.mock("helpers/searchHelper", () => ({
    fetchTas: jest.fn()
}));

describe('TASCheckboxContainer', () => {
    describe('fetchTAS', () => {
        const container = shallow(<TASCheckboxTreeContainer />);
        it('populates the tree trunk w/ agencies', async () => {
            fetchTas.mockImplementation(() => ({
                promise: Promise.resolve({ data: agencyLevel })
            }));
            await container.instance().componentDidMount();
            expect(container.state().nodes.length).toEqual(10);

            container.state().nodes
                .forEach((agency) => {
                    expect(agency.children.length).toEqual(1);
                    expect(agency.children[0].isPlaceHolder).toEqual(true);
                });
        });
        it('populates the tree branches w/ federal accounts', async () => {
            fetchTas.mockImplementation(() => ({
                promise: Promise.resolve({ data: federalAccountLevel })
            }));
            await container.instance().fetchTas('1');
            
            // 1. same number of agencies in tree; none are removed.
            expect(container.state().nodes.length).toEqual(10);
            
            const newFederalAccounts = container.state().nodes
                .find((node) => node.value === '1')
                .children;

            // 2. the new children are added to the proper agency node
            expect(newFederalAccounts.length).toEqual(federalAccountLevel.results.length);
            
            // 3. no place holders
            expect(newFederalAccounts.some((federalAccount) => federalAccount.isPlaceHolder)).toEqual(false);

            newFederalAccounts
                .forEach((federalAccount) => {
                    // 4. should be grand children
                    expect(federalAccount.children.length).toEqual(1);
                    // 5. should be a placeholder
                    expect(federalAccount.children[0].isPlaceHolder).toEqual(true);
                });
        });
        it('populates the tree leaves w/ tas accounts', async () => {
            fetchTas.mockImplementation(() => ({
                promise: Promise.resolve({ data: tasLevel })
            }));
            await container.instance().fetchTas('1/11', 1);

            // 1. same number of agencies in tree; none are removed.
            expect(container.state().nodes.length).toEqual(10);

            const newTasAccounts = container.state().nodes
                .find((agency) => agency.value === '1')
                .children
                .find((federalAccount) => federalAccount.value === '11')
                .children;

            // 2. the new children are added to the proper federalAccount node
            expect(newTasAccounts.length).toEqual(tasLevel.results.length);

            // 3. no place holders
            expect(newTasAccounts.some((grand) => grand.isPlaceHolder)).toEqual(false);
        });
    });
    describe('onExpand', () => {
        let container;
        beforeEach(async () => {
            container = shallow(<TASCheckboxTreeContainer />);

            fetchTas.mockImplementation(() => ({
                promise: Promise.resolve({ data: agencyLevel })
            }));

            // populate mock container w/ agencies.
            await container.instance().componentDidMount();

            fetchTas.mockImplementation(() => ({
                promise: Promise.resolve({ data: federalAccountLevel })
            }));

            // populate mock container w/ federal accounts.
            await container.instance().fetchTas('1');
        });
        it('calls fetchTas w/ agency & federal account when necessary', async () => {
            const mockFn = jest.fn();

            container.instance().fetchTas = mockFn;
            container.instance().onExpand('11', ['1', '11'], true, { treeDepth: 1 });

            expect(mockFn).toHaveBeenLastCalledWith('1/11', 1);
        });
        it('calls fetchTas w/ only agency when necessary', () => {
            const mockFn = jest.fn();

            container.instance().fetchTas = mockFn;
            container.instance().onExpand('1', ['1'], true, { treeDepth: 0 });

            expect(mockFn).toHaveBeenLastCalledWith('1');
        });
        it('always sets the expanded state', () => {
            const mockFn = jest.fn();

            container.instance().fetchTas = mockFn;
            container.instance().onExpand('1', ['1'], true, { treeDepth: 0 });
            // 1. When we expand an agency
            expect(container.state().expanded).toEqual(['1']);
            // 2. When we expand a federal account
            container.instance().onExpand('11', ['1', '11'], true, { treeDepth: 1 });
            expect(container.state().expanded).toEqual(['1', '11']);
        });
    });
    describe('onCollapse', () => {
        it('updates the state.expanded array', () => {
            const container = shallow(<TASCheckboxTreeContainer />);
            container.instance().setState({ expanded: ['1', '11'] });
            container.instance().onCollapse(['11']);

            expect(container.state().expanded).toEqual(['11']);
        });
    });
});
