/**
 * BudgetCategoriesTableContainer-test.js
 * Created by Lizzie Salita 10/15/21
 * */

import React from "react";
import { render, waitFor } from "test-utils";
import "@testing-library/jest-dom/extend-expect";
import BudgetCategoriesTableContainer from "containers/covid19/budgetCategories/BudgetCategoriesTableContainer";
import * as api from "apis/disaster";
import { defaultState } from "../../../testResources/defaultReduxFilters";

const mockResults = [{
    id: 123,
    code: "020",
    description: "Department of the Treasury",
    children: [],
    award_count: 25,
    obligation: 2000,
    outlay: 1500,
    total_budgetary_resources: 2500
}, {
    id: 123,
    code: "020",
    description: "Small Business Administration",
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
});
