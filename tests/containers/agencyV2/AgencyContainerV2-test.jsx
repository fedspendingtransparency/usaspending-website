/**
 * AgencyContainerV2-test.jsx
 * Created by Lizzie Salita 3/1/21
 */

import React from 'react';
import { render, waitFor } from 'test-utils';
import { Route } from 'react-router-dom';
import * as agencyV2 from 'apis/agencyV2';
import * as accountHooks from 'containers/account/WithLatestFy';
import * as queryParamHelpers from 'helpers/queryParams';

import AgencyContainerV2 from 'containers/agencyV2/AgencyContainerV2';
import { mockAgency } from '../../models/agency/BaseAgencyOverview-test';
import { mockApiCall } from '../../testResources/mockApiHelper';

mockApiCall(agencyV2, 'fetchBudgetaryResources', {});

let spy;

beforeEach(() => {
    jest.clearAllMocks();
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
});

test('an API request is made for the agency code in the URL', () => {
    const mockResponse = {
        promise: new Promise((resolve) => {
            process.nextTick(() => (
                resolve({ data: mockAgency })
            ));
        })
    };
    // spy.mockClear();
    spy = jest.spyOn(agencyV2, 'fetchAgencyOverview').mockReturnValueOnce(mockResponse);
    render((
        <Route path="/agency_v2/:agencyId" location={{ pathname: '/agency_v2/123' }}>
            <AgencyContainerV2 />
        </Route >
    ));

    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        // TODO: update expected FY param when picker is fixed
        expect(spy).toHaveBeenCalledWith('123', 2020);
    });
});
