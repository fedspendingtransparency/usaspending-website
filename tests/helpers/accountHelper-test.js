/**
 * accountHelper-test.js
 * Created by Max Kendall 10/23/2020
 */

import { getLatestPeriodAsMoment, getSubmissionDeadlines } from "helpers/accountHelper";
import { mockSubmissions } from '../mockData';

describe("accountHelper", () => {
    describe("getLatestPeriodAsMoment", () => {
        it('should find the latest revealed period and return the period end date as a moment obj', () => {
            const latestPeriod = getLatestPeriodAsMoment(mockSubmissions);
            expect(latestPeriod.format("MMMM DD[,] YYYY")).toEqual("September 30, 2020");
        });
    });
    describe('getSubmissionDeadlines', () => {
        it('should return null if no submissions are passed', () => {
            expect(getSubmissionDeadlines(2020, 8, [])).toBeNull();
        });
        it('should return null if no submission is found', () => {
            expect(getSubmissionDeadlines(2050, 8, mockSubmissions)).toBeNull();
        });
        it('should get the latest submission deadlines', () => {
            expect(getSubmissionDeadlines(2020, 8, mockSubmissions))
                .toHaveProperty('submissionDueDate', "2020-07-31T00:00:00Z");
            expect(getSubmissionDeadlines(2020, 8, mockSubmissions))
                .toHaveProperty('certificationDueDate', "2020-08-15T00:00:00Z");
        });
    });
});
