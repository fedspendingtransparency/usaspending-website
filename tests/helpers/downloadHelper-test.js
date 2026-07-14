/**
 * @jest-environment jsdom
 */
import { getLatestSubmissionPeriodInFy } from 'helpers/downloadHelper';

const dayjs = require('dayjs');

const mockPeriods = [
    {
        submission_reveal_date: dayjs().subtract('1', 'd'),
        submission_fiscal_month: 2,
        submission_fiscal_year: 2020
    },
    {
        submission_reveal_date: dayjs().subtract('1', 'y'),
        submission_fiscal_month: 3,
        submission_fiscal_year: 2019
    },
    {
        submission_reveal_date: dayjs().subtract('2', 'y'),
        submission_fiscal_month: 4,
        submission_fiscal_year: 2019
    },
    {
        submission_reveal_date: dayjs().subtract('1', 'd'),
        submission_fiscal_month: 5,
        submission_fiscal_year: 2020
    },
    {
        submission_reveal_date: dayjs().add('6', 'm'),
        submission_fiscal_month: 12,
        submission_fiscal_year: 2020
    }
];

describe('downloadHelper', () => {
    describe('getLatestSubmissionPeriodInFy', () => {
        it('gets the latest period for that fiscal year', () => {
            const result = getLatestSubmissionPeriodInFy(2020, mockPeriods);
            expect(result.period).toEqual(5);
        });
    });
});
