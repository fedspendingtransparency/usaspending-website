/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from 'test-utils';
import AccountDataContent from 'components/bulkDownload/accounts/AccountDataContent';

jest.mock('components/bulkDownload/accounts/filters/BudgetAgencyGroup', () => jest.fn(() => <div />));
jest.mock('components/bulkDownload/accounts/filters/AccountLevelFilter', () => jest.fn(() => <div />));
jest.mock('components/bulkDownload/accounts/filters/SubmissionTypeFilter', () => jest.fn(() => <div />));
jest.mock('components/bulkDownload/accounts/filters/DefCodeFilter', () => jest.fn(() => <div />));
jest.mock('components/bulkDownload/accounts/filters/FiscalYearFilter', () => jest.fn(() => <div />));
jest.mock('components/bulkDownload/accounts/AccountUserSelections', () => jest.fn(() => <div />));

const baseAccounts = {
    accountLevel: 'federalAccount',
    budgetFunction: { code: '', title: 'Select a Budget Function' },
    budgetSubfunction: { code: '', title: 'Select a Budget Sub-Function' },
    defCodes: [],
    agency: { id: '', name: 'Select an Agency' },
    federalAccount: { id: '', name: 'Select a Federal Account' },
    submissionTypes: ['accountBalances'],
    fy: null,
    quarter: null,
    period: null,
    fileFormat: 'csv'
};

const validAccounts = {
    ...baseAccounts,
    budgetFunction: { code: '500', title: 'Some Budget Function' },
    agency: { id: '1', name: 'Some Agency' },
    submissionTypes: ['accountBalances'],
    fy: '2021',
    quarter: '4'
};

const defaultProps = {
    accounts: baseAccounts,
    updateFilter: jest.fn(),
    clearAccountFilters: jest.fn(),
    agencies: {},
    federalAccounts: [],
    clickedDownload: jest.fn(),
    setFederalAccountList: jest.fn(),
    budgetFunctions: [],
    setBudgetSubfunctionList: jest.fn(),
    budgetSubfunctions: []
};

describe('AccountDataContent validForm', () => {
    it('disables the Download button when the required account filters are incomplete', () => {
        render(<AccountDataContent {...defaultProps} accounts={baseAccounts} />);

        expect(screen.getByText('Download')).toHaveProperty('disabled', true);
    });

    it('enables the Download button once every required account filter is set', () => {
        render(<AccountDataContent {...defaultProps} accounts={validAccounts} />);

        expect(screen.getByText('Download')).toHaveProperty('disabled', false);
    });

    it('keeps the Download button disabled when only one of quarter/period is missing fy', () => {
        const missingFy = { ...validAccounts, fy: null };

        render(<AccountDataContent {...defaultProps} accounts={missingFy} />);

        expect(screen.getByText('Download')).toHaveProperty('disabled', true);
    });

    it('keeps the Download button disabled when both quarter and period are null', () => {
        const missingTimeInterval = { ...validAccounts, quarter: null, period: null };

        render(<AccountDataContent {...defaultProps} accounts={missingTimeInterval} />);

        expect(screen.getByText('Download')).toHaveProperty('disabled', true);
    });

    it('enables the Download button when period is set instead of quarter', () => {
        const periodAccounts = { ...validAccounts, quarter: null, period: '08' };

        render(<AccountDataContent {...defaultProps} accounts={periodAccounts} />);

        expect(screen.getByText('Download')).toHaveProperty('disabled', false);
    });
});
