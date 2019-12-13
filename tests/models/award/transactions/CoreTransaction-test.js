/**
 * CoreTransaction-test.js
 * Created by Lizzie Salita 3/13/18
 */
import CoreTransaction from "models/award/transactions/CoreTransaction";

const transactionData = {
    actionDate: '1999-12-31',
    actionType: 'a',
    actionTypeDescription: 'New'
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
});
