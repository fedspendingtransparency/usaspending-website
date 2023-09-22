/**
 * @jest-environment jsdom
 * 
 * BaseReferencedAwardResult-test.js
 * Created by Lizzie Salita 2/21/19
 */

import { mockReferencedAwards } from './mockAwardApi';
import BaseReferencedAwardResult from 'models/v2/award/BaseReferencedAwardResult';
import { decodedAwardId, encodedAwardId } from '../../mockData';

const row = Object.create(BaseReferencedAwardResult);
row.populate(mockReferencedAwards.results[0]);

describe('BaseReferencedAwardResult', () => {
    it('should format the dates', () => {
        expect(row.startDate).toEqual('04/28/2013');
        expect(row.endDate).toEqual('05/06/2013');
        expect(row.lastDateToOrder).toEqual('');
    });
    it('should format the obligated amount', () => {
        expect(row.obligatedAmount).toEqual('$4,081');
    });
    it('should truncate the description to 200 characters', () => {
        expect(row.description).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a...');
    });
    it('should encode the award id or treat it as an empty string when null', () => {
        const withId = Object.create(BaseReferencedAwardResult);
        withId.populate({ ...mockReferencedAwards.results[0], generated_unique_award_id: decodedAwardId });

        expect(withId.internalId).toEqual(encodedAwardId);

        const noId = Object.create(BaseReferencedAwardResult);
        noId.populate({ ...mockReferencedAwards.results[0], generated_unique_award_id: null });

        expect(noId.internalId).toEqual('');
    });
});
