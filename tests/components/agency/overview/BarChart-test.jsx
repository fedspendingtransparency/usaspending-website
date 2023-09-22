/**
 * @jest-environment jsdom
 * 
 * BarChart-test.jsx
 * Created by Max Kendall 4/13/21
 */

import React from 'react';

import { render, screen } from 'test-utils';
import BarChart, { calculateOffsetTop, getLastFourYears } from 'components/agency/overview/BarChart';

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
    render(<BarChart
        selectedFy={`${selectedFy}`}
        agencyBudgetByYear={mockData}
        isLoading={false}
        isError={false} />);
    arrOfDisplayedFy
        .forEach((str) => {
            expect(screen.getByText(str)).toBeTruthy();
        });
});

test.each([
    [0.5, 125.25],
    [1, 78.5]
])('for a bar with height ratio %s, the top position of the tooltip is %s px', (ratio, top) => {
    expect(calculateOffsetTop(ratio)).toEqual(top);
});

test.each([
    [{ year: 2017 }, '2018', true],
    [{ year: 2021 }, '2018', true],
    [{ year: 2022 }, '2018', false],
    [{ year: 2018 }, '2018', true],
    // the logic changes after 2021
    [{ year: 2017 }, '2025', false],
    [{ year: 2026 }, '2025', false],
    [{ year: 2022 }, '2025', true],
    [{ year: 2025 }, '2025', true]
])('given FY %s, with a selected FY of %s, getLastFourYears returns %s', (year, selectedFy, result) => {
    expect(getLastFourYears(year, selectedFy)).toEqual(result);
});
