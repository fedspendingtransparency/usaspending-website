/**
 * SpendingOverTimeContainer-test.js
 * Created by Lizzie Salita 6/10/20
 * */

import { parseRows } from 'containers/covid19/spendingOverTime/SpendingOverTimeContainer';

describe('SpendingOverTimeContainer', () => {
    describe('parseRows', () => {
        const columns = [
            { title: 'total' },
            { title: 'contracts' },
            { title: 'idvs' },
            { title: 'grants' },
            { title: 'loans' },
            { title: 'direct_payments' },
            { title: 'other' }
        ];
        it('should parse returned spending over time data', () => {
            const mockResults = [
                {
                    amounts: {
                        total: 1000,
                        contracts: 100,
                        idvs: 200,
                        grants: 100,
                        loans: 300,
                        direct_payments: 100,
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
                    '$1,000',
                    '$100',
                    '$200',
                    '$100',
                    '$300',
                    '$100',
                    '$0'
                ],
                [
                    'April 2020',
                    '$1,000',
                    '$300',
                    '$200',
                    '$100',
                    '$100',
                    '$100',
                    '$100'
                ]
            ];

            const parsed = parseRows(mockResults, columns, 'amounts');
            expect(parsed).toEqual(expected);
        });
        it('should parse returned new awards over time data', () => {
            const mockResults = [
                {
                    counts: {
                        total: 1000,
                        contracts: 100,
                        idvs: 200,
                        grants: 100,
                        loans: 300,
                        direct_payments: 100,
                        other: 0
                    },
                    time_period: {
                        fiscal_year: 2020,
                        period: 6
                    }
                },
                {
                    counts: {
                        total: 1000,
                        contracts: 300,
                        idvs: 200,
                        grants: 100,
                        loans: 100,
                        direct_payments: 100,
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
                    '1,000',
                    '100',
                    '200',
                    '100',
                    '300',
                    '100',
                    '0'
                ],
                [
                    'April 2020',
                    '1,000',
                    '300',
                    '200',
                    '100',
                    '100',
                    '100',
                    '100'
                ]
            ];

            const parsed = parseRows(mockResults, columns, 'counts');
            expect(parsed).toEqual(expected);
        });
    });
});
