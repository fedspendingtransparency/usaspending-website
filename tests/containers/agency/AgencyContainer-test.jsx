/**
 * @jest-environment jsdom
 * 
 * AgencyContainer-test.jsx
 * Created by Lizzie Salita 3/1/21
 */

import React from 'react';
import { render, waitFor } from 'test-utils';
import { Route, useNavigate } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import * as agency from 'apis/agency';
import * as accountHooks from 'containers/account/WithLatestFy';
import * as queryParamHelpers from 'helpers/queryParams';
import * as agencyHooks from 'containers/agency/WithAgencySlugs';

import AgencyContainerV2 from 'containers/agency/AgencyContainer';
import { mockAgency } from '../../models/agency/BaseAgencyOverview-test';
import { mockApiCall } from '../../testResources/mockApiHelper';

mockApiCall(agency, 'fetchBudgetaryResources', {});

jest.mock('components/agency/AgencyPage', () => jest.fn(() => null));

let spy;
const mockDispatch = jest.fn();

beforeAll(() => {
    reactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatch);
});

beforeEach(() => {
    jest.clearAllMocks();
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'), // Use actual implementation for other exports
        useNavigate: () => jest.fn(), // Mock useNavigate
    }));
    jest.spyOn(accountHooks, "useLatestAccountData").mockImplementation(() => [
        null,
        [],
        { year: 2020 }
    ]);
    jest.spyOn(accountHooks, "useValidTimeBasedQueryParams").mockImplementation(() => [
        2020,
        () => { }
    ]);
    jest.spyOn(queryParamHelpers, "useQueryParams").mockImplementation(() => [
        { fy: 2020 }
    ]);
    jest.spyOn(agencyHooks, "useAgencySlugs").mockImplementation(() => [
        {
            'department-of-sandwiches': '123',
            'ministry-of-magic': '456'
        }
    ]);
    reactRedux.useDispatch.mockClear();
});

xtest('an API request is made for the agency code mapped to the slug in the URL', () => {
    const mockResponse = {
        promise: new Promise((resolve) => {
            process.nextTick(() => (
                resolve({ data: mockAgency })
            ));
        })
    };
    spy = jest.spyOn(agency, 'fetchAgencyOverview').mockReturnValueOnce(mockResponse);
    render((
        <Route path="/agency/:agencySlug"
               element={<AgencyContainerV2 />} />

    ));

    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        // TODO: update expected FY param when picker is fixed
        expect(spy).toHaveBeenCalledWith('123', 2020);
    });
});

xtest('reset agency is called when the agency slug in the URL changes', () => {
    const { rerender } = render((
        <Route path="/agency/:"
               element={<AgencyContainerV2 />} />
    ));
    expect(mockDispatch).not.toHaveBeenCalled();
    rerender((
        <Route path="/agency/ministry-of-magic"
               element={<AgencyContainerV2 />} />
    ));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'RESET_AGENCY' });
});

xtest('reset agency is called on unmount', () => {
    const { unmount } = render((
        <Route path="/agency/department-of-sandwiches"
               element={<AgencyContainerV2 />} />
    ));
    unmount();
    expect(mockDispatch).toHaveBeenLastCalledWith({ type: 'RESET_AGENCY' });
});
