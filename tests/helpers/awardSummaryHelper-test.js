import { isAwardAggregate, isAwardFinancialAssistance } from '../../src/js/helpers/awardSummaryHelper';

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
});

