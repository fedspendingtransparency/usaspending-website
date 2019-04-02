/**
 * CoreAward-test.js
 * Created by Lizzie Salita 3/12/18
 */

import CoreAward from 'models/v2/awards/CoreAward';

const awardData = {
    category: 'loans',
    startDate: '1989-01-02',
    endDate: '1999-12-31',
    subawardTotal: '12004.75'
};

const award = Object.create(CoreAward);
award.populateCore(awardData);

describe('Core Award getter functions', () => {
    it('should change the loans category to be singular', () => {
        expect(award.category).toEqual('loan');
    });
    it('should properly format the start and end dates', () => {
        expect(award.startDate).toEqual('01/02/1989');
        expect(award.endDate).toEqual('12/31/1999');
    });
    it('should format the subaward total', () => {
        expect(award.subawardTotal).toEqual('$12,005');
    });
});
