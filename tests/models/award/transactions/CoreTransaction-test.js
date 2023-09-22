/**
 * @jest-environment jsdom
 * 
 * CoreTransaction-test.js
 * Created by Lizzie Salita 3/13/18
 */

import CoreTransaction from "models/v2/award/transactions/CoreTransaction";

const transactionData = {
    actionDate: '1999-12-31',
    actionType: 'a',
    actionTypeDescription: 'New',
    cfda_number: '12.345'
};

const transaction = Object.create(CoreTransaction);
transaction.populateCore(transactionData);


describe('CoreTransactions', () => {
    it('should format the action date', () => {
        expect(transaction.actionDate).toEqual('12/31/1999');
    });
    it('should format the action type description', () => {
        expect(transaction.actionTypeDescription).toEqual('A: New');
    });
    it('should contain the cfda number', () => {
        expect(transaction.cfdaNumber).toEqual('12.345');
    });
});
