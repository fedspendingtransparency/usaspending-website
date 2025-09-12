/**
 * @jest-environment jsdom
 *
 * DateRange-test.jsx
 * Created by Josue Aguilar 4/28/2025
 */

import React from 'react';
import searchFiltersReducer, { initialState } from 'redux/reducers/search/searchFiltersReducer';

import { render } from '../../../../testResources/test-utils';
import TimePeriodContainer from "../../../../../src/js/containers/search/filters/TimePeriodContainer";

describe('DateRange', () => {
    it('should clear input field after submitting', async () => {
        render(<TimePeriodContainer />);
        expect(searchFiltersReducer(undefined, {})).toEqual(initialState);
    });
});
