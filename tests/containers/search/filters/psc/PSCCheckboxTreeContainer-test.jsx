/**
 * @jest-environment jsdom
 *
 * PSCCheckboxTreeContainer-test.jsx
 * Created by Josue Aguilar 4/28/2025
 */

import React from 'react';
import { expect } from '@jest/globals';
import { waitFor } from '@testing-library/react';

import PSCCheckboxTreeContainer from 'containers/search/filters/psc/PSCCheckboxTreeContainer';
import { render, screen, act, fireEvent } from '../../../../testResources/test-utils';
import { initialMockResponse, agriMockResponse, accordionOpenMockResponse } from './mockPSC';
import { fetchPsc } from 'helpers/searchHelper';

// jest hoists this above the imports, so pscTreeConfig captures the mock
jest.mock('helpers/searchHelper', () => ({
    ...jest.requireActual('helpers/searchHelper'),
    fetchPsc: jest.fn()
}));

describe('PSCCheckboxTreeContainer', () => {
    afterEach(() => {
        fetchPsc.mockReset();
    });

    it('should populate the checkbox tree with all psc groups', async () => {
        fetchPsc.mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const rAndDTest = screen.getByText('Research and Development', { exact: false });
            expect(rAndDTest).toBeInTheDocument();
        });
    });

    it('should populate the checkbox tree search results and clear', async () => {
        fetchPsc.mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const rAndDElement = screen.getByText('Research and Development', { exact: false });
            expect(rAndDElement).toBeInTheDocument();
        });

        fetchPsc.mockReturnValueOnce({ promise: Promise.resolve(agriMockResponse) });

        act(() => {
            const searchBar = screen.getByPlaceholderText('Type at least 2 letters...');
            fireEvent.change(searchBar, { target: { value: 'agri' } });
            expect(searchBar).toHaveValue('agri');
        });

        await waitFor(() => {
            const agriEl = screen.getByText('CULTURE R&D SERVICES', { exact: false });
            expect(agriEl).toBeInTheDocument();
        });

        act(() => {
            const searchBar = screen.getByPlaceholderText('Type at least 2 letters...');
            fireEvent.change(searchBar, { target: { value: '' } });
        });

        await waitFor(() => {
            const agriEl = screen.queryByText('CULTURE R&D SERVICES', { exact: false });
            expect(agriEl).not.toBeInTheDocument();
        });
    });

    it('should open/close accordion', async () => {
        fetchPsc.mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const rAndDTest = screen.getByText('Research and Development', { exact: false });
            expect(rAndDTest).toBeInTheDocument();
        });

        fetchPsc.mockReturnValueOnce({ promise: Promise.resolve(accordionOpenMockResponse) });

        act(() => {
            const accordionChevron = screen.getAllByRole('button', 'Toggle');
            fireEvent.click(accordionChevron[1]);
        });

        await waitFor(() => {
            const test = screen.getByText('SPECIAL STUDIES/ANALYSIS, NOT R&D');
            expect(test).toBeInTheDocument();
        });

        act(() => {
            const accordionChevron = screen.getAllByRole('button', 'Toggle');
            fireEvent.click(accordionChevron[1]);
        });

        await waitFor(() => {
            const test = screen.queryByText('SPECIAL STUDIES/ANALYSIS, NOT R&D');
            expect(test).not.toBeInTheDocument();
        });
    });

    xit('check/uncheck based on parent child relationship', async () => {
        fetchPsc.mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const rAndDTest = screen.getByText('Research and Development', { exact: false });
            expect(rAndDTest).toBeInTheDocument();
        });

        fetchPsc.mockReturnValueOnce({ promise: Promise.resolve(accordionOpenMockResponse) });

        act(() => {
            const accordionChevron = screen.getAllByRole('button', 'Toggle');
            fireEvent.click(accordionChevron[1]);
        });

        await waitFor(() => {
            const test = screen.getByText('SPECIAL STUDIES/ANALYSIS, NOT R&D');
            expect(test).toBeInTheDocument();
        });

        const checkboxes = screen.getAllByRole('checkbox');

        // parent checked
        act(() => {
            fireEvent.click(checkboxes[1]);
        });

        expect(checkboxes[1].children[0]).toHaveAttribute('data-icon', 'check-square');
        expect(checkboxes[2].children[0]).toHaveAttribute('data-icon', 'check-square');
        expect(checkboxes[3].children[0]).toHaveAttribute('data-icon', 'check-square');

        // one child unchecked
        act(() => {
            fireEvent.click(checkboxes[2]);
        });

        expect(checkboxes[1].children[0]).toHaveAttribute('data-icon', 'minus-square');
        expect(checkboxes[2].children[0]).toHaveAttribute('data-icon', 'square');
        expect(checkboxes[3].children[0]).toHaveAttribute('data-icon', 'check-square');

        // both children unchecked
        act(() => {
            fireEvent.click(checkboxes[3]);
        });

        expect(checkboxes[1].children[0]).toHaveAttribute('data-icon', 'square');
        expect(checkboxes[2].children[0]).toHaveAttribute('data-icon', 'square');
        expect(checkboxes[3].children[0]).toHaveAttribute('data-icon', 'square');
    });
});
