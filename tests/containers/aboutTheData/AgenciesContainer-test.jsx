import React from 'react';
import { useParams } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from '@test-utils';

import AgenciesContainer from 'containers/aboutTheData/AgenciesContainer';

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

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => ({ fy: 'latest' }))
}));

jest.mock('helpers/accountHelper', () => ({
    ...jest.requireActual('helpers/accountHelper'),
    fetchAllSubmissionDates: jest.fn(() => ({
        promise: Promise.resolve(mockPeriods),
        cancel: () => {}
    }))
}));

const mockPush = jest.fn();

const history = {
    push: mockPush
};

// const { rerender } = render(<AgenciesContainer />);

describe('AgenciesContainer', () => {
    describe('tab change', () => {
        // only fires one api request
        // shows the correct table
        it('renders the details table first', () => {
            render(<AgenciesContainer history={history} />);
            const [table] = screen.getAllByText('Count of Agency TAS in GTAS Not in File A');
            expect(table).toBeDefined();
        });
        it('renders the dates table on tab click', () => {
            render(<AgenciesContainer history={history} />);
            const tab = screen.getAllByText('Updates by Fiscal Year');
            fireEvent.click(tab[0]);
            const table = screen.getByText('FY 2020 Q4');
            expect(table).toBeDefined();
        });
    });
    describe('table loads the correct fy by url', () => {
        it('shows table for fy from url', async () => {
            useParams.mockImplementation(() => ({ fy: '2019' }));
            render(<AgenciesContainer history={history} />);
            await waitFor(() => {
                const picker = screen.getByText('FY 2019');
                expect(picker).toBeDefined();
            });
        });
        it('when fy in url is not valid the latest fy is displayed and url is updated', async () => {
            useParams.mockImplementation(() => ({ fy: '2012' }));
            render(<AgenciesContainer history={history} />);
            await waitFor(() => {
                const picker = screen.getByText('FY 2020');
                expect(picker).toBeDefined();
            });
            expect(mockPush).toHaveBeenCalledWith('latest');
        });
    });
});
