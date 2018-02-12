/**
 * downloadAnalytics-test.js
 * Created by Kevin Li 2/8/18
 */

import * as downloadAnalytics from 'containers/bulkDownload/helpers/downloadAnalytics';

jest.mock('helpers/analytics/Analytics', () => ({
    event: jest.fn()
}));

describe('downloadAnalytics', () => {
    describe('logDownloadType', () => {
        it('should send an Analytic event indicating the current donwload type', () => {
            const Analytics = require('helpers/analytics/Analytics');

            downloadAnalytics.logDownloadType('award');

            expect(Analytics.event).toHaveBeenCalledTimes(1);
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Download Center - Download Type',
                action: 'award'
            });

            Analytics.event.mockClear();
        });
    });

    describe('convertKeyedField', () => {
        it('should evaluate each property in the given object for truthiness and return an array of only truthy keys', () => {
            const inbound = {
                first: true,
                second: '',
                third: 1,
                fourth: false
            };

            expect(downloadAnalytics.convertKeyedField(inbound)).toEqual(['first', 'third']);
        });
    });

    describe('convertDateRange', () => {
        it('should return both the start and end date when they are available', () => {
            const dates = {
                startDate: '1900-01-01',
                endDate: '1900-01-02'
            };
            expect(downloadAnalytics.convertDateRange(dates)).toEqual('1900-01-01 - 1900-01-02');
        });
        it('should return only the start date when there is no end date', () => {
            const dates = {
                startDate: '1900-01-01',
                endDate: ''
            };
            expect(downloadAnalytics.convertDateRange(dates)).toEqual('1900-01-01 - present');
        });
        it('should return only the end date when there is no start date', () => {
            const dates = {
                startDate: '',
                endDate: '1900-01-02'
            };
            expect(downloadAnalytics.convertDateRange(dates)).toEqual('... - 1900-01-02');
        });
        it('should return null when no dates are available', () => {
            const dates = {
                startDate: '',
                endDate: ''
            };
            expect(downloadAnalytics.convertDateRange(dates)).toBeFalsy();
        });
    });

    describe('logSingleDownloadField', () => {
        it('should log an Analytic event using the download type as the `category`, the field name as the `action`, and the value as the `label`', () => {
            const Analytics = require('helpers/analytics/Analytics');

            downloadAnalytics.logSingleDownloadField('award', 'name', 'value');

            expect(Analytics.event).toHaveBeenCalledTimes(1);
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Download Center - Download - award',
                action: 'name',
                label: 'value'
            });
            Analytics.event.mockClear();
        });
    });
});