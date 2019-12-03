import {
    isAwardAggregate,
    isAwardFinancialAssistance,
    getAwardTypeByRecordtypeCountyAndState
} from '../../src/js/helpers/awardSummaryHelper';

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
});

