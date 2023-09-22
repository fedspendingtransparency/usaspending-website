/**
 * @jest-environment jsdom
 * 
 * ObligationsByAwardTypeTooltip-test.jsx
 * Created by Lizzie Salita 7/22/21
 */

import React from 'react';
import { render, screen } from 'test-utils';
import ObligationsByAwardTypeTooltip from 'components/agency/visualizations/ObligationsByAwardTypeTooltip';

const mockAwardTypes = [
    {
        label: 'Grants',
        color: '#E66F0E',
        value: -50,
        type: 'financial'
    },
    {
        label: 'Loans',
        color: '#FFBC78',
        value: 4567890,
        type: 'financial'
    },
    {
        label: 'Direct Payments',
        color: '#FA9441',
        value: 30,
        type: 'financial'
    },
    {
        label: 'Other Financial Assistance',
        color: '#FCE2C5',
        value: 20,
        type: 'financial'
    },
    {
        label: 'Contracts',
        color: '#7F84BA',
        value: 10,
        type: 'contracts'
    },
    {
        label: 'IDVs',
        color: '#A9ADD1',
        value: 0,
        type: 'contracts'
    }
];

const mockStore = {
    agency: {
        _awardObligations: 100
    }
};

test('displays the currently selected fiscal year in the tooltip heading', () => {
    render(
        <ObligationsByAwardTypeTooltip
            awardTypes={mockAwardTypes}
            fiscalYear={1999}
            activeType="Contracts"
            categoryType="contracts"
        />,
        { initialState: mockStore }
    );
    const heading = screen.queryByText(/^FY1999/);
    expect(heading).toBeTruthy();
    expect(heading.classList.contains('tooltip__title')).toBeTruthy();
});

test('formats the award obligations', () => {
    render(
        <ObligationsByAwardTypeTooltip
            awardTypes={mockAwardTypes}
            fiscalYear={1999}
            activeType="Direct Payments"
            categoryType="financial"
        />,
        { initialState: mockStore }
    );
    const loansValue = screen.queryByText('$4,567,890');
    expect(loansValue).toBeTruthy();
});

test('formats the percent of total', () => {
    render(
        <ObligationsByAwardTypeTooltip
            awardTypes={mockAwardTypes}
            fiscalYear={1999}
            activeType="Loans"
            categoryType="financial"
        />,
        { initialState: mockStore }
    );
    const directPaymentsPercent = screen.queryByText('30.0%');
    expect(directPaymentsPercent).toBeTruthy();
});

test('adds an active class to the hovered award type', () => {
    render(
        <ObligationsByAwardTypeTooltip
            awardTypes={mockAwardTypes}
            fiscalYear={1999}
            activeType="Contracts"
            categoryType="contracts"
        />,
        { initialState: mockStore }
    );
    const contractsAmount = screen.queryByText('$10');
    expect(contractsAmount.classList.contains('award-type-tooltip__table-data_active')).toBeTruthy();
});

test('displays -- as the percent for negative obligations', () => {
    render(
        <ObligationsByAwardTypeTooltip
            awardTypes={mockAwardTypes}
            fiscalYear={1999}
            activeType="Loans"
            categoryType="financial"
        />,
        { initialState: mockStore }
    );
    expect(screen.queryByText('--')).toBeTruthy();
});
