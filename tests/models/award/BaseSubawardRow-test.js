/**
 * @jest-environment jsdom
 * 
 * BaseSubawardRow-test.js
 * Created by Lizzie Salita 3/13/18
 */

import BaseSubawardRow from 'models/v2/award/subawards/BaseSubawardRow';

const mockSubaward = {
    id: '456789',
    subaward_number: '123',
    description: null,
    action_date: '1987-01-02',
    amount: '2023.67',
    recipient_name: 'Mock Recipient Name'
};

const subawardRow = Object.create(BaseSubawardRow);
subawardRow.populate(mockSubaward);

describe('BaseSubawardRow', () => {
    it('should return -- for a null description', () => {
        expect(subawardRow.description).toEqual('--');
    });
    it('should format the action date', () => {
        expect(subawardRow.actionDate).toEqual('01/02/1987');
    });
    it('should format the subaward amount', () => {
        expect(subawardRow.amount).toEqual('$2,024');
    });
});
