/**
 * CoreAward-test.js
 * Created by David Trinh 10/10/18
 */

import CoreAward from 'models/v2/awardsV2/CoreAward';

const awardData = {
    subawardTotal: 12004.75,
    baseExercisedOptions: 2342342.32,
    totalObligation: 12345678.00,
    baseAndAllOptions: 20100.00
};

const award = Object.create(CoreAward);
award.populateCore(awardData);

describe('Core Award getter functions', () => {
    it('should format the subaward total', () => {
        expect(award.subawardTotal).toEqual('$12,005');
    });
    it('should derive the subawardedPercet', () => {
        expect(award.subAwardedPercent).toEqual('60%');
    });
    it('should derive the subawardedPercet', () => {
        const zeroSubtotalAward = Object.create(CoreAward);
        const data = { ...award, subawardTotal: 0 };
        zeroSubtotalAward.populateCore(data);
        expect(zeroSubtotalAward.subAwardedPercent).toEqual('0%');
    });
});
