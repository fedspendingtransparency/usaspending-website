/**
 * CoreAward-test.js
 * Created by Lizzie Salita 3/12/18
 */

import CoreAward from 'models/v2/awards/CoreAward';

const awardData = {
    subawardTotal: '12004.75'
};

const award = Object.create(CoreAward);
award.populateCore(awardData);

describe('Core Award getter functions', () => {
    it('should format the subaward total', () => {
        expect(award.subawardTotal).toEqual('$12,005');
    });
});
