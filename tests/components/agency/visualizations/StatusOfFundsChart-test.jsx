/**
 * @jest-environment jsdom
 * 
 * StatusOfFundsChart-test.jsx
 * Created by Afna Saifudeen 11/23/21
 */

import React from 'react';
import { render, waitFor, screen } from 'test-utils';
import * as api from "apis/agency";
import StatusOfFundsChart from "components/agency/visualizations/StatusOfFundsChart";
// import VisualizationSection from 'components/agency/statusOfFunds/VisualizationSection';
import { defaultState } from "../../../testResources/defaultReduxFilters";

const mockChartData = {
    page_metadata: {
        page: 1,
        total: 1,
        limit: 2,
        next: 2,
        previous: null,
        hasNext: true,
        hasPrevious: false
    },
    results: [
        {
            name: "National Oceanic and Atmospheric Administration",
            total_budgetary_resources: 9100000000,
            total_obligations: 6000000000
        },
        {
            name: "Bureau of the Census",
            total_budgetary_resources: 4400000000,
            total_obligations: 2500000000
        },
        {
            name: "U.S. Patent and Trademark Office",
            total_budgetary_resources: 4200000000,
            total_obligations: 2700000000
        },
        {
            name: "Economic Development Administration",
            total_budgetary_resources: 4150000000,
            total_obligations: 1300000000
        },
        {
            name: "National Telecommunications and Information Administration",
            total_budgetary_resources: 2100000000,
            total_obligations: 50000000
        },
        {
            name: "National Institute of Standards and Technology",
            total_budgetary_resources: 1900000000,
            total_obligations: 1560000000
        },
        {
            name: "International Trade Administration",
            total_budgetary_resources: 1010000000,
            total_obligations: 960000000
        },
        {
            name: "Departmental Management",
            total_budgetary_resources: 100500000,
            total_obligations: 905000000
        },
        {
            name: "Bureau of Industry and Security",
            total_budgetary_resources: 10500000,
            total_obligations: 9050000
        },
        {
            name: "Bureau of Economic Analysis",
            total_budgetary_resources: 5000000,
            total_obligations: 4000000
        }
    ]
};
const mockChartDataNegative = {
    page_metadata: {
        page: 1,
        total: 1,
        limit: 2,
        next: 2,
        previous: null,
        hasNext: true,
        hasPrevious: false
    },
    results: [
        {
            name: "National Oceanic and Atmospheric Administration",
            total_budgetary_resources: 9100000000,
            total_obligations: 6000000000
        },
        {
            name: "Bureau of the Census",
            total_budgetary_resources: 4400000000,
            total_obligations: -2500000000
        },
        {
            name: "U.S. Patent and Trademark Office",
            total_budgetary_resources: 4200000000,
            total_obligations: -2700000000
        }
    ]
};
const fy = '2021';
// const toptierCode = '012';
// const name = 'Department of Agriculture';

let spy;

beforeEach(() => {
    jest.clearAllMocks();
});


describe('StatusOfFundsChart', () => {
    it('should display formatted amount used for max x axis value', () => {
        render(<StatusOfFundsChart results={mockChartData.results} fy={fy} level={0} />);
        // set timeout to wait for expect() to pass after call to render
        setTimeout(() => {
            expect(screen.getByText('$9.1B').toBeInTheDocument());
        }, 1000);
    });
    it('should display subcomponent names as y axis labels', () => {
        render(<StatusOfFundsChart results={mockChartData.results} fy={fy} level={0} />);
        // set timeout to wait for expect() to pass after call to render
        setTimeout(() => {
            for (let i = 0; i < mockChartData.results.length; i++) {
                expect(screen.getByText(mockChartData.results[i].name).toBeInTheDocument());
            }
        }, 1000);
    });
    // commenting this out because we're getting the name from redux now and can't mock it correctly at this time
    // it('should display fy, agency name, and level in chart title', () => {
    //     render(<VisualizationSection agencyId={toptierCode} agencyName={name} fy={fy} results={mockChartData.results} level={0} />);
    //     // set timeout to wait for expect() to pass after call to render
    //     setTimeout(() => {
    //         expect(screen.getByText(`${name} by Sub-Component for FY 2021`).toBeInTheDocument());
    //     }, 1000);
    // });
    it('should display negative formatted amount used for max x axis value', () => {
        render(<StatusOfFundsChart results={mockChartDataNegative.results} fy={fy} level={0} />);
        // set timeout to wait for expect() to pass after call to render
        setTimeout(() => {
            expect(screen.getByText('-$2.5B').toBeInTheDocument());
        }, 1000);
    });
    it('should display $0 axis when positive and negative values are present', () => {
        render(<StatusOfFundsChart results={mockChartDataNegative.results} fy={fy} level={0} />);
        // set timeout to wait for expect() to pass after call to render
        setTimeout(() => {
            expect(screen.getByText('$0').toBeInTheDocument());
        }, 1000);
    });
    it("should make an API call on level change", () => {
        // spy on the API request helper functions
        spy = jest.spyOn(api, "fetchSubcomponentsList").mockReturnValue({
            promise: Promise.resolve({
                data: {
                    results: mockChartData,
                    page_metadata: {
                        total: 20
                    }
                }
            }),
            cancel: jest.fn()
        });

        const { rerender } = render(
            <StatusOfFundsChart
                results={mockChartData.results}
                fy={fy}
                level={0} />,
            {
                initialState: {
                    ...defaultState
                }
            }
        );
        waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
        spy = jest.spyOn(api, "fetchFederalAccountsList").mockReturnValue({
            promise: Promise.resolve({
                data: {
                    results: mockChartData,
                    page_metadata: {
                        total: 20
                    }
                }
            }),
            cancel: jest.fn()
        });
        // re-render with different defcParams
        rerender(
            <StatusOfFundsChart
                results={mockChartData.results}
                fy={fy}
                level={1} />,
            {
                initialState: {
                    ...defaultState
                }
            }
        );
        waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });
});
