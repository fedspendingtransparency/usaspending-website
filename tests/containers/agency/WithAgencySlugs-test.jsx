/**
 * @jest-environment jsdom
 * 
 * WithAgencySlugs-test.js
 * Created by Lizzie Salita 11/8/21
* */

import { mapSlugToTopTierCode, mapTopTierCodeToSlug, useAgencySlugs, mapIdToSlug, mapTopTierCodeToOutlay } from 'containers/agency/WithAgencySlugs';
import { renderHook } from '@testing-library/react-hooks';
import * as redux from 'react-redux';
import * as api from 'apis/agency';
import * as actions from 'redux/actions/agency/agencyActions';
import { waitFor } from '../../testResources/test-utils';

let mockFetch;
let mockUseSelector;
let mockAction;

const mockAPIResponse = {
    results: [
        {
            toptier_code: "123",
            agency_slug: "department-of-sandwiches",
            agency_id: "12",
            outlay_amount: 123456789
        },
        {
            toptier_code: "456",
            agency_slug: "ministry-of-magic",
            agency_id: "23",
            outlay_amount: 456789423
        }
    ]
};

const mockSlugsMapping = {
    'department-of-sandwiches': '123',
    'ministry-of-magic': '456'
};

const mockTopTierMapping = {
    123: 'department-of-sandwiches',
    456: 'ministry-of-magic'
};

const mockIdMapping = {
    12: 'department-of-sandwiches',
    23: 'ministry-of-magic'
};

const mockOutlayMapping = {
    123: 123456789,
    456: 456789423
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
        expect(mockAction).toHaveBeenCalledWith(mockSlugsMapping, mockTopTierMapping, mockIdMapping, mockOutlayMapping);
    });
});

test('useAgencySlugs: does not fetch agency slugs when they are populated', () => {
    mockUseSelector.mockReturnValue({ agencySlugs: mockSlugsMapping });
    const { result } = renderHook(() => useAgencySlugs());
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result.current[0]).toEqual(mockSlugsMapping);
});

test('mapSlugToTopTierCode: returns a mapping of agency_slug: toptier_code', () => {
    const result = mapSlugToTopTierCode(mockAPIResponse.results);
    expect(result).toEqual(mockSlugsMapping);
});

test('mapTopTierCodeToSlug: returns a mapping of toptier_code: agency_slug', () => {
    const result = mapTopTierCodeToSlug(mockAPIResponse.results);
    expect(result).toEqual(mockTopTierMapping);
});

test('mapIdToSlug: returns a mapping of agency_id: agency_slug', () => {
    const result = mapIdToSlug(mockAPIResponse.results);
    expect(result).toEqual(mockIdMapping);
});

test('mapTopTierCodeToOutlay: returns a mapping of toptier_code: outlay', () => {
    const result = mapTopTierCodeToOutlay(mockAPIResponse.results);
    expect(result).toEqual(mockOutlayMapping);
});
