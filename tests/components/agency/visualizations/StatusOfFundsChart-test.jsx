/**
 * StatusOfFundsChart-test.jsx
 * Created by Afna Saifudeen 11/23/21
 */

import React from 'react';
import { render, screen } from 'test-utils';
import StatusOfFundsChart from "../../../../src/js/components/agencyV2/visualizations/StatusOfFundsChart";
import VisualizationSection from '../../../../src/js/components/agencyV2/statusOfFunds/VisualizationSection';

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
const fy = '2021';
const toptierCode = '012';
const name = 'Department of Agriculture';
describe('Status of Funds Chart Viz Agency v2', () => {
    it('should display formatted amount used for max x axis value', () => {
        render(<StatusOfFundsChart data={mockChartData} />);
        // set timeout to wait for expect() to pass after call to render
        setTimeout(() => {
            expect(screen.getByText('$9.1B').toBeInTheDocument());
        }, 1000);
    });
    it('should display fy, agency name, and level in chart title', () => {
        render(<VisualizationSection agencyId={toptierCode} agencyName={name} fy={fy} data={mockChartData} level={0} />);
        // set timeout to wait for expect() to pass after call to render
        setTimeout(() => {
            expect(screen.getByText(`${name} by Sub-Component for FY 2021`).toBeInTheDocument());
        }, 1000);
    });
});
