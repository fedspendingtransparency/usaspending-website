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
    it('should populate the checkbox tree with all naics', async () => {
        jest.spyOn(searchHelper, "naicsRequest").mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<NAICSCheckboxTree />);

        await waitFor(() => {
            expect(screen.queryByText('Agriculture, Forestry, Fishing and Hunting')).toBeTruthy();
        });
    });

    it('should populate the checkbox tree search results and clear', async () => {
        jest.spyOn(searchHelper, "naicsRequest").mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<NAICSCheckboxTree />);

        await waitFor(() => {
            expect(screen.queryByText('Agriculture, Forestry, Fishing and Hunting')).toBeTruthy();
            expect(screen.queryByText('Mining, Quarrying, and Oil and Gas Extraction')).toBeTruthy();
        });

        jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(naicsSearchMockResponse) });

        act(() => {
            const searchBar = screen.getByPlaceholderText('Type to find codes');
            fireEvent.change(searchBar, { target: { value: 'fish' } });
            expect(searchBar).toHaveValue('fish');
        });

        await waitFor(() => {
            expect(screen.queryAllByText('fish', { exact: false }).length).toEqual(12); // kind of a bad test.  counts all the time "fish" return not actaul number of nodes.
            expect(screen.getByText('Agriculture, Forestry,', { exact: false })).toBeInTheDocument(); // not only should this be returned but "Fish" should be highlighted
            expect(screen.getByText('Mining, Quarrying, and Oil and Gas Extraction')).not.toBeInTheDocument();
        });

        act(() => {
            const searchBar = screen.getByPlaceholderText('Type to find codes');
            fireEvent.change(searchBar, { target: { value: '' } });
        });

        await waitFor(() => {
            expect(screen.queryByText('Agriculture, Forestry, Fishing and Hunting')).toBeTruthy();
            expect(screen.queryByText('Mining, Quarrying, and Oil and Gas Extraction')).toBeTruthy();
        });
    });

    // it('should open/close accordion', async () => {
    //     jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

    //     render(<NAICSCheckboxTree />);

    //     await waitFor(() => {
    //         expect(screen.queryByText('Agriculture, Forestry, Fishing and Hunting')).toBeTruthy();
    //     });

    //     jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(accordionOpenMockResponse) });

    //     act(() => {
    //         const accordionChevron = screen.getAllByRole('button', 'Toggle');
    //         fireEvent.click(accordionChevron[1]);
    //     });

    //     await waitFor(() => {
    //         const test = screen.getByText('Oilseed and Grain Farmin');
    //         expect(test).toBeInTheDocument();
    //     });

    //     act(() => {
    //         const accordionChevron = screen.getAllByRole('button', 'Toggle');
    //         fireEvent.click(accordionChevron[1]);
    //     });

    //     await waitFor(() => {
    //         const test = screen.queryByText('Oilseed and Grain Farmin');
    //         expect(test).not.toBeInTheDocument();
    //     });
    // });

    // it('check/uncheck based on parent child relationship', async () => {
    //     jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

    //     render(<NAICSCheckboxTree />);

    //     await waitFor(() => {
    //         expect(screen.queryByText('Agriculture, Forestry, Fishing and Hunting')).toBeTruthy();
    //     });

    //     jest.spyOn(searchHelper, 'naicsRequest').mockReturnValueOnce({ promise: Promise.resolve(accordionOpenMockResponse) });

    //     act(() => {
    //         const accordionChevron = screen.getAllByRole('button', 'Toggle');
    //         fireEvent.click(accordionChevron[1]);
    //     });

    //     await waitFor(() => {
    //         const test = screen.getByText('Agriculture, Forestry, Fishing and Hunting');
    //         expect(test).toBeInTheDocument();
    //     });

    //     const checkboxes = document.getElementsByClassName('rct-checkbox');

    //     console.log(checkboxes);
    // parent checked
    // act(() => {
    //     fireEvent.click(checkboxes[1]);
    // });

    // expect(checkboxes[1].children[0]).toHaveAttribute('data-icon', 'check-square');
    // expect(checkboxes[2].children[0]).toHaveAttribute('data-icon', 'check-square');
    // expect(checkboxes[3].children[0]).toHaveAttribute('data-icon', 'check-square');

    // // one child unchecked
    // act(() => {
    //     fireEvent.click(checkboxes[2]);
    // });

    // expect(checkboxes[1].children[0]).toHaveAttribute('data-icon', 'minus-square');
    // expect(checkboxes[2].children[0]).toHaveAttribute('data-icon', 'square');
    // expect(checkboxes[3].children[0]).toHaveAttribute('data-icon', 'check-square');

    // // both children unchecked
    // act(() => {
    //     fireEvent.click(checkboxes[3]);
    // });

    // expect(checkboxes[1].children[0]).toHaveAttribute('data-icon', 'square');
    // expect(checkboxes[2].children[0]).toHaveAttribute('data-icon', 'square');
    // expect(checkboxes[3].children[0]).toHaveAttribute('data-icon', 'square');
    // });
});
