/**
 * @jest-environment jsdom
 *
 * PSCCheckboxTreeContainer-test.jsx
 * Created by Josue Aguilar 4/28/2025
 */

import React from 'react';
import { expect } from "@jest/globals";
import { waitFor } from "@testing-library/react";

import PSCCheckboxTreeContainer from "containers/search/filters/psc/PSCCheckboxTreeContainer";
import { render, screen, act, fireEvent } from '../../../../testResources/test-utils';
import { initialMockResponse, agriMockResponse, accordionOpenMockResponse } from './mockPSC';
import * as searchHelper from "../../../../../src/js/helpers/searchHelper";

describe('PSCCheckboxTreeContainer', () => {
    it('should populate the checkbox tree with all psc groups', async () => {
        jest.spyOn(searchHelper, 'fetchPsc').mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const rAndDTest = screen.getByText('Research and Development', { exact: false });
            expect(rAndDTest).toBeTruthy();
        });
    });

    it('should populate the checkbox tree search results', async () => {
        jest.spyOn(searchHelper, 'fetchPsc').mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const rAndDTest = screen.getByText('Research and Development', { exact: false });

            expect(rAndDTest).toBeTruthy();
        });

        jest.spyOn(searchHelper, 'fetchPsc').mockReturnValueOnce({ promise: Promise.resolve(agriMockResponse) });

        act(() => {
            const searchBar = screen.getByPlaceholderText('Type to filter results');

            fireEvent.change(searchBar, { target: { value: 'agri' } });
            expect(searchBar).toBeTruthy();
            expect(searchBar).toHaveValue('agri');
        });

        await waitFor(() => {
            const agriTest = screen.getByText('CULTURE R&D SERVICES', { exact: false });

            expect(agriTest).toBeTruthy();
        });
    });

    it('should open/close accordion', async () => {
        jest.spyOn(searchHelper, 'fetchPsc').mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const rAndDTest = screen.getByText('Research and Development', { exact: false });

            expect(rAndDTest).toBeTruthy();
        });

        jest.spyOn(searchHelper, 'fetchPsc').mockReturnValueOnce({ promise: Promise.resolve(accordionOpenMockResponse) });

        act(() => {
            const accordionChevron = screen.getAllByRole('button', 'Toggle');

            fireEvent.click(accordionChevron[1]);
        });

        await waitFor(() => {
            const test = screen.getByText('SPECIAL STUDIES/ANALYSIS, NOT R&D');

            expect(test).toBeTruthy();
        });
    });

    // it('check/uncheck based on parent child relationship', async () => {
    //     jest.spyOn(searchHelper, 'fetchPsc').mockReturnValue({ promise: Promise.resolve(initialMockResponse) });
    //
    //     render(<PSCCheckboxTreeContainer />);
    //
    //     await waitFor(() => {
    //         const rAndDTest = screen.getByText('Research and Development', { exact: false });
    //         expect(rAndDTest).toBeTruthy();
    //     });
    //
    //     const checkbox = document.getElementsByClassName('rct-checkbox');
    //
    //     act(() => {
    //         fireEvent.click(checkbox[0]);
    //     });
    //
    //     await waitFor(() => {
    //         expect(checkbox[0]).toBe('here');
    //     });
    // });
});
