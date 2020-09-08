/**
 * covid19Helper-test.js
 * Created by Jonathan Hill 07/14/20
 */
import {
    latestSubmissionDateFormatted,
    areCountsDefined,
    calculateUnlinkedTotals
} from 'helpers/covid19Helper';
import mockSubmissions from '../testResources/covid19MockData';

describe('Covid 19 Helper', () => {
    describe('latestSubmissionDateFormatted', () => {
        it('should find the latest submission date and format it', () => {
            expect(latestSubmissionDateFormatted(mockSubmissions)).toEqual('May 31, 2020');
        });
    });
    describe('areCountsDefined', () => {
        it('should return null/falsy when count object has null', () => {
            expect(areCountsDefined({ test: null, test2: 5 })).toBeFalsy();
        });
        it('should return truthy when count object is totally defined', () => {
            expect(areCountsDefined({ test: 5, test2: 3 })).toBeTruthy();
        });
    });

    describe('calculateUnlinkedTotals', () => {
        it('should return the correct subtracted values', () => {
            const overviewTotals = {
                obligation: 123123123,
                outlay: 321321321,
                awardCount: 50,
                faceValueOfLoan: 999999,
                totalBudgetaryResources: 555555555
            };
            const aggregatedTotals = {
                obligation: 1,
                outlay: 2,
                award_count: 3,
                face_value_of_loan: 4,
                total_budgetary_resources: 5
            };
            expect(calculateUnlinkedTotals(overviewTotals, aggregatedTotals)).toEqual({
                award_count: 47,
                face_value_of_loan: 999995,
                obligation: 123123122,
                outlay: 321321319,
                total_budgetary_resources: 555555550
            });
        });
    });
});
