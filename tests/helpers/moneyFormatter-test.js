/**
 * moneyFormatter-test.js
 * Created by Kevin Li 1/25/17
 */

import { formatMoney, formatMoneyWithPrecision, calculatePercentage } from 'helpers/moneyFormatter';

test.each([
    [123.45, '$123'],
    [123.75, '$124'],
    [123.50, '$124'],
    [12345678.23, '$12,345,678'],
    [-12345678.23, '-$12,345,678'],
    [0, '$0']
])('formatMoney: when input is %s --> %s', (input, output) => {
    expect(formatMoney(input)).toEqual(output);
});

test.each([
    [123.45, '$123.45'],
    [0, '$0.00', '--'],
    ['', '--', '--'],
    [null, '--', '--'],
    [null, 'you can specify the default return value in this case', 'you can specify the default return value in this case'],
    ['', '$0.00']
])('formatMoneyWithPrecision: when input is %s --> %s', (input, output, defaultReturn = null) => {
    expect(formatMoneyWithPrecision(input, 2, defaultReturn)).toEqual(output);
});

test.each([
    [50, 100, '50.0%'],
    [50, 0, 'Happy Troll Dance', 'Happy Troll Dance'],
    [50, 0, '--'],
    // TODO: DEV-6952 created to handle this.
    [.0000000001, 100000, "0.00%", '--', 2],
    [50, null, '--'],
    [50, 'null', '--'],
    [50, '', '--'],
    [null, 100, '--'],
    ['null', 100, '--'],
    ['', 100, '--']
])('calculatePercentage with inputs %s and %s returns %s', (num, denom, rtrn, defaultRtrn = '--', toDecimalPlaces = 1) => {
    expect(calculatePercentage(num, denom, defaultRtrn, toDecimalPlaces)).toEqual(rtrn);
});
