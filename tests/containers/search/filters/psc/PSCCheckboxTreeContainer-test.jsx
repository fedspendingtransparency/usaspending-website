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
import { render, screen, act, fireEvent } from '../../../../testResources/test-utils';
import * as searchHelper from "../../../../../src/js/helpers/searchHelper";

const initialMockResponse = {
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

const agriMockResponse = {
    data: {
        results: [
            {
                id: "Research and Development",
                ancestors: [],
                description: "",
                count: 868,
                children: [
                    {
                        id: "AA",
                        ancestors: [
                            "Research and Development"
                        ],
                        description: "AGRICULTURE R&D SERVICES",
                        count: 39,
                        children: null
                    }
                ]
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
    it('should populate the checkbox tree with all psc groups', async () => {
        jest.spyOn(searchHelper, 'fetchPsc').mockReturnValue({ promise: Promise.resolve(initialMockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const rAndDTest = screen.getByText('Research and Development', {
                exact: false,
                normalizer: (str) => getDefaultNormalizer()(str).replace(/<span class="highlight"><\/span>/, '')
            });
            expect(rAndDTest).toBeTruthy();
        });

        const serviceTest = screen.getByText('2048 codes', { exact: false });
        const productTest = screen.getByText('Product', {
            exact: false,
            normalizer: (str) => getDefaultNormalizer()(str).replace(/<span class="highlight"><\/span>/, '')
        });

        expect(serviceTest).toBeTruthy();
        expect(productTest).toBeTruthy();
    });

    it('should populate the checkbox tree search results', async () => {
        jest.spyOn(searchHelper, 'fetchPsc').mockReturnValueOnce({ promise: Promise.resolve(initialMockResponse) });

        render(<PSCCheckboxTreeContainer />);

        await waitFor(() => {
            const rAndDTest = screen.getByText('Research and Development', {
                exact: false,
                normalizer: (str) => getDefaultNormalizer()(str).replace(/<span class="highlight"><\/span>/, '')
            });

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
});
