import React from 'react';

import { render, screen, waitForElementToBeRemoved } from '@test-utils';
import TimeFilters, { getLastPeriodWithinQuarterByPeriod, isPeriodVisible, isPeriodSelectable, getPeriodWithTitleById } from 'components/aboutTheData/TimeFilters';
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

const defaultProps = {
    urlPeriod: '12',
    urlFy: '2020',
    activeTab: 'details', // or dates
    onTimeFilterSelection: jest.fn(),
    selectedPeriod: null,
    selectedFy: null
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
});

test('Submission Details table shows period picker', async () => {
    render(<TimeFilters {...defaultProps} />);
    expect(screen.queryByText('PERIOD')).toBeDefined();
});

test('Publication Dates table does not show period picker', async () => {
    render(<TimeFilters {...defaultProps} activeTab="dates" />);
    expect(screen.queryByText('PERIOD')).toBeNull();
});

test('Validates fiscal year from url', async () => {
    // bad fiscal year:
    const mockOnTimeSelection = jest.fn();
    render(<TimeFilters {...defaultProps} onTimeFilterSelection={mockOnTimeSelection} urlFy="1990" />);
    await waitForElementToBeRemoved(screen.queryByText('Loading fiscal years...'));
    expect(mockOnTimeSelection).toHaveBeenCalledWith("2020", { className: "last-period-per-quarter", id: "12", title: "Q4 P12" });
});

test('Validates period from url', async () => {
    const mockOnTimeSelection = jest.fn();
    render(<TimeFilters {...defaultProps} onTimeFilterSelection={mockOnTimeSelection} urlFy="2020" urlPeriod="13" />);
    await waitForElementToBeRemoved(screen.queryByText('Loading fiscal years...'));
    expect(mockOnTimeSelection).toHaveBeenCalledWith("2020", { className: "last-period-per-quarter", id: "12", title: "Q4 P12" });
});

test('getLastPeriodWithinQuarterByPeriod returns correct value for each quarter', () => {
    expect(getLastPeriodWithinQuarterByPeriod('1')).toEqual('3');
    expect(getLastPeriodWithinQuarterByPeriod('2')).toEqual('3');
    expect(getLastPeriodWithinQuarterByPeriod('3')).toEqual('3');
    expect(getLastPeriodWithinQuarterByPeriod('4')).toEqual('6');
    expect(getLastPeriodWithinQuarterByPeriod('5')).toEqual('6');
    expect(getLastPeriodWithinQuarterByPeriod('6')).toEqual('6');
    expect(getLastPeriodWithinQuarterByPeriod('7')).toEqual('9');
    expect(getLastPeriodWithinQuarterByPeriod('8')).toEqual('9');
    expect(getLastPeriodWithinQuarterByPeriod('9')).toEqual('9');
    expect(getLastPeriodWithinQuarterByPeriod('10')).toEqual('12');
    expect(getLastPeriodWithinQuarterByPeriod('11')).toEqual('12');
    expect(getLastPeriodWithinQuarterByPeriod('12')).toEqual('12');
});

test('isPeriodSelectable determines when period is not selectable in the UI (only quarters are selectable pre 2020) ', () => {
    // 2018 serves as an example for every year prior to 2020:
    const twentyEighteen = mockPeriods.data.available_periods.filter(({ submission_fiscal_year: y }) => y === 2018);
    expect(isPeriodSelectable(twentyEighteen, '1')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '2')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '3')).toEqual(true);
    expect(isPeriodSelectable(twentyEighteen, '4')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '5')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '6')).toEqual(true);
    expect(isPeriodSelectable(twentyEighteen, '7')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '8')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '9')).toEqual(true);
    expect(isPeriodSelectable(twentyEighteen, '10')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '11')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '12')).toEqual(true);

    // 2020: sad year RIP Kobe
    const twentyTwenty = mockPeriods.data.available_periods.filter(({ submission_fiscal_year: y }) => y === 2020);
    expect(isPeriodSelectable(twentyTwenty, '1')).toEqual(false);
    expect(isPeriodSelectable(twentyTwenty, '2')).toEqual(false);
    expect(isPeriodSelectable(twentyTwenty, '3')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '4')).toEqual(false);
    expect(isPeriodSelectable(twentyTwenty, '5')).toEqual(false);
    expect(isPeriodSelectable(twentyTwenty, '6')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '7')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '8')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '9')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '10')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '11')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '12')).toEqual(true);
});

test('isPeriodVisible determines if a period has available data (perhaps may not be selectable but is still visible)', () => {
    // period may not exist in availablePeriods but is present implicitly via corresponding quarter
    const twentyEighteen = mockPeriods.data.available_periods.filter(({ submission_fiscal_year: y }) => y === 2018);
    expect(isPeriodVisible(twentyEighteen, '1')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '2')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '3')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '4')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '5')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '6')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '7')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '8')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '9')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '10')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '11')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '12')).toEqual(true);

    // 2020: sad year RIP Kobe
    const twentyTwenty = mockPeriods.data.available_periods.filter(({ submission_fiscal_year: y }) => y === 2020);
    expect(isPeriodVisible(twentyTwenty, '1')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '2')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '3')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '4')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '5')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '6')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '7')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '8')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '9')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '10')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '11')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '12')).toEqual(true);

    const twentyTwentyOne = [];
    expect(isPeriodVisible(twentyTwentyOne, '3')).toEqual(false);
});

test('getPeriodWithTitleById returns correct title for period', () => {
    expect(getPeriodWithTitleById('1').title).toEqual('P01 - P02');
    expect(getPeriodWithTitleById('2').title).toEqual('P01 - P02');
    expect(getPeriodWithTitleById('3').title).toEqual('Q1 P03');
    expect(getPeriodWithTitleById('4').title).toEqual('P04');
    expect(getPeriodWithTitleById('5').title).toEqual('P05');
    expect(getPeriodWithTitleById('6').title).toEqual('Q2 P06');

    expect(getPeriodWithTitleById('7').title).toEqual('P07');
    expect(getPeriodWithTitleById('8').title).toEqual('P08');
    expect(getPeriodWithTitleById('9').title).toEqual('Q3 P09');
    expect(getPeriodWithTitleById('10').title).toEqual('P10');
    expect(getPeriodWithTitleById('11').title).toEqual('P11');
    expect(getPeriodWithTitleById('12').title).toEqual('Q4 P12');
});

