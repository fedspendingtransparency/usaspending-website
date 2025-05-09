/**
 * @jest-environment jsdom
 *
 * PSCCheckboxTreeContainer-test.jsx
 * Created by Josue Aguilar 4/28/2025
 */

import React from 'react';
import storeSingleton from "redux/storeSingleton";
import { combineReducers, createStore } from "redux";
import { List } from "immutable";
import { expect } from "@jest/globals";
import { waitFor } from "@testing-library/react";

import PSCCheckboxTreeContainer from "containers/search/filters/psc/PSCCheckboxTreeContainer";
import { render, screen } from '../../../../testResources/test-utils';
import * as pscReducer from "../../../../../src/js/redux/reducers/search/pscReducer";
import appliedFiltersReducer from "../../../../../src/js/redux/reducers/search/appliedFiltersReducer";
import searchFiltersReducer from "../../../../../src/js/redux/reducers/search/searchFiltersReducer";
import * as searchHelper from "../../../../../src/js/helpers/searchHelper";

const mockPSCReducers = combineReducers({
    psc: pscReducer.default,
    appliedFilters: appliedFiltersReducer,
    filters: searchFiltersReducer
});

const mockData = {
    appliedFilters: {
        filters: {
            pscCodes: { require: new Set(), exclude: new Set(), counts: new Set() }
        },
        _empty: true,
        _complete: true
    },
    psc: {
        psc: new List(),
        expanded: new List(),
        searchExpanded: new List(),
        checked: new List(),
        unchecked: new List(),
        counts: new List()
    }
};

const store = createStore(mockPSCReducers, mockData);
storeSingleton.setStore(store);

// mocking the child component to stringify the props being passed down.
// This allows us to search the string for proper props
jest.mock('../../../../../src/js/components/sharedComponents/CheckboxTree', () => (childProps) => (
    <div>{JSON.stringify(childProps)}</div>
));

// jest.mock('../searchHelper', () => {
//     const originalModule = jest.requireActual('../searchHelper');
//
//     return {
//         __esModule: true,
//         ...originalModule,
//         fetchPSC: jest.fn(() => ({
//             data: {
//                 results: [
//                     {
//                         id: "Research and Development",
//                         ancestors: [],
//                         description: "",
//                         count: 868,
//                         children: null
//                     }
//                 ]
//             }
//         }))
//     };
// });

const mockResponse = {
    data: {
        results: [
            {
                id: "Research and Development",
                ancestors: [],
                description: "",
                count: 868,
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
            expect(screen.getByText('"Research and Development",', { exact: false })).toBeTruthy();
        });

        const test = screen.getByText('{"isError":false,"errorMessage":"","isLoading":false,"data":[{"id":"Research and Development","ancestors":[],"description":"","count":868,"children":[{"isPlaceHolder":true,"label":"Placeholder Child","value":"children_of_Research and Development"}],"label":"","value":"Research and Development"}],"checked":[],"searchText":"","noResults":false,"expanded":[]}', { exact: false });

        expect(test).toBeTruthy();
    });
});
