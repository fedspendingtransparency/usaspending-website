export const encodedAwardId = encodeURIComponent('123/456');
export const decodedAwardId = decodeURIComponent(encodedAwardId);

// account helper
export const mockSubmissions = [
    {
        period_start_date: "2020-05-01T00:00:00Z",
        period_end_date: "2020-05-31T00:00:00Z",
        submission_start_date: "2020-07-17T00:00:00Z",
        submission_due_date: "2020-07-31T00:00:00Z",
        certification_due_date: "2020-08-15T00:00:00Z",
        submission_reveal_date: "2020-08-01T00:00:00Z",
        submission_fiscal_year: 2020,
        submission_fiscal_quarter: 3,
        submission_fiscal_month: 8,
        is_quarter: false
    },
    {
        period_start_date: "2020-08-01T00:00:00Z",
        period_end_date: "2020-08-31T00:00:00Z",
        submission_start_date: "2020-09-18T00:00:00Z",
        submission_due_date: "2020-09-30T00:00:00Z",
        certification_due_date: "2020-11-17T00:00:00Z",
        submission_reveal_date: "2020-10-01T00:00:00Z",
        submission_fiscal_year: 2020,
        submission_fiscal_quarter: 4,
        submission_fiscal_month: 11,
        is_quarter: false
    },
    {
        period_start_date: "2020-07-01T00:00:00Z",
        period_end_date: "2020-07-31T00:00:00Z",
        submission_start_date: "2020-08-19T00:00:00Z",
        submission_due_date: "2020-08-29T00:00:00Z",
        certification_due_date: "2020-11-17T00:00:00Z",
        submission_reveal_date: "2020-08-30T00:00:00Z",
        submission_fiscal_year: 2020,
        submission_fiscal_quarter: 4,
        submission_fiscal_month: 10,
        is_quarter: false
    },
    {
        period_start_date: "2020-06-01T00:00:00Z",
        period_end_date: "2020-06-30T00:00:00Z",
        submission_start_date: "2020-07-17T00:00:00Z",
        submission_due_date: "2020-07-31T00:00:00Z",
        certification_due_date: "2020-08-15T00:00:00Z",
        submission_reveal_date: "2020-08-01T00:00:00Z",
        submission_fiscal_year: 2020,
        submission_fiscal_quarter: 3,
        submission_fiscal_month: 9,
        is_quarter: false
    },
    {
        period_start_date: "2020-04-01T00:00:00Z",
        period_end_date: "2020-06-30T00:00:00Z",
        submission_start_date: "2020-07-17T00:00:00Z",
        submission_due_date: "2020-08-15T00:00:00Z",
        certification_due_date: "2020-08-15T00:00:00Z",
        submission_reveal_date: "2020-08-16T00:00:00Z",
        submission_fiscal_year: 2020,
        submission_fiscal_quarter: 3,
        submission_fiscal_month: 9,
        is_quarter: true
    },
    {
        period_start_date: "2020-04-01T00:00:00Z",
        period_end_date: "2020-04-30T00:00:00Z",
        submission_start_date: "2020-07-17T00:00:00Z",
        submission_due_date: "2020-07-31T00:00:00Z",
        certification_due_date: "2020-08-15T00:00:00Z",
        submission_reveal_date: "2020-08-01T00:00:00Z",
        submission_fiscal_year: 2020,
        submission_fiscal_quarter: 3,
        submission_fiscal_month: 7,
        is_quarter: false
    },
    {
        period_start_date: "2020-01-01T00:00:00Z",
        period_end_date: "2020-03-31T00:00:00Z",
        submission_start_date: "2020-04-17T00:00:00Z",
        submission_due_date: "2020-05-16T00:00:00Z",
        certification_due_date: "2020-05-16T00:00:00Z",
        submission_reveal_date: "2020-05-17T00:00:00Z",
        submission_fiscal_year: 2020,
        submission_fiscal_quarter: 2,
        submission_fiscal_month: 6,
        is_quarter: true
    }
];
