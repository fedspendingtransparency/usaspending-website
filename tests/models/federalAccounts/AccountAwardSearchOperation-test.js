/**
 * @jest-environment jsdom
 * 
 * AccountAwardSearchOperation-test.js
 * Created by Jonathan Hill 11/12/19
 */

import AccountAwardSearchOperation from 'models/v1/account/queries/AccountAwardSearchOperation';
import { mockProps } from './MockData';

const searchOperation = new AccountAwardSearchOperation();
const searchParams = searchOperation.spendingByAwardTableParams(mockProps);

describe('Account Award Search Opteration', () => {
    describe('Spending By Award Table Params Method', () => {
        it('should format TAS Codes', () => {
            expect(searchParams.filters.tas_codes[0].aid)
                .toEqual(mockProps.account.agency_identifier);
            expect(searchParams.filters.tas_codes[0].main)
                .toEqual(mockProps.account.main_account_code);
        });
        it('should format Object Class', () => {
            expect(searchParams.filters.object_class).toEqual(['123', '1234']);
        });
        it('should format Program Activity', () => {
            expect(searchParams.filters.program_activity).toEqual(undefined);
        });
    });
    describe('Time Period Formatted Object', () => {
        it('should handle case #1, 2017-2019', () => {
            const fys = searchOperation.timePeriodFormatted(['2017', '2018', '2019']);
            expect(fys[0].start_date).toEqual('2016-10-01');
            expect(fys[0].end_date).toEqual('2019-09-30');
        });
        it('should handle case #2, 2017 & 2019', () => {
            const fys = searchOperation.timePeriodFormatted(['2017', '2019']);
            expect(fys[0].start_date).toEqual('2016-10-01');
            expect(fys[0].end_date).toEqual('2017-09-30');
            expect(fys[1].start_date).toEqual('2018-10-01');
            expect(fys[1].end_date).toEqual('2019-09-30');
        });
        it('should handle case #3, 2017', () => {
            const fys = searchOperation.timePeriodFormatted(['2017']);
            expect(fys[0].start_date).toEqual('2016-10-01');
            expect(fys[0].end_date).toEqual('2017-09-30');
        });
    });
});
