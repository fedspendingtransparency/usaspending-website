/**
 * @jest-environment jsdom
 */
import {
    isAwardAggregate,
    isAwardFinancialAssistance,
    getAwardTypeByRecordtypeCountyAndState,
    isBadDates,
    isUSAAward,
    getSubmittingAgencyId
} from 'helpers/awardSummaryHelper';

const dayjs = require('dayjs');


describe('awardSummaryHelper', () => {
    describe('getSubmittingAgencyId', () => {
        it('returns submitting agency ID when parent PIID is defined ', () => {
            const mockAwardId = "CONT_AWD_DEAC5206NA25396_8900_ASDF";
            expect(getSubmittingAgencyId(mockAwardId)).toEqual("8900");
        });
        it('returns submitting agency ID when parent PIID is undefined ', () => {
            const mockAwardId = "CONT_AWD_DEAC5206NA25396_8900_-NONE-_-NONE-";
            expect(getSubmittingAgencyId(mockAwardId)).toEqual("8900");
        });
        it('returns \'--\' when awardId is undefined ', () => {
            const mockAwardId = null;
            expect(getSubmittingAgencyId(mockAwardId)).toEqual("--");
        });
    });

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
    describe('getAwardTypeByRecordtypeCountyAndState', () => {
        // Financial Assistance Records
        // record type 3 - redacted due to pii
        // record type 2 - other FA
        // non FA - Contract and IDV
        const faRecordTypeTwoAndThreeAndNonFA = [
            ['redactedDueToPIIForeign', 'grant', 3, 'Redacted Due To PII', { _countryCode: 'Not USA' }],
            ['redactedDueToPIIDomestic', 'other', 3, 'Redacted Due To PII', { _countryCode: 'USA' }],
            ['financialAssistanceForeign', 'insurance', 2, 'Other FA', { _countryCode: 'Not USA' }],
            ['financialAssistanceDomestic', 'loan', 2, 'Other FA', { _countryCode: 'UNITED STATES' }],
            ['nonFinancialAssistanceForeign', 'contract', null, 'Contract', { _countryCode: 'FRA' }],
            ['nonFinancialAssistanceDomestic', 'contract', null, 'Contract', { _countryCode: 'UNITED STATES' }],
            ['nonFinancialAssistanceForeign', 'idv', null, 'IDV', { _countryCode: 'GBR' }],
            ['nonFinancialAssistanceDomestic', 'idv', null, 'IDV', { _countryCode: 'UNITED STATES' }]
        ];
        it.each(faRecordTypeTwoAndThreeAndNonFA)(
            'should return %p when award type is %p record type is %p (%p) and country is %p',
            (returnValue, awardType, recordType, specificType, locationObject) => {
                const data = getAwardTypeByRecordtypeCountyAndState(
                    awardType,
                    locationObject,
                    recordType
                );
                expect(data).toEqual(returnValue);
            }
        );
        const cases = [
            ['aggregatedByState', '1', 'USA', 'Does Not Exist', 'grant', { _countryCode: 'USA', _countyCode: null }, 1],
            ['aggregatedByCounty', '1', 'USA', 'Exists', 'grant', { _countryCode: 'USA', _countyCode: '001' }, 1],
            ['aggregatedByCountry', '1', 'Not USA', 'Does Not Matter', 'grant', { _countryCode: 'Greece' }, 1]
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
            startDate: dayjs('01/02/2019', 'MM-DD-YYYY'),
            endDate: dayjs('12/02/2019', 'MM-DD-YYYY'),
            currentEndDate: dayjs('05/29/2019', 'MM-DD-YYYY')
        };
        const startGreaterThanEndDate = {
            startDate: dayjs('06/02/2019', 'MM-DD-YYYY'),
            endDate: dayjs('05/29/2019', 'MM-DD-YYYY'),
            currentEndDate: dayjs('04/02/2019', 'MM-DD-YYYY')
        };
        const startGreaterThanCurrentEndDate = {
            startDate: dayjs('06/02/2019', 'MM-DD-YYYY'),
            endDate: dayjs('12/02/2019', 'MM-DD-YYYY'),
            currentEndDate: dayjs('05/29/2019', 'MM-DD-YYYY')
        };
        const currentEndDateGreaterThanEndDate = {
            startDate: dayjs('01/02/2019', 'MM-DD-YYYY'),
            endDate: dayjs('06/02/2019', 'MM-DD-YYYY'),
            currentEndDate: dayjs('12/02/2019', 'MM-DD-YYYY')
        };
        const startDateDoesNotExist = {
            startDate: dayjs(null, 'MM-DD-YYYY'),
            endDate: dayjs('12/02/2019', 'MM-DD-YYYY'),
            currentEndDate: dayjs('06/02/2019', 'MM-DD-YYYY')
        };
        const endDateDoesNotExist = {
            startDate: dayjs('01/02/2019', 'MM-DD-YYYY'),
            endDate: dayjs(null, 'MM-DD-YYYY'),
            currentEndDate: dayjs('06/02/2019', 'MM-DD-YYYY')
        };
        const currentEndDateDoesNotExist = {
            startDate: dayjs('01/02/2019', 'MM-DD-YYYY'),
            endDate: dayjs('06/02/2019', 'MM-DD-YYYY'),
            currentEndDate: dayjs(null, 'MM-DD-YYYY')
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
    describe('IS USA Award', () => {
        const usaData0 = {
            _countryCode: 'UNITED STATES',
            countryName: 'UNITED STATES'
        };
        const usaData1 = {
            _countryCode: 'USA',
            countryName: 'UNITED STATES'
        };
        const usaData2 = {
            _countryCode: '',
            countryName: 'UNITED STATES'
        };
        const foreignData1 = {
            _countryCode: 'GBR',
            countryName: 'Great Britain'
        };
        const badData = {
            _countryCode: '',
            countryName: ''
        };
        it('should return true when country code is UNITED STATES', () => {
            expect(isUSAAward(usaData0)).toEqual(true);
        });
        it('should return true when country code is USA', () => {
            expect(isUSAAward(usaData1)).toEqual(true);
        });
        it('should return true when country name is UNITED STATES', () => {
            expect(isUSAAward(usaData2)).toEqual(true);
        });
        it('should return false when country code is foreign and country name is not UNITED STATES', () => {
            expect(isUSAAward(foreignData1)).toEqual(false);
        });
        it('should return -- when country code and country name DNE', () => {
            expect(isUSAAward(badData)).toEqual(false);
        });
    });
});

