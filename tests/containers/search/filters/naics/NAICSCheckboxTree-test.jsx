/**
 * @jest-environment jsdom
 *
 */
import React from 'react';
import { expect } from '@jest/globals';

import { waitFor } from "@testing-library/react";
import NAICSCheckboxTree from '../../../../../src/js/containers/search/filters/naics/NAICSCheckboxTree';
import { render, screen, act, fireEvent } from '../../../../testResources/test-utils';
import { initialMockResponse, naicsSearchMockResponse, accordionOpenMockResponse } from './mockNAICS';
import * as searchHelper from "../../../../../src/js/helpers/searchHelper";

describe('NAICSCheckboxTreeContainer', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should populate the checkbox tree with all naics', async () => {
        jest.spyOn(searchHelper, "naicsRequest").mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<NAICSCheckboxTree />);

        await waitFor(() => {
            expect(screen.getByText('Agriculture, Forestry, Fishing and Hunting')).toBeInTheDocument();
        });
    });

    it('should populate the checkbox tree search results and clear', async () => {
        jest.spyOn(searchHelper, "naicsRequest").mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<NAICSCheckboxTree />);

        await waitFor(() => {
            const firstNode = screen.getByText('Agriculture, Forestry, Fishing and Hunting');

            expect(firstNode).toBeInTheDocument();
            expect(screen.getByText('Mining, Quarrying, and Oil and Gas Extraction')).toBeInTheDocument();
            expect(screen.getByText('Mining, Quarrying, and Oil and Gas Extraction').parentElement.parentElement.parentElement.parentElement.parentElement).not.toHaveClass('hide');
        });

        jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(naicsSearchMockResponse) });

        act(() => {
            const searchBar = screen.getByPlaceholderText('Search filters...');
            fireEvent.change(searchBar, { target: { value: 'fish' } });
            expect(searchBar).toHaveValue('fish');
        });

        await waitFor(() => {
            expect(screen.getAllByText('fish', { exact: false }).length).toEqual(12); // kind of a bad test.  counts all the time "fish" return not actaul number of nodes.
            expect(screen.queryByText('Agriculture, Forestry, Fishing and Hunting')).toBeNull(); // "Fish" should be wrapped in a span to highlight now so this should not pass
            expect(screen.getByText('Agriculture, Forestry, ', { exact: false })).toBeInTheDocument(); // check to make sure this element is still there.
        });

        act(() => {
            const searchBar = screen.getByPlaceholderText('Search filters...');
            fireEvent.change(searchBar, { target: { value: '' } });
        });

        await waitFor(() => {
            expect(screen.getByText('Agriculture, Forestry, Fishing and Hunting')).toBeInTheDocument();
            expect(screen.getByText('Mining, Quarrying, and Oil and Gas Extraction')).toBeInTheDocument();
        });
    });

    it('should open/close accordion', async () => {
        jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<NAICSCheckboxTree />);

        await waitFor(() => {
            expect(screen.getByText('Agriculture, Forestry, Fishing and Hunting')).toBeInTheDocument();
        });

        jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(accordionOpenMockResponse) });

        act(() => {
            const accordionChevron = screen.getAllByRole('button', 'Toggle');
            fireEvent.click(accordionChevron[1]);
        });

        await waitFor(() => {
            const test = screen.getByText('Oilseed and Grain Farming');
            expect(test).toBeInTheDocument();
        });

        act(() => {
            const accordionChevron = screen.getAllByRole('button', 'Toggle');
            fireEvent.click(accordionChevron[1]);
        });

        await waitFor(() => {
            const test = screen.queryByText('Oilseed and Grain Farming');
            expect(test).toBeNull();
        });
    });


    xit('check/uncheck based on parent child relationship', async () => {
        jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<NAICSCheckboxTree />);

        await waitFor(() => {
            expect(screen.getByText('Agriculture, Forestry, Fishing and Hunting')).toBeInTheDocument();
        });

        jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(accordionOpenMockResponse) });

        act(() => {
            const accordionChevron = screen.getAllByRole('button', 'Toggle');
            fireEvent.click(accordionChevron[1]);
        });

        await waitFor(() => {
            const test = screen.getByText('Agriculture, Forestry, Fishing and Hunting');
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
