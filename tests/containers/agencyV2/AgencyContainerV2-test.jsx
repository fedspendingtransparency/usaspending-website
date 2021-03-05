/**
 * AgencyContainerV2-test.jsx
 * Created by Lizzie Salita 3/1/21
 */

import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import { Route } from 'react-router-dom';
import * as agencyV2Helper from 'helpers/agencyV2Helper';
import * as accountHooks from 'containers/account/WithLatestFy';
import * as queryParamHelpers from 'helpers/queryParams';

import AgencyContainerV2 from 'containers/agencyV2/AgencyContainerV2';

// TODO: share mock data with data model unit tests once they are written
const mockData = {
    fiscal_year: 2019,
    toptier_code: "123",
    name: "Mock Agency",
    abbreviation: "MOCK",
    agency_id: 22,
    icon_filename: "mock.jpg",
    mission: "Mock Agency...",
    website: "https://www.treasury.gov/",
    congressional_justification_url: "https://www.treasury.gov/cj",
    about_agency_data: null,
    subtier_agency_count: 10,
    messages: []
};

const mockResponse = {
    promise: new Promise((resolve) => {
        process.nextTick(() => (
            resolve({ data: mockData })
        ));
    })
};

let spy;

beforeEach(() => {
    jest.spyOn(accountHooks, "useLatestAccountData").mockImplementation(() => {
        return [
            null,
            [],
            { year: 2020 }
        ];
    });
    jest.spyOn(accountHooks, "useValidTimeBasedQueryParams").mockImplementation(() => {
        return [
            2020,
            () => { }
        ];
    });
    jest.spyOn(queryParamHelpers, "useQueryParams").mockImplementation(() => {
        return [
            { fy: 2020 }
        ];
    });
});

test('on network error, an error message displays', () => {
    const mockReject = {
        promise: new Promise((resolve, reject) => {
            process.nextTick(() => (
                reject(new Error('mock error'))
            ));
        })
    };
    spy = jest.spyOn(agencyV2Helper, 'fetchAgencyOverview').mockReturnValueOnce(mockReject);
    render((
        <Route path="/agency_v2/:agencyId" location={{ pathname: '/agency_v2/123' }}>
            <AgencyContainerV2 />
        </Route >
    ));
    return waitFor(() => {
        expect(screen.queryByText('An error occurred')).toBeTruthy();
    });
});

test('an API request is made for the agency code in the URL', () => {
    spy.mockClear();
    spy = jest.spyOn(agencyV2Helper, 'fetchAgencyOverview').mockReturnValueOnce(mockResponse);
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

