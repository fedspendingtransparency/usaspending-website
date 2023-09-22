/**
 * @jest-environment jsdom
 * 
 * bulkDownloadHelper.js
 * Created by Max Kendall 03/30/2021
 */

import { areDefCodesDisabled } from 'helpers/bulkDownloadHelper';

test.each([
    [['accountBalances'], true],
    [null, false],
    ['', false],
    [['accountBalances', ''], false],
    [['accountBalances', 'test'], false]
])('areDefCodesDisabled: when input is %s, return is %s', (input, rtrn) => {
    expect(areDefCodesDisabled(input)).toEqual(rtrn);
});
