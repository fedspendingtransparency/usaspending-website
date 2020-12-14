import React from 'react';

import { render, screen, fireEvent } from '@test-utils';
import AboutTheDataPage from 'components/aboutTheData/AboutTheDataPage';
import * as accountHelpers from 'helpers/accountHelper';
import * as glossaryHelpers from 'helpers/glossaryHelper';

// latest fy of 2020; latest period is 12
const mockPeriods = {
    data: {
        available_periods: [{
            period_start_date: "2020-09-01T00:00:00Z", period_end_date: "2020-09-30T00:00:00Z", submission_start_date: "2020-10-19T00:00:00Z", submission_due_date: "2020-11-17T00:00:00Z", certification_due_date: "2020-11-17T00:00:00Z", submission_reveal_date: "2020-11-17T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: false
        }, {
            period_start_date: "2020-07-01T00:00:00Z", period_end_date: "2020-09-30T00:00:00Z", submission_start_date: "2020-10-19T00:00:00Z", submission_due_date: "2020-11-17T00:00:00Z", certification_due_date: "2020-11-17T00:00:00Z", submission_reveal_date: "2020-11-17T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: true
        }, {
            period_start_date: "2020-08-01T00:00:00Z", period_end_date: "2020-08-31T00:00:00Z", submission_start_date: "2020-09-18T00:00:00Z", submission_due_date: "2020-09-30T00:00:00Z", certification_due_date: "2020-11-17T00:00:00Z", submission_reveal_date: "2020-09-30T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 4, submission_fiscal_month: 11, is_quarter: false
        }, {
            period_start_date: "2020-07-01T00:00:00Z", period_end_date: "2020-07-31T00:00:00Z", submission_start_date: "2020-08-19T00:00:00Z", submission_due_date: "2020-08-29T00:00:00Z", certification_due_date: "2020-11-17T00:00:00Z", submission_reveal_date: "2020-08-29T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 4, submission_fiscal_month: 10, is_quarter: false
        }, {
            period_start_date: "2020-06-01T00:00:00Z", period_end_date: "2020-06-30T00:00:00Z", submission_start_date: "2020-07-17T00:00:00Z", submission_due_date: "2020-07-31T00:00:00Z", certification_due_date: "2020-08-15T00:00:00Z", submission_reveal_date: "2020-07-31T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: false
        }, {
            period_start_date: "2020-04-01T00:00:00Z", period_end_date: "2020-06-30T00:00:00Z", submission_start_date: "2020-07-17T00:00:00Z", submission_due_date: "2020-08-15T00:00:00Z", certification_due_date: "2020-08-15T00:00:00Z", submission_reveal_date: "2020-08-15T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: true
        }, {
            period_start_date: "2020-05-01T00:00:00Z", period_end_date: "2020-05-31T00:00:00Z", submission_start_date: "2020-07-17T00:00:00Z", submission_due_date: "2020-07-31T00:00:00Z", certification_due_date: "2020-08-15T00:00:00Z", submission_reveal_date: "2020-07-31T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 3, submission_fiscal_month: 8, is_quarter: false
        }, {
            period_start_date: "2020-04-01T00:00:00Z", period_end_date: "2020-04-30T00:00:00Z", submission_start_date: "2020-07-17T00:00:00Z", submission_due_date: "2020-07-31T00:00:00Z", certification_due_date: "2020-08-15T00:00:00Z", submission_reveal_date: "2020-07-31T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 3, submission_fiscal_month: 7, is_quarter: false
        }, {
            period_start_date: "2020-01-01T00:00:00Z", period_end_date: "2020-03-31T00:00:00Z", submission_start_date: "2020-04-17T00:00:00Z", submission_due_date: "2020-05-16T00:00:00Z", certification_due_date: "2020-05-16T00:00:00Z", submission_reveal_date: "2020-05-16T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 2, submission_fiscal_month: 6, is_quarter: true
        }, {
            period_start_date: "2019-10-01T00:00:00Z", period_end_date: "2019-12-31T00:00:00Z", submission_start_date: "2020-01-17T00:00:00Z", submission_due_date: "2020-02-15T00:00:00Z", certification_due_date: "2020-02-15T00:00:00Z", submission_reveal_date: "2020-02-15T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 1, submission_fiscal_month: 3, is_quarter: true
        }, {
            period_start_date: "2019-07-01T00:00:00Z", period_end_date: "2019-09-30T00:00:00Z", submission_start_date: "2019-10-18T00:00:00Z", submission_due_date: "2019-11-15T00:00:00Z", certification_due_date: "2019-11-15T00:00:00Z", submission_reveal_date: "2019-11-15T00:00:00Z", submission_fiscal_year: 2019, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: true
        }, {
            period_start_date: "2019-04-01T00:00:00Z", period_end_date: "2019-06-30T00:00:00Z", submission_start_date: "2019-07-19T00:00:00Z", submission_due_date: "2019-08-15T00:00:00Z", certification_due_date: "2019-08-15T00:00:00Z", submission_reveal_date: "2019-08-15T00:00:00Z", submission_fiscal_year: 2019, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: true
        }, {
            period_start_date: "2019-01-01T00:00:00Z", period_end_date: "2019-03-31T00:00:00Z", submission_start_date: "2019-04-19T00:00:00Z", submission_due_date: "2019-05-16T00:00:00Z", certification_due_date: "2019-05-16T00:00:00Z", submission_reveal_date: "2019-05-16T00:00:00Z", submission_fiscal_year: 2019, submission_fiscal_quarter: 2, submission_fiscal_month: 6, is_quarter: true
        }, {
            period_start_date: "2018-10-01T00:00:00Z", period_end_date: "2018-12-31T00:00:00Z", submission_start_date: "2019-02-21T00:00:00Z", submission_due_date: "2019-03-21T00:00:00Z", certification_due_date: "2019-03-21T00:00:00Z", submission_reveal_date: "2019-03-21T00:00:00Z", submission_fiscal_year: 2019, submission_fiscal_quarter: 1, submission_fiscal_month: 3, is_quarter: true
        }, {
            period_start_date: "2018-07-01T00:00:00Z", period_end_date: "2018-09-30T00:00:00Z", submission_start_date: "2018-10-19T00:00:00Z", submission_due_date: "2018-11-15T00:00:00Z", certification_due_date: "2018-11-15T00:00:00Z", submission_reveal_date: "2018-11-15T00:00:00Z", submission_fiscal_year: 2018, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: true
        }, {
            period_start_date: "2018-04-01T00:00:00Z", period_end_date: "2018-06-30T00:00:00Z", submission_start_date: "2018-07-19T00:00:00Z", submission_due_date: "2018-08-15T00:00:00Z", certification_due_date: "2018-08-15T00:00:00Z", submission_reveal_date: "2018-08-15T00:00:00Z", submission_fiscal_year: 2018, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: true
        }, {
            period_start_date: "2018-01-01T00:00:00Z", period_end_date: "2018-03-31T00:00:00Z", submission_start_date: "2018-04-19T00:00:00Z", submission_due_date: "2018-05-16T00:00:00Z", certification_due_date: "2018-05-16T00:00:00Z", submission_reveal_date: "2018-05-16T00:00:00Z", submission_fiscal_year: 2018, submission_fiscal_quarter: 2, submission_fiscal_month: 6, is_quarter: true
        }, {
            period_start_date: "2017-10-01T00:00:00Z", period_end_date: "2017-12-31T00:00:00Z", submission_start_date: "2018-01-19T00:00:00Z", submission_due_date: "2018-02-15T00:00:00Z", certification_due_date: "2018-02-15T00:00:00Z", submission_reveal_date: "2018-02-15T00:00:00Z", submission_fiscal_year: 2018, submission_fiscal_quarter: 1, submission_fiscal_month: 3, is_quarter: true
        }, {
            period_start_date: "2017-07-01T00:00:00Z", period_end_date: "2017-09-30T00:00:00Z", submission_start_date: "2017-10-06T00:00:00Z", submission_due_date: "2017-12-01T00:00:00Z", certification_due_date: "2017-12-01T00:00:00Z", submission_reveal_date: "2017-12-01T00:00:00Z", submission_fiscal_year: 2017, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: true
        }, {
            period_start_date: "2017-04-01T00:00:00Z", period_end_date: "2017-06-30T00:00:00Z", submission_start_date: "2017-07-19T00:00:00Z", submission_due_date: "2017-08-15T00:00:00Z", certification_due_date: "2017-08-15T00:00:00Z", submission_reveal_date: "2017-08-15T00:00:00Z", submission_fiscal_year: 2017, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: true
        }, {
            period_start_date: "2017-01-01T00:00:00Z", period_end_date: "2017-03-31T00:00:00Z", submission_start_date: "2017-04-19T00:00:00Z", submission_due_date: "2017-05-20T00:00:00Z", certification_due_date: "2017-05-20T00:00:00Z", submission_reveal_date: "2017-05-20T00:00:00Z", submission_fiscal_year: 2017, submission_fiscal_quarter: 2, submission_fiscal_month: 6, is_quarter: true
        }, {
            period_start_date: "2016-10-01T00:00:00Z", period_end_date: "2016-12-31T00:00:00Z", submission_start_date: "2017-01-19T00:00:00Z", submission_due_date: "2017-02-20T00:00:00Z", certification_due_date: "2017-02-20T00:00:00Z", submission_reveal_date: "2017-02-20T00:00:00Z", submission_fiscal_year: 2017, submission_fiscal_quarter: 1, submission_fiscal_month: 3, is_quarter: true
        }]
    }
};

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

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => ({ fy: '2020', period: '12' }))
}));

const mockPush = jest.fn();

const history = {
    push: mockPush
};

beforeEach(() => {
    jest.spyOn(accountHelpers, 'fetchAllSubmissionDates').mockReturnValue({
        promise: Promise.resolve(mockPeriods),
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
    render(<AboutTheDataPage history={history} />);
});

test('renders the details table first', async () => {
    // only fires one api request
    // shows the correct table
    const [table] = screen.getAllByText('Count of Agency TAS in GTAS Not in File A');
    expect(table).toBeDefined();
});

test('on tab change updates the table view', async () => {
    const tab = screen.getAllByText('Updates by Fiscal Year');
    fireEvent.click(tab[0]);
    const table = screen.getByText('FY 2020 Q4');
    expect(table).toBeDefined();
});

