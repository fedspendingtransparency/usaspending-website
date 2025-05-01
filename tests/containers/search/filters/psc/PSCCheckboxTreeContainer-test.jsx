/**
 * @jest-environment jsdom
 *
 * PSCCheckboxTreeContainer-test.jsx
 * Created by Josue Aguilar 4/28/2025
 */

import React from 'react';
import storeSingleton from "redux/storeSingleton";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { combineReducers, createStore } from "redux";
import { List } from "immutable";

import PSCCheckboxTreeContainer from "containers/search/filters/psc/PSCCheckboxTreeContainer";
import EntityDropdownAutocomplete from "components/search/filters/location/EntityDropdownAutocomplete";
import CheckboxTree from "components/sharedComponents/CheckboxTree";
import * as pscReducer from "../../../../../src/js/redux/reducers/search/pscReducer";
import appliedFiltersReducer from "../../../../../src/js/redux/reducers/search/appliedFiltersReducer";
import searchFiltersReducer from "../../../../../src/js/redux/reducers/search/searchFiltersReducer";

const mockPSCReducers = combineReducers({
    psc: pscReducer.default,
    appliedFilters: appliedFiltersReducer.default,
    filters: searchFiltersReducer.default
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

jest.mock('components/search/filters/location/EntityDropdownAutocomplete', () => {
    jest.fn(() => null);
});

jest.mock('components/sharedComponents/CheckboxTree', () => {
    jest.fn((props) => (
        <div>
            isError={props.isError}
            errorMessage={props.errorMessage}
            isLoading={props.isLoading}
            data={props.nodes}
            checked={props.checked}
            searchText={props.searchString}
            noResults={props.showNoResults}
            expanded={props.isSearch}
            onUncheck={props.onUncheck}
            onCheck={props.onCheck}
            onExpand={props.onExpand}
            onCollapse={props.onCollapse}
        </div>
    ));
});

jest.mock('../searchHelper', () => {
    const originalModule = jest.requireActual('../searchHelper');

    return {
        __esModule: true,
        ...originalModule,
        fetchPSC: jest.fn(() => ({
            results: [
                {
                    id: "Research and Development",
                    ancestors: [],
                    description: "",
                    count: 868,
                    children: null
                }
            ]
        }))
    };
});

describe('PSCCheckboxTreeContainer', () => {
    it('should load i guess', () => {
        console.log(store);
        render(<Provider store={store}><PSCCheckboxTreeContainer /></Provider>);

        expect(CheckboxTree).toBe(false);
    });
});
