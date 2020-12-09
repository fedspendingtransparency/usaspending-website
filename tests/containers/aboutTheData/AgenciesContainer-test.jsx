import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import * as redux from 'react-redux';
import { List } from 'immutable';

import * as aboutTheDataHelper from 'helpers/aboutTheDataHelper';
import AgenciesContainer from 'containers/aboutTheData/AgenciesContainer';

const defaultProps = {
    selectedFy: '2020',
    selectedPeriod: '8',
    activeTab: 'details',
    openModal: jest.fn()
};

/**
 * we cant use the fireEvent or userEvent module to test b/c those user interactions don't actually
 * trigger redux updates in our test env. If we were using local state, we could use these APIs, but
 * for now while redux is not functional in our test env we should just test as below, updating props
 * via re-render. 👇
 * */

test('when totals are defined, request for totals are not made and only one for details/dates is made', async () => {
    const totalsRequest = jest.spyOn(aboutTheDataHelper, 'getTotals');
    const detailsRequest = jest.spyOn(aboutTheDataHelper, 'getDetails');
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        details: [],
        dates: [],
        totals: [1],
        detailsSort: ['current_total_budget_authority_amount', 'desc'],
        datesSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([{ submission_fiscal_year: 2020, submission_fiscal_month: 8 }])
    });

    render(<AgenciesContainer {...defaultProps} />);
    return waitFor(() => {
        expect(totalsRequest).toHaveBeenCalledTimes(0);
        expect(detailsRequest).toHaveBeenCalledTimes(1);
    });
});

test('when totals are defined and the active tab changes, one request is made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        details: [],
        dates: [],
        totals: [1],
        detailsSort: ['current_total_budget_authority_amount', 'desc'],
        datesSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([{ submission_fiscal_year: 2020, submission_fiscal_month: 8 }])
    });
    const datesRequest = jest.spyOn(aboutTheDataHelper, 'getDates').mockClear();
    const detailsRequest = jest.spyOn(aboutTheDataHelper, 'getDetails').mockClear();
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);

    // not using click to trigger update to active tab b/c it's in a sibling component to this one.
    rerender(<AgenciesContainer {...defaultProps} activeTab="dates" />);

    return waitFor(() => {
        expect(detailsRequest).toHaveBeenCalledTimes(1);
        expect(datesRequest).toHaveBeenCalledTimes(1);
    });
});

test('when totals are defined and the fy changes, one request is made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        details: [],
        dates: [],
        totals: [1],
        detailsSort: ['current_total_budget_authority_amount', 'desc'],
        datesSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 },
            { submission_fiscal_year: 2018, submission_fiscal_month: 8 }
        ])
    });
    const detailsRequest = jest.spyOn(aboutTheDataHelper, 'getDetails').mockClear();
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);
    rerender(<AgenciesContainer {...defaultProps} selectedFy="2018" />);

    return waitFor(() => {
        expect(detailsRequest).toHaveBeenCalledTimes(2);
    });
});

test('when totals are defined and the period changes, one request is made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        details: [],
        dates: [],
        totals: [1],
        detailsSort: ['current_total_budget_authority_amount', 'desc'],
        datesSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 },
            { submission_fiscal_year: 2020, submission_fiscal_month: 4 }
        ])
    });
    const detailsRequest = jest.spyOn(aboutTheDataHelper, 'getDetails').mockClear();
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);
    rerender(<AgenciesContainer {...defaultProps} selectedPeriod="4" />);

    return waitFor(() => {
        expect(detailsRequest).toHaveBeenCalledTimes(2);
    });
});

test('when totals are defined and the sort field changes, two requests are made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        details: [],
        dates: [],
        totals: [1],
        detailsSort: ['current_total_budget_authority_amount', 'desc'],
        datesSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    const detailsRequest = jest.spyOn(aboutTheDataHelper, 'getDetails').mockClear();
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        details: [],
        dates: [],
        totals: [1],
        detailsSort: ['test', 'desc'],
        datesSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    rerender(<AgenciesContainer {...defaultProps} />);
    return waitFor(() => {
        expect(detailsRequest).toHaveBeenCalledTimes(2);
    });
});

test('when totals are defined and the order field changes, two requests are made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        details: [],
        dates: [],
        totals: [1],
        detailsSort: ['current_total_budget_authority_amount', 'desc'],
        datesSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    const detailsRequest = jest.spyOn(aboutTheDataHelper, 'getDetails').mockClear();
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        details: [],
        dates: [],
        totals: [1],
        detailsSort: ['current_total_budget_authority_amount', 'asc'],
        datesSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    rerender(<AgenciesContainer {...defaultProps} />);
    return waitFor(() => {
        expect(detailsRequest).toHaveBeenCalledTimes(2);
    });
});
