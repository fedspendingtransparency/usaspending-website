/**
 * @jest-environment jsdom
 * *
 * StatusOfFundsChart-test.jsx
 * Created by Afna Saifudeen 11/23/21
 */

import React from 'react';
import '../../../testResources/matchMedia.mock';
import StatusOfFundsChart from "../../../../src/js/components/agency/visualizations/StatusOfFundsChart";
import { render, screen } from '../../../testResources/test-utils';

const fy = '2021';
const mockSetDrilldownLevel = jest.fn();
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
            _budgetaryResources: 9100000000,
            _obligations: 6000000000
        },
        {
            name: "Bureau of the Census",
            _budgetaryResources: 4400000000,
            _obligations: 2500000000
        },
        {
            name: "U.S. Patent and Trademark Office",
            _budgetaryResources: 4200000000,
            _obligations: 2700000000
        },
        {
            name: "Economic Development Administration",
            _budgetaryResources: 4150000000,
            _obligations: 1300000000
        },
        {
            name: "National Telecommunications and Information Administration",
            _budgetaryResources: 2100000000,
            _obligations: 50000000
        },
        {
            name: "National Institute of Standards and Technology",
            _budgetaryResources: 1900000000,
            _obligations: 1560000000
        },
        {
            name: "International Trade Administration",
            _budgetaryResources: 1010000000,
            _obligations: 960000000,
            _outlays: 3644582286.56

        },
        {
            name: "Departmental Management",
            _budgetaryResources: 100500000,
            _obligations: 905000000
        },
        {
            name: "Bureau of Industry and Security",
            _budgetaryResources: 10500000,
            _obligations: 9050000
        },
        {
            name: "Bureau of Economic Analysis",
            _budgetaryResources: 5000000,
            _obligations: 4000000
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
            _budgetaryResources: 9100000000,
            _obligations: 6000000000
        },
        {
            name: "Bureau of the Census",
            _budgetaryResources: 4400000000,
            _obligations: -2500000000
        },
        {
            name: "U.S. Patent and Trademark Office",
            _budgetaryResources: 4200000000,
            _obligations: -2700000000
        }
    ]
};
const mockProps = {
    fy,
    results: mockChartData.results,
    level: 0,
    setDrilldownLevel: mockSetDrilldownLevel,
    toggle: false,
    maxLevel: 4
};
// const toptierCode = '012';
// const name = 'Department of Agriculture';


beforeEach(() => {
    jest.clearAllMocks();
});

jest.createMockFromModule('data-transparency-ui');

describe('StatusOfFundsChart', () => {
    it('should display subcomponent names as y axis labels', () => {
        render(<StatusOfFundsChart {...mockProps} />);
        for (let i = 0; i < mockChartData.results.length; i++) {
            expect(screen.queryAllByText(mockChartData.results[i].name)).toBeTruthy();
        }
    });
    it('render budgetary key', () => {
        render(<StatusOfFundsChart {...mockProps} />);
        expect(screen.getByText(`FY${fy[2]}${fy[3]} Total Budgetary Resources`)).toBeTruthy();
    });
    it('render obligations/outlays key', () => {
        const { rerender } = render(<StatusOfFundsChart {...mockProps} />);
        expect(screen.getByText(`FY${fy[2]}${fy[3]} Obligations`)).toBeTruthy();
        expect(screen.queryByText(`FY${fy[2]}${fy[3]} Outlays`)).toBeNull();
        rerender(<StatusOfFundsChart {...mockProps} toggle />);
        expect(screen.getByText(`FY${fy[2]}${fy[3]} Outlays`)).toBeTruthy();
        expect(screen.queryByText(`FY${fy[2]}${fy[3]} Obligations`)).toBeNull();
    });
    it('should display $0 axis when positive and negative values are present', () => {
        render(<StatusOfFundsChart results={mockChartDataNegative.results} fy={fy} level={0} />);
        expect(screen.getByText('$0')).toBeTruthy();
    });

    it('should display formatted amount used for max x axis value', () => {
        render(<StatusOfFundsChart {...mockProps} />);
        expect(screen.getByText('$10B')).toBeTruthy();
    });

    it('should display negative formatted amount used for max x axis value', () => {
        render(<StatusOfFundsChart
            {...mockProps}
            results={mockChartDataNegative.results}
            fy={fy}
            level={0} />);
        expect(screen.getByText('−$10B')).toBeTruthy();
    });
});
