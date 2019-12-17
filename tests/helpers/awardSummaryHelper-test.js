import {
    isAwardAggregate,
    isAwardFinancialAssistance,
    getAwardTypeByRecordtypeCountyAndState,
    isBadDates
} from 'helpers/awardSummaryHelper';
import moment from 'moment';

describe('', () => {
    describe('isAwardAggregate', () => {
        it('returns true when string (ASST_AGG) is included in input ', () => {
            expect(isAwardAggregate("alskdjf_asdf_ASST_AGG_asdfa")).toEqual(true);
        });
        it('returns false when string (ASST_AGG) is not inluded in input ', () => {
            expect(isAwardAggregate("alskdjf_asdf_ASST__AGG_asdfa")).toEqual(false);
        });
    });

    describe('isAwardFinancialAssistance', () => {
        it('returns true when input is of award type financial assistance', () => {
            expect(isAwardFinancialAssistance("grant")).toEqual(true);
            expect(isAwardFinancialAssistance("loan")).toEqual(true);
            expect(isAwardFinancialAssistance("other")).toEqual(true);
            expect(isAwardFinancialAssistance("direct payment")).toEqual(true);
        });
        it('returns false when input is of different award type', () => {
            expect(isAwardFinancialAssistance("contract")).toEqual(false);
            expect(isAwardFinancialAssistance("idv")).toEqual(false);
            expect(isAwardFinancialAssistance(" ")).toEqual(false);
            expect(isAwardFinancialAssistance("loans")).toEqual(false);
        });
    });
    describe('getAwardTypeRecordtypeCountyAndState', () => {
        it('should return nonFinancialAssistance', () => {
            const data = getAwardTypeByRecordtypeCountyAndState(
                false,
                {},
                2
            );
            expect(data).toEqual('nonFinancialAssistance');
        });
        it('should return redactedDueToPII', () => {
            const data = getAwardTypeByRecordtypeCountyAndState(
                true,
                {},
                3
            );
            expect(data).toEqual('redactedDueToPII');
        });
        const cases = [
            ['aggregatedByState', '1', 'USA', 'Does Not Exist', true, { _countryCode: 'USA', _countyCode: null }, 1],
            ['aggregatedByCounty', '1', 'USA', 'Exists', true, { _countryCode: 'USA', _countyCode: '001' }, 1],
            ['aggregatedByCountry', '1', 'Not USA', 'Does Not Matter', true, { _countryCode: 'Greece' }, 1]
        ];
        it.each(cases)(
            'should return %p when award isFinancialAssistance and is record type %p and country code is %p and county code %p',
            (result, record, country, county, isFA, pop, recordType) => {
                const data = getAwardTypeByRecordtypeCountyAndState(
                    isFA,
                    pop,
                    recordType
                );
                expect(data).toEqual(result);
            }
        );
    });
    describe('Is Bad Dates', () => {
        const goodDates = {
            startDate: moment('01/02/2019', 'MM-DD-YYYY'),
            endDate: moment('12/02/2019', 'MM-DD-YYYY'),
            currentEndDate: moment('05/29/2019', 'MM-DD-YYYY')
        };
        const startGreaterThanEndDate = {
            startDate: moment('06/02/2019', 'MM-DD-YYYY'),
            endDate: moment('05/29/2019', 'MM-DD-YYYY'),
            currentEndDate: moment('04/02/2019', 'MM-DD-YYYY')
        };
        const startGreaterThanCurrentEndDate = {
            startDate: moment('06/02/2019', 'MM-DD-YYYY'),
            endDate: moment('12/02/2019', 'MM-DD-YYYY'),
            currentEndDate: moment('05/29/2019', 'MM-DD-YYYY')
        };
        const currentEndDateGreaterThanEndDate = {
            startDate: moment('01/02/2019', 'MM-DD-YYYY'),
            endDate: moment('06/02/2019', 'MM-DD-YYYY'),
            currentEndDate: moment('12/02/2019', 'MM-DD-YYYY')
        };
        const startDateDoesNotExist = {
            startDate: null,
            endDate: moment('12/02/2019', 'MM-DD-YYYY'),
            currentEndDate: moment('06/02/2019', 'MM-DD-YYYY')
        };
        const endDateDoesNotExist = {
            startDate: moment('01/02/2019', 'MM-DD-YYYY'),
            endDate: null,
            currentEndDate: moment('06/02/2019', 'MM-DD-YYYY')
        };
        const currentEndDateDoesNotExist = {
            startDate: moment('01/02/2019', 'MM-DD-YYYY'),
            endDate: moment('06/02/2019', 'MM-DD-YYYY'),
            currentEndDate: null
        };
        describe('Contracts', () => {
            it('is a bad date if start date is greater than the end date', () => {
                const badDates = isBadDates(startGreaterThanEndDate, 'contract');
                expect(badDates).toEqual(true);
            });
            it('is a bad date is start date is greater than the current end date', () => {
                const badDates = isBadDates(startGreaterThanCurrentEndDate, 'definitive contract');
                expect(badDates).toEqual(true);
            });
            it('is a bad date if current end date is greater than the end date', () => {
                const badDates = isBadDates(currentEndDateGreaterThanEndDate, 'contract');
                expect(badDates).toEqual(true);
            });
            it('is a bad date if start date does not exist', () => {
                const badDates = isBadDates(startDateDoesNotExist, 'definitive contract');
                expect(badDates).toEqual(true);
            });
            it('is a bad date if end date does not exist', () => {
                const badDates = isBadDates(endDateDoesNotExist, 'contract');
                expect(badDates).toEqual(true);
            });
            it('is a bad date if current end date does not exist', () => {
                const badDates = isBadDates(currentEndDateDoesNotExist, 'definitive contract');
                expect(badDates).toEqual(true);
            });
            it('is good dates', () => {
                const badDates = isBadDates(goodDates, 'contract');
                expect(badDates).toEqual(false);
            });
        });
        describe('IDV and Financial Assistance', () => {
            it('is a bad date if start date is greater than the end date', () => {
                const badDates = isBadDates(startGreaterThanEndDate, 'loan');
                expect(badDates).toEqual(true);
            });
            it('is a bad date if start date does not exist', () => {
                const badDates = isBadDates(startDateDoesNotExist, 'grant');
                expect(badDates).toEqual(true);
            });
            it('is a bad date if end date does not exist', () => {
                const badDates = isBadDates(endDateDoesNotExist, 'idv');
                expect(badDates).toEqual(true);
            });
            it('is good dates', () => {
                const badDates = isBadDates(goodDates, 'idv');
                expect(badDates).toEqual(false);
            });
        });
    });
});

