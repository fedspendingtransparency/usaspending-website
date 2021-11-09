/**
 * WithAgencySlugs-test.js
 * Created by Lizzie Salita 11/8/21
* */

import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from 'test-utils';
import * as redux from 'react-redux';
import * as api from 'apis/agencyV2';
import * as actions from 'redux/actions/agencyV2/agencyV2Actions';

import { parseAgencySlugs, useAgencySlugs } from 'containers/agencyV2/WithAgencySlugs';

let mockFetch;
let mockUseSelector;
let mockAction;

const mockAPIResponse = {
    results: [
        {
            toptier_code: "123",
            agency_slug: "department-of-sandwiches"
        },
        {
            toptier_code: "456",
            agency_slug: "ministry-of-magic"
        }
    ]
};

// eslint-disable-next-line import/prefer-default-export
export const expectedMapping = {
    'department-of-sandwiches': '123',
    'ministry-of-magic': '456'
};

beforeEach(() => {
    jest.spyOn(redux, 'useDispatch').mockReturnValue(() => (fn) => fn()).mockClear();
    mockFetch = jest.spyOn(api, 'fetchAgencySlugs').mockReturnValue({
        promise: Promise.resolve({ data: mockAPIResponse }),
        cancel: () => jest.fn()
    }).mockClear();
    mockUseSelector = jest.spyOn(redux, 'useSelector').mockReturnValue({ agencySlugs: {} }).mockClear();
    mockAction = jest.spyOn(actions, 'setAgencySlugs').mockClear();
});

test('useAgencySlugs: fetches agency slugs when they are not populated', async () => {
    renderHook(() => useAgencySlugs());
    expect(mockFetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
        expect(mockAction).toHaveBeenCalledWith(expectedMapping);
    });
});

test('useAgencySlugs: does not fetch agency slugs when they are populated', () => {
    mockUseSelector.mockReturnValue({ agencySlugs: expectedMapping });
    const { result } = renderHook(() => useAgencySlugs());
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result.current[0]).toEqual(expectedMapping);
});

test('parseAgencySlugs: returns a mapping of agency_slug: toptier_code', () => {
    const result = parseAgencySlugs(mockAPIResponse.results);
    expect(result).toEqual(expectedMapping);
});
