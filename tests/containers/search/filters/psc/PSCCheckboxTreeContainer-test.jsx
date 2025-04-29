/**
 * @jest-environment jsdom
 *
 * PSCCheckboxTreeContainer-test.jsx
 * Created by Josue Aguilar 4/28/2025
 */

import React from 'react';

import PSCCheckboxTreeContainer from "containers/search/filters/psc/PSCCheckboxTreeContainer";
import EntityDropdownAutocomplete from "components/search/filters/location/EntityDropdownAutocomplete";
import CheckboxTree from "components/sharedComponents/CheckboxTree";
import { render } from "@testing-library/react";

jest.mock('components/search/filters/location/EntityDropdownAutocomplete', () => {
    jest.fn(() => null);
});

jest.mock('components/sharedComponents/CheckboxTree', () => {
    jest.fn(() => null);
});

describe('PSCCheckboxTreeContainer', () => {
    it('should load i guess', () => {
        render(<PSCCheckboxTreeContainer />);
    });
});
