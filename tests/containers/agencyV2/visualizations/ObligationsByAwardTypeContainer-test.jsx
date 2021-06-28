/**
 * ObligationsByAwardTypeContainer-test.jsx
 * Created by Brett Varney 6/28/21
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

// mockApiCall(agencyV2, 'fetchObligationsByAwardType', {});

let spy;

// beforeEach(() => {
//     jest.clearAllMocks();
//     jest.spyOn(accountHooks, "useLatestAccountData").mockImplementation(() => [
//         null,
//         [],
//         { year: 2020 }
//     ]);
//     jest.spyOn(accountHooks, "useValidTimeBasedQueryParams").mockImplementation(() => [
//         2020,
//         () => { }
//     ]);
//     jest.spyOn(queryParamHelpers, "useQueryParams").mockImplementation(() => [
//         { fy: 2020 }
//     ]);
// });

test('an API request is made for obligations by award type', () => {
    const mockResponse = {
        promise: Promise.resolve({
            data: {
                "total_aggregated_amount": 0,
                "results": [
                    { "category": "contracts", "aggregated_amount": 0 },
                    { "category": "direct_payments", "aggregated_amount": 0 },
                    { "category": "grants", "aggregated_amount": 0 },
                    { "category": "idv", "aggregated_amount": 0 },
                    { "category": "loans", "aggregated_amount": 0 },
                    { "category": "other", "aggregated_amount": 0 }
                ]
            }
        })
    }
    // spy.mockClear();
    spy = jest.spyOn(agencyV2, 'fetchObligationsByAwardType').mockReturnValueOnce(mockResponse);
    render((
        <Route path="/agency_v2/:agencyId?fy=2020" location={{ pathname: '/agency_v2/123' }}>
            <AgencyContainerV2 />
        </Route >
    ));

    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('123', 2020);
    });
});
