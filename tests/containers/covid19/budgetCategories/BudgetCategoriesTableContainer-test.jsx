/**
 * @jest-environment jsdom
 * 
 * BudgetCategoriesTableContainer-test.js
 * Created by Lizzie Salita 10/15/21
 * */

import React from "react";
import { render, waitFor, screen } from "test-utils";
import { expect } from '@jest/globals';
import BudgetCategoriesTableContainer from "containers/covid19/budgetCategories/BudgetCategoriesTableContainer";
import * as api from "apis/disaster";
import * as hooks from "containers/agency/WithAgencySlugs";
import { defaultState } from "../../../testResources/defaultReduxFilters";

const mockResults = [{
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
}];

let spy;

beforeEach(() => {
    jest.clearAllMocks();
});

describe("BudgetCategoriesTableContainer", () => {
    it("should make an API call when the DEFC params change", () => {
        // spy on the API request helper functions
        spy = jest.spyOn(api, "fetchDisasterSpending").mockReturnValue({
            promise: Promise.resolve({
                data: {
                    results: mockResults,
                    page_metadata: {
                        total: 20
                    }
                }
            }),
            cancel: jest.fn()
        });

        const { rerender } = render(
            <BudgetCategoriesTableContainer
                type="agency"
                subHeading="sub heading"
                scrollIntoView={jest.fn()} />,
            {
                initialState: {
                    ...defaultState,
                    covid19: {
                        defcParams: ["A", "B", "C"]
                    }
                }
            }
        );
        waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
        // re-render with different defcParams
        rerender(
            <BudgetCategoriesTableContainer
                type="agency"
                subHeading="sub heading"
                scrollIntoView={jest.fn()} />,
            {
                initialState: {
                    ...defaultState,
                    covid19: {
                        defcParams: ["Z"]
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
        jest.spyOn(api, "fetchDisasterSpending").mockReturnValue({
            promise: Promise.resolve({
                data: {
                    results: mockResults,
                    page_metadata: {
                        total: 20
                    }
                }
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
            <BudgetCategoriesTableContainer
                type="agency"
                subHeading="sub heading"
                scrollIntoView={jest.fn()} />,
            {
                initialState: {
                    ...defaultState
                }
            }
        );
        waitFor(() => {
            expect(screen.getByText(mockResults[0].description))
                .toHaveAttribute('href', '/agency/department-of-sandwiches');
        });
    });
    it('should just display the agency name (with no link) if no slug mapping is available', () => {
        // Mock the API response
        jest.spyOn(api, "fetchDisasterSpending").mockReturnValue({
            promise: Promise.resolve({
                data: {
                    results: mockResults,
                    page_metadata: {
                        total: 20
                    }
                }
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
            <BudgetCategoriesTableContainer
                type="agency"
                subHeading="sub heading"
                scrollIntoView={jest.fn()} />,
            {
                initialState: {
                    ...defaultState
                }
            }
        );
        waitFor(() => {
            expect(screen.getByText(mockResults[1].description))
                .not.toHaveAttribute('href');
        });
    });
});
