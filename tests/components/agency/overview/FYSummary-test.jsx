/**
 * @jest-environment jsdom
 * 
 * FYSummary-test.jsx
 * Created by Max Kendall 4/14/21
 */

import React from 'react';
import { render, waitFor } from 'test-utils';
import * as redux from 'react-redux';
import { List } from "immutable";

import * as helpers from 'apis/agency';
import * as accountHooks from 'containers/account/WithLatestFy';

import FYSummary from 'components/agency/overview/FySummary';
import BaseAgencyRecipients from 'models/v2/agency/BaseAgencyRecipients';

import { mockTotalBudgetaryResources } from './mockData';

// mock the child components
jest.mock('containers/agency/visualizations/TotalObligationsOverTimeContainer', () => jest.fn(() => null));
jest.mock('containers/agency/visualizations/ObligationsByAwardTypeContainer', () => jest.fn(() => null));
jest.mock('containers/agency/visualizations/RecipientDistributionContainer', () => jest.fn(() => null));

const recipientDistribution = Object.create(BaseAgencyRecipients);
recipientDistribution.populate({
    count: 12345,
    total_federal_count: 7654321
});

beforeEach(() => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        budgetaryResources: {
            2020: {
                agencyBudget: '$1.11 Million',
                _agencyBudget: 1110000000
            },
            2021: {
                agencyBudget: '$1.20 Million',
                _agencyBudget: 1200000000
            }
        },
        _agencyObligations: 123456789.10,
        recipientDistribution,
        overview: {
            toptierCode: '010'
        }
    });
    jest.spyOn(accountHooks, "useLatestAccountData").mockImplementation(() =>
        [null,
            new List([{
                submission_fiscal_year: null,
                period_end_date: null
            }])
        ]);
});

test('No duplicate API requests', () => {
    const spy = jest.spyOn(helpers, 'fetchBudgetaryResources').mockReturnValue({
        promise: new Promise((resolve) => resolve({
            data: {
                agency_data_by_year: mockTotalBudgetaryResources
            }
        })),
        cancel: () => {}
    });

    render(<FYSummary isMobile={false} fy="2020" windowWidth={1200} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

test('No API request on FY change', () => {
    const spy = jest.spyOn(helpers, 'fetchBudgetaryResources').mockReturnValue({
        promise: new Promise((resolve) => resolve({
            data: {
                agency_data_by_year: mockTotalBudgetaryResources
            }
        })),
        cancel: () => {}
    });
    const { rerender } = render(<FYSummary isMobile={false} fy="2020" windowWidth={1200} />);
    spy.mockReset();

    rerender(<FYSummary isMobile={false} fy="2021" windowWidth={1200} />);
    expect(spy).not.toHaveBeenCalled();
});
