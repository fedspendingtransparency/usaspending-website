/**
 * SpendingOverTimeContainer-test.js
 * Created by Lizzie Salita 6/10/20
 * */

import { parseRows } from 'containers/covid19/spendingOverTime/SpendingOverTimeContainer';

describe('SpendingOverTimeContainer', () => {
    describe('parseRows', () => {
        it('should parse returned contract data and send to the Redux store', () => {
            const mockResults = [
                {
                    amounts: {
                        total: 1000,
                        contracts: 100,
                        idvs: 200,
                        grants: 100,
                        loans: 300,
                        direct_payments: 100,
                        insurance: 200,
                        other: 0
                    },
                    time_period: {
                        fiscal_year: 2020,
                        period: 6
                    }
                },
                {
                    amounts: {
                        total: 1000,
                        contracts: 300,
                        idvs: 200,
                        grants: 100,
                        loans: 100,
                        direct_payments: 100,
                        insurance: 100,
                        other: 100
                    },
                    time_period: {
                        fiscal_year: 2020,
                        period: 7
                    }
                }
            ];
            const expected = [
                [
                    'March 2020',
                    '$100',
                    '$200',
                    '$100',
                    '$100',
                    '$300',
                    '$0'
                ],
                [
                    'April 2020',
                    '$300',
                    '$200',
                    '$100',
                    '$100',
                    '$100',
                    '$100'
                ]
            ];
            const parsed = parseRows(mockResults);
            expect(parsed).toEqual(expected);
        });
    });
});
