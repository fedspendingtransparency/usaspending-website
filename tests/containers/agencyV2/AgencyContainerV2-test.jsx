/**
 * AgencyContainerV2-test.jsx
 * Created by Lizzie Salita 3/1/21
 */

import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import { Route } from 'react-router-dom';
import * as agencyV2Helper from 'helpers/agencyV2Helper';

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

const mockReject = {
    promise: new Promise((resolve, reject) => {
        process.nextTick(() => (
            reject(new Error('mock error'))
        ));
    })
};

const mockResponse = {
    promise: new Promise((resolve) => {
        process.nextTick(() => (
            resolve({ data: mockData })
        ));
    })
};

test('page loading message displays on mount', () => {
    render((
        <Route path="/agency_v2/:agencyId" location={{ pathname: '/agency_v2/123' }}>
            <AgencyContainerV2 />
        </Route >
    ));
    expect(screen.queryByText('Loading...')).toBeTruthy();
});

test('on network error, an error message displays', () => {
    jest.spyOn(agencyV2Helper, 'fetchAgencyOverview').mockReturnValue(mockReject);
    render((
        <AgencyContainerV2 />
    ));
    return waitFor(() => {
        expect(screen.queryByText('An error occurred')).toBeTruthy();
    });
});

test('an API request is made for the agency code in the URL', () => {
    const spy = jest.spyOn(agencyV2Helper, 'fetchAgencyOverview').mockClear();
    render((
        <Route path="/agency_v2/:agencyId" location={{ pathname: '/agency_v2/123' }}>
            <AgencyContainerV2 />
        </Route >
    ));

    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        // TODO: update expected FY param when picker is fixed
        expect(spy).toHaveBeenCalledWith('123', 2021);
    });
});
