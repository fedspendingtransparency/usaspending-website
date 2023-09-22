/**
 * @jest-environment jsdom
 * 
 * AwardSpendingAgencyTableContainer-test.js
 * Created by Lizzie Salita 12/15/21
 * */

import React from "react";
import { render, waitFor, screen } from "test-utils";
import { expect } from '@jest/globals';
import AwardSpendingAgencyTableContainer from "containers/covid19/awardSpendingAgency/AwardSpendingAgencyTableContainer";
import * as api from "apis/disaster";
import * as hooks from "containers/agency/WithAgencySlugs";
import { defaultState } from "../../../testResources/defaultReduxFilters";

const mockData = {
    totals: {
        obligation: 2000,
        outlay: 3000,
        total_budgetary_resources: 6000
    },
    results: [{
        id: 123,
        code: "045",
        description: "Department of Sandwiches",
        children: [],
        award_count: 25,
        obligation: 2000,
        outlay: 1500,
        total_budgetary_resources: 2500
    }, {
        id: 789,
        code: "000",
        description: "Ministry of Magic",
        children: [],
        award_count: 23,
        obligation: 1000,
        outlay: 700,
        total_budgetary_resources: 2000
    }],
    page_metadata: {
        page: 1,
        total: 44,
        limit: 10
    }
};

let spy;

const redux = {
    ...defaultState,
    covid19: {
        defcParams: ["A", "B", "C"],
        spendingByAgencyTotals: {
            obligation: 2000,
            outlay: 1600,
            awardCount: 250
        }
    }
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe("AwardSpendingAgencyTableContainer", () => {
    window.scrollTo = jest.fn();
    it("should make an API call when the DEFC params change", () => {
        // spy on the API request helper functions
        spy = jest.spyOn(api, "fetchAwardSpendingByAgency").mockReturnValue({
            promise: Promise.resolve({
                data: mockData
            }),
            cancel: jest.fn()
        });

        const { rerender } = render(
            <AwardSpendingAgencyTableContainer
                type="all"
                scrollIntoView={jest.fn()} />,
            {
                initialState: redux
            }
        );
        waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
        // re-render with different defcParams
        rerender(
            <AwardSpendingAgencyTableContainer
                type="all"
                scrollIntoView={jest.fn()} />,
            {
                initialState: {
                    ...defaultState,
                    covid19: {
                        defcParams: ["Z"],
                        spendingByAgencyTotals: {
                            obligation: 2000,
                            outlay: 1600,
                            awardCount: 250
                        }
                    }
                }
            }
        );
        waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });

    it('should use agency slug for the agency URLs if Agency Profile v2 has been released', () => {
        // Mock the API response
        jest.spyOn(api, "fetchAwardSpendingByAgency").mockReturnValue({
            promise: Promise.resolve({
                data: mockData
            }),
            cancel: jest.fn()
        });
        // Mock the custom hook, useAgencySlugs
        jest.spyOn(hooks, "useAgencySlugs").mockReturnValue([
            {},
            {
                "045": 'department-of-sandwiches',
                "000": 'ministry-of-magic'
            },
            false,
            false
        ]);

        render(
            <AwardSpendingAgencyTableContainer
                type="all"
                scrollIntoView={jest.fn()} />,
            {
                initialState: redux
            }
        );
        waitFor(() => {
            expect(screen.getByText(mockData.results[0].description))
                .toHaveAttribute('href', '/agency_v2/department-of-sandwiches');
        });
    });
    it('should just display the agency name (with no link) if no slug mapping is available', () => {
        // Mock the API response
        jest.spyOn(api, "fetchAwardSpendingByAgency").mockReturnValue({
            promise: Promise.resolve({
                data: mockData
            }),
            cancel: jest.fn()
        });

        // Mock the custom hook, useAgencySlugs
        jest.spyOn(hooks, "useAgencySlugs").mockReturnValue([
            {},
            { "045": 'department-of-sandwiches' },
            false,
            false
        ]);

        render(
            <AwardSpendingAgencyTableContainer
                type="all"
                scrollIntoView={jest.fn()} />,
            {
                initialState: redux
            }
        );
        waitFor(() => {
            expect(screen.getByText(mockData.results[1].description))
                .not.toHaveAttribute('href');
        });
    });
});
