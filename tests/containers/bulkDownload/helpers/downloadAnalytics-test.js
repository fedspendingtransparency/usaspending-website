/**
 * @jest-environment jsdom
 *
 * downloadAnalytics-test.js
 * Created by Kevin Li 2/8/18
 */

import * as downloadAnalytics from 'containers/bulkDownload/helpers/downloadAnalytics';
import { initialState } from 'redux/reducers/bulkDownload/bulkDownloadReducer';
import Analytics from 'helpers/analytics/Analytics';

jest.mock('helpers/analytics/Analytics', () => ({
    event: jest.fn()
}));

const mockDates = {
    startDate: '1900-01-01',
    endDate: '1900-01-02'
};

describe('downloadAnalytics', () => {
    describe('logDownloadType', () => {
        it('should send an Analytic event indicating the current donwload type', () => {
            downloadAnalytics.logDownloadType('award');

            expect(Analytics.event).toHaveBeenCalledTimes(1);
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Download Center - Download Type',
                action: 'award',
                event: 'download_center_type',
                gtm: true
            });

            Analytics.event.mockClear();
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
            downloadAnalytics.logSingleDownloadField('award', 'name', 'value');

            expect(Analytics.event).toHaveBeenCalledTimes(1);
            expect(Analytics.event).toHaveBeenCalledWith({
                action: 'name',
                category: 'Download Center - Download - award',
                event: 'download_center_field',
                gtm: true,
                label: 'value'
            });

            Analytics.event.mockClear();
        });
    });

    describe('logDownloadFields', () => {
        const mockAwardDownloadFilterObj = {
            awardLevels: {
                ...initialState.awardLevels,
                primeAwards: true
            },
            awardTypes: {
                ...initialState.awardTypes,
                directPayments: true
            },
            agency: {
                id: '123',
                name: 'test'
            },
            subAgency: {
                id: '456',
                name: 'test2'
            },
            location: {
                country: {
                    code: 'USA',
                    name: 'United States'
                },
                state: {
                    code: 'SC',
                    name: 'South Carolina'
                }
            },
            dateType: 'action_date',
            dateRange: mockDates,
            fileFormat: 'csv'
        };
        it('calls logSingleDownloadField with appropriate values', () => {
            const mockFn = jest.mock('');
            downloadAnalytics.logSingleDownloadField = mockFn;

            downloadAnalytics.logDownloadFields('award', mockAwardDownloadFilterObj);

            expect(Analytics.event).toHaveBeenCalledTimes(8);
            expect(Analytics.event).toHaveBeenCalledWith({
                action: 'Award Levels',
                category: 'Download Center - Download - award',
                event: 'download_center_field',
                gtm: true,
                label: 'Prime Awards'
            });
            expect(Analytics.event).toHaveBeenCalledWith({
                action: 'Award Types',
                category: 'Download Center - Download - award',
                event: 'download_center_field',
                gtm: true,
                label: 'Direct Payments'
            });
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Download Center - Download - award',
                action: 'Agency',
                label: 'Test',
                event: 'download_center_field',
                gtm: true
            });
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Download Center - Download - award',
                action: 'Sub Agency',
                label: 'Test 2',
                event: 'download_center_field',
                gtm: true
            });
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Download Center - Download - award',
                action: 'Location',
                label: 'United States, South Carolina',
                event: 'download_center_field',
                gtm: true
            });
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Download Center - Download - award',
                action: 'Date Type',
                label: 'Action Date',
                event: 'download_center_field',
                gtm: true
            });
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Download Center - Download - award',
                action: 'File Format',
                label: 'csv',
                event: 'download_center_field',
                gtm: true
            });
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Download Center - Download - award',
                action: 'Date Range',
                label: '1900-01-01 - 1900-01-02',
                event: 'download_center_field',
                gtm: true
            });
        });
    });
});
