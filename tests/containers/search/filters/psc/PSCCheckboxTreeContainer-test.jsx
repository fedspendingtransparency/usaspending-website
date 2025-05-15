/**
 * @jest-environment jsdom
 *
 * PSCCheckboxTreeContainer-test.jsx
 * Created by Josue Aguilar 4/28/2025
 */

import React from 'react';
import { expect } from "@jest/globals";
import { getDefaultNormalizer, waitFor } from "@testing-library/react";

import PSCCheckboxTreeContainer from "containers/search/filters/psc/PSCCheckboxTreeContainer";
import { render, screen } from '../../../../testResources/test-utils';
import * as searchHelper from "../../../../../src/js/helpers/searchHelper";

const mockResponse = {
    data: {
        results: [
            {
                id: "Research and Development",
                ancestors: [],
                description: "",
                count: 868,
                children: null
            },
            {
                id: "Service",
                ancestors: [],
                description: "",
                count: 2048,
                children: null
            },
            {
                id: "Product",
                ancestors: [],
                description: "",
                count: 695,
                children: null
            }
        ]
    }
};

describe('PSCCheckboxTreeContainer', () => {
    it('should load', () => {
        render(<PSCCheckboxTreeContainer />);

        const test = screen.getByText('{"isError":false,"errorMessage":"","isLoading":false,"data":[],"checked":[],"searchText":"","noResults":false,"expanded":[]}', { exact: false });

        expect(test).toBeTruthy();
    });

    it('should populate the checkbox tree with all psc groups', async () => {
        jest.spyOn(searchHelper, 'fetchPsc').mockReturnValue({ promise: Promise.resolve(mockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const testRandD = screen.getByText('Research and Development', {
                exact: false,
                normalizer: (str) => getDefaultNormalizer()(str).replace(/<span class="highlight"><\/span>/, '')
            });
            expect(testRandD).toBeTruthy();
        });

        const testService = screen.getByText('2048 codes', { exact: false });
        const testProduct = screen.getByText('Product', {
            exact: false,
            normalizer: (str) => getDefaultNormalizer()(str).replace(/<span class="highlight"><\/span>/, '')
        });

        expect(testService).toBeTruthy();
        expect(testProduct).toBeTruthy();
    });
});
