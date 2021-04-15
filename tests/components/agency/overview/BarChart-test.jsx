/**
 * BarChart-test.jsx
 * Created by Max Kendall 4/13/21
 */

import React from 'react';

import { render, screen } from 'test-utils';
import BarChart from 'components/agencyV2/overview/BarChart';

import { mockTotalBudgetaryResources } from './mockData';

const mockData = mockTotalBudgetaryResources
    .map((obj) => ({ year: obj.fiscal_year, budget: obj.agency_budgetary_resources }));

test.each([
    ['2026', ['FY 26', 'FY 25', 'FY 24', 'FY 23', 'FY 22']],
    ['2025', ['FY 25', 'FY 24', 'FY 23', 'FY 22', 'FY 21']],
    ['2024', ['FY 24', 'FY 23', 'FY 22', 'FY 21', 'FY 20']],
    ['2023', ['FY 23', 'FY 22', 'FY 21', 'FY 20', 'FY 19']],
    ['2022', ['FY 22', 'FY 21', 'FY 20', 'FY 19', 'FY 18']],
    ['2021', ['FY 21', 'FY 20', 'FY 19', 'FY 18', 'FY 17']],
    ['2020', ['FY 21', 'FY 20', 'FY 19', 'FY 18', 'FY 17']],
    ['2019', ['FY 21', 'FY 20', 'FY 19', 'FY 18', 'FY 17']],
    ['2018', ['FY 21', 'FY 20', 'FY 19', 'FY 18', 'FY 17']],
    ['2017', ['FY 21', 'FY 20', 'FY 19', 'FY 18', 'FY 17']]
])('when fy is %s we show these fy: %s', (selectedFy, arrOfDisplayedFy) => {
    // idea is to only show preceding FY when selected FY is LTE 2021
    render(<BarChart selectedFy={selectedFy} agencyBudgetByYear={mockData} />);
    arrOfDisplayedFy
        .forEach((str) => {
            expect(screen.getByText(str)).toBeTruthy();
        });
});
