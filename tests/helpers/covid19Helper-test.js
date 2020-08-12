/**
 * covid19Helper-test.js
 * Created by Jonathan Hill 07/14/20
 */
import {
    latestSubmissionDateFormatted,
    areCountsDefined,
    useInFlightList
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
});
