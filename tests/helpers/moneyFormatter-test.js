/**
 * @jest-environment jsdom
 * 
 * moneyFormatter-test.js
 * Created by Kevin Li 1/25/17
 */

import { formatMoney, formatMoneyWithPrecision, calculatePercentage, formatTreemapValues, formatMoneyWithUnits, formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

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
    [0.0000000001, 100000, "< 0.01%", '--', 2, { absoluteMin: '< 0.01%' }],
    [0.0000000001, 100000, "0.00%", '--', 2, { absoluteMin: null }],
    [50, null, '--'],
    [50, 'null', '--'],
    [50, '', '--'],
    [null, 100, '--'],
    ['null', 100, '--'],
    ['', 100, '--']
])('calculatePercentage with inputs %s and %s returns %s', (num, denom, rtrn, defaultRtrn = '--', toDecimalPlaces = 1, config = { absoluteMin: '' }) => {
    expect(calculatePercentage(num, denom, defaultRtrn, toDecimalPlaces, config)).toEqual(rtrn);
});

test.each([
    [123.45, '$123.45'],
    [1230.50, '$1,230.50'],
    [12345678.23, '$12.3 million'],
    [-12345678.23, '-$12.3 million'],
    [0, '$0']
])('formatTreemapValues: when input is %s --> %s', (input, output) => {
    expect(formatTreemapValues(input)).toEqual(output);
});

test.each([
    [123.45, '$123.45'],
    [1230.50, '$1,230.50'],
    [12345678.23, '$12.35 Million'],
    [-12345678.23, '-$12.35 Million'],
    [1234567800.23, '$1.23 Billion'],
    [-1234567800.23, '-$1.23 Billion'],
    [0, '$0.00'],
    [null, '--']
])('formatMoneyWithUnits: when input is %s --> %s', (input, output) => {
    expect(formatMoneyWithUnits(input, true)).toEqual(output);
});

test.each([
    [123.45, '$123'],
    [1230.50, '$1,231'],
    [12345678.23, '$12.3M'],
    [-12345678.23, '-$12.3M'],
    [1234567800.23, '$1.2B'],
    [-1234567800.23, '-$1.2B'],
    [0, '$0'],
    [null, '--']
])('formatMoneyWithUnitsShortLabel: when input is %s --> %s', (input, output) => {
    expect(formatMoneyWithUnitsShortLabel(input)).toEqual(output);
});

test('formatMoneyWithUnitsShort handles specified precision', () => {
    expect(formatMoneyWithUnitsShortLabel(12345678.23, 2)).toEqual('$12.35M');
});
