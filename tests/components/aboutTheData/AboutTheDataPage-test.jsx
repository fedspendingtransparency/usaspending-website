/**
 * @jest-environment jsdom
 */
import React from 'react';
import { List } from 'immutable';
import { render, screen, waitFor } from '@test-utils';

import AboutTheDataPage from 'components/aboutTheData/AboutTheDataPage';
import * as accountHelpers from 'apis/account';
import * as helpers from "containers/account/WithLatestFy";
import * as glossaryHelpers from 'helpers/glossaryHelper';
import * as queryParamHelpers from 'helpers/queryParams';
import * as agencyReportingAPI from 'apis/agencyReporting';
import { mockAPI } from '../../containers/aboutTheData/mockData';
import { mockSubmissions } from '../../mockData/helpers/aboutTheDataHelper';

const dayjs = require('dayjs');

// latest fy of 2020; latest period is 12
const q4Fy2020 = {
    period_start_date: "2020-09-01T00:00:00Z", period_end_date: "2020-09-30T00:00:00Z", submission_start_date: "2020-10-19T00:00:00Z", submission_due_date: "2020-11-17T00:00:00Z", certification_due_date: "2020-11-17T00:00:00Z", submission_reveal_date: "2020-11-17T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: false
};
const mockPeriods = new List([mockSubmissions, q4Fy2020]);

const mockGlossary = {
    data: {
        page_metadata: {
            page: 1,
            count: 132,
            next: null,
            previous: null,
            hasNext: false,
            hasPrevious: false
        },
        results: [
            {
                term: "Acquisition of Assets",
                slug: "acquisition-of-assets",
                data_act_term: "Acquisition of Assets",
                plain: "This major object class includes an agency’s procurement of assets, including those that have lost value (depreciated). Some examples of assets, according to this definition, include equipment, land, physical structures, investments, and loans.",
                official: "This major object class covers object classes 31.0 through 33.0. Include\ncapitalized (depreciated) assets and non-capitalized assets. This includes:\n31.0 Equipment\n32.0 Land and structures\n33.0 Investments and loans\n\nEach specific object class is defined in OMB Circular A-11 Section 83.6.",
                resources: "Learn More: [Circular No. A-11](https://www.whitehouse.gov/sites/whitehouse.gov/files/omb/assets/a11_current_year/a11_2017.pdf)"
            }
        ]
    }
};

const mockPush = jest.fn();
const mockReplace = jest.fn();

const defaultProps = {
    history: {
        push: mockPush,
        replace: mockReplace
    },
    match: {
        search: "?fy=2020&period=12&tab=submissions"
    }
};

beforeEach(() => {
    jest.spyOn(URLSearchParams.prototype, 'toString').mockImplementation(() => 'str');
    jest.spyOn(helpers, "useLatestAccountData").mockReturnValue([
        dayjs(),
        mockPeriods,
        { year: 2020, period: 12 }
    ]);
    jest.spyOn(accountHelpers, 'fetchAllSubmissionDates').mockReturnValue({
        promise: Promise.resolve(mockSubmissions),
        cancel: () => {
            console.log('cancel called');
        }
    });
    jest.spyOn(accountHelpers, 'fetchAllSubmissionDates').mockReturnValue({
        promise: Promise.resolve({ data: { available_periods: [] } }),
        cancel: () => {
            console.log('cancel called');
        }
    });
    jest.spyOn(glossaryHelpers, 'fetchAllTerms').mockReturnValue({
        promise: Promise.resolve(mockGlossary),
        cancel: () => {
            console.log('cancel called');
        }
    });
    jest.spyOn(agencyReportingAPI, 'getTotalBudgetaryResources').mockReturnValue({
        promise: Promise.resolve(mockAPI.totals),
        cancel: () => {
            console.log('cancel called');
        }
    });
    jest.spyOn(agencyReportingAPI, 'getAgenciesReportingData').mockReturnValue({
        promise: Promise.resolve(mockAPI.details),
        cancel: () => {
            console.log('cancel called');
        }
    });
    jest.spyOn(agencyReportingAPI, 'getSubmissionPublicationDates').mockReturnValue({
        promise: Promise.resolve(mockAPI.publications),
        cancel: () => {
            console.log('cancel called');
        }
    });
});

test('renders the details table first', async () => {
    jest.spyOn(queryParamHelpers, 'useQueryParams').mockImplementation((param) => ({
        fy: '2020',
        period: '12',
        tab: 'submissions'
    }));
    render(<AboutTheDataPage {...defaultProps} />);
    // shows the correct table
    const [table] = screen.getAllByText('Number of TASs Missing from Account Balance Data');
    expect(table).toBeDefined();
});

test('on tab change updates the table view', async () => {
    // shows the other table
    jest.spyOn(queryParamHelpers, 'useQueryParams').mockImplementation((param) => ({
        fy: '2020',
        period: '12',
        tab: 'publications'
    }));
    render(<AboutTheDataPage {...defaultProps} />);
    waitFor(() => {
        const table = screen.getByText('FY 2020 Q4');
        expect(table).toBeDefined();
    });
});

test('redirects submission-statistics to url w/ latest fy and period in params', async () => {
    jest.spyOn(queryParamHelpers, 'useQueryParams').mockReturnValue({});
    jest.spyOn(URLSearchParams.prototype, 'toString').mockReturnValue("fy=2020&period=12&tab=submissions");
    render(<AboutTheDataPage {...defaultProps} />);
    waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith({
            pathname: '/submission-statistics/',
            search: "?fy=2020&period=12&tab=submissions"
        });
    });
});
