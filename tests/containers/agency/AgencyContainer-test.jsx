/**
 * @jest-environment jsdom
 *
 * AgencyContainer-test.jsx
 * Created by Lizzie Salita 3/1/21
 */

import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { renderWithoutRouter, waitFor } from 'test-utils';
import { Route, Routes, MemoryRouter } from 'react-router';
import * as reactRedux from 'react-redux';
import * as agency from 'apis/agency';
import * as accountHooks from 'containers/account/WithLatestFy';
import AgencyContainerV2 from 'containers/agency/AgencyContainer';
import * as useQueryParams from "../../../src/js/hooks/useQueryParams";
import * as useAgencySlugs from "../../../src/js/hooks/useAgencySlugs";
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
    // jest.clearAllMocks();
    jest.spyOn(accountHooks, "useLatestAccountData").mockImplementation(() => [
        null,
        [],
        { year: 2020 }
    ]);
    jest.spyOn(accountHooks, "useValidTimeBasedQueryParams").mockImplementation(() => [
        2020,
        () => { }
    ]);
    jest.spyOn(useQueryParams, "default").mockImplementation(() => ({ fy: 2020 }));
    jest.spyOn(useAgencySlugs, "default").mockImplementation(() => ([
        {
            'department-of-sandwiches': '123',
            'ministry-of-magic': '456'
        }
    ]));
    reactRedux.useDispatch.mockClear();
});

test('an API request is made for the agency code mapped to the slug in the URL', () => {
    const mockResponse = {
        promise: new Promise((resolve) => {
            process.nextTick(() => (
                resolve({ data: mockAgency })
            ));
        })
    };
    spy = jest.spyOn(agency, 'fetchAgencyOverview').mockReturnValueOnce(mockResponse);

    /* eslint-disable function-paren-newline */
    renderWithoutRouter(
        <MemoryRouter initialEntries={['/agency/department-of-sandwiches']}>
            <Routes>
                <Route
                    path="/agency/:agencySlug"
                    element={<AgencyContainerV2 />} />
            </Routes>
        </MemoryRouter>
    );
    /* eslint-enable function-paren-newline */

    return waitFor(async () => {
        // TODO: update expected FY param when picker is fixed
        expect(spy).toHaveBeenCalledWith('123', 2020);
        // expect(spy).toHaveBeenCalledWithBeenCalledTimes(1);
    });
});

xtest('reset agency is called when the agency slug in the URL changes', () => {
    /* eslint-disable function-paren-newline */
    const { rerender } = renderWithoutRouter(
        <MemoryRouter initialEntries={['/agency/department-of-sandwiches', '/agency/ministry-of-magic']}>
            <Routes>
                <Route
                    path="/agency/:agencySlug"
                    element={<AgencyContainerV2 />} />
            </Routes>
        </MemoryRouter>
    );
    /* eslint-enable function-paren-newline */

    expect(mockDispatch).not.toHaveBeenCalled();

    /* eslint-disable function-paren-newline */
    rerender(
        <MemoryRouter initialEntries={['/agency/ministry-of-magic']}>
            <Routes>
                <Route
                    path="/agency/:agencySlug"
                    element={<AgencyContainerV2 />} />
            </Routes>
        </MemoryRouter>
    );
    /* eslint-enable function-paren-newline */

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'RESET_AGENCY' });
});

test('reset agency is called on unmount', () => {
    /* eslint-disable function-paren-newline */
    const { unmount } = renderWithoutRouter(
        <MemoryRouter initialEntries={['/agency/department-of-sandwiches']}>
            <Routes>
                <Route
                    path="/agency/:agencySlug"
                    element={<AgencyContainerV2 />} />
            </Routes>
        </MemoryRouter>
    );
    /* eslint-enable function-paren-newline */
    unmount();
    expect(mockDispatch).toHaveBeenLastCalledWith({ type: 'RESET_AGENCY' });
});
