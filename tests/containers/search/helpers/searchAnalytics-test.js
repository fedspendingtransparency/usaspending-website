/**
 * @jest-environment jsdom
 * 
 * searchAnalytics-test.js
 * Created by Kevin Li 2/5/18
 */

import { Set, OrderedMap } from 'immutable';
import * as searchAnalytics from 'containers/search/helpers/searchAnalytics';

// mock the child component by replacing it with a function that returns a null element
jest.mock('helpers/analytics/Analytics', () => ({
    event: jest.fn(),
    pageview: jest.fn()
}));

describe('searchAnalytics', () => {
    describe('convertDateRange', () => {
        it('should parse a date range object from the Redux store into an Analytics event', () => {
            const mockRange = ['1900-01-01', '1900-01-02'];
            const event = searchAnalytics.convertDateRange(mockRange);
            expect(event).toEqual([{
                action: 'Time Period - Date Range',
                label: '1900-01-01 to 1900-01-02'
            }]);
        });
        it('should handle null start dates as an open-ended date range', () => {
            const mockRange = [null, '1900-01-02'];
            const event = searchAnalytics.convertDateRange(mockRange);
            expect(event).toEqual([{
                action: 'Time Period - Date Range',
                label: '... to 1900-01-02'
            }]);
        });
        it('should handle null end dates as date range ending on the present day', () => {
            const mockRange = ['1900-01-01', null];
            const event = searchAnalytics.convertDateRange(mockRange);
            expect(event).toEqual([{
                action: 'Time Period - Date Range',
                label: '1900-01-01 to present'
            }]);
        });
        it('should ignore an incomplete date range', () => {
            const mockRange = ['abc'];
            const event = searchAnalytics.convertDateRange(mockRange);
            expect(event).toBeFalsy();
        });
    });

    describe('parseAgency', () => {
        it('should return the top tier agency information for a top-tier agency', () => {
            const data = {
                agencyType: 'toptier',
                toptier_agency: {
                    name: 'Test',
                    abbreviation: 'ABC',
                    toptier_code: '123'
                }
            };
            const agency = searchAnalytics.parseAgency(data);
            expect(agency).toEqual('Test (ABC)/123');
        });
        it('should return the sub tier agency information for a sub-tier agency', () => {
            const data = {
                agencyType: 'subtier',
                toptier_agency: {
                    name: 'Test',
                    abbreviation: 'ABC',
                    toptier_code: '123'
                },
                subtier_agency: {
                    name: 'Sub',
                    subtier_code: '2222'
                }
            };
            const agency = searchAnalytics.parseAgency(data);
            expect(agency).toEqual('Sub/2222 - Test/123');
        });
        it('should return null for an invalid or unexpected agency object structure', () => {
            const bad = {
                agency: {
                    name: 'Hello'
                }
            };
            const agency = searchAnalytics.parseAgency(bad);
            expect(agency).toBeFalsy();
        });
    });

    describe('convertReducibleValue', () => {
        it('should return an array of objects of equal length to the inbound value count',() => {
            const data = Set([1, 2, 3, 4]);
            expect(data.count()).toEqual(4);

            const reduced = searchAnalytics.convertReducibleValue(data, 'action');
            expect(Array.isArray(reduced)).toBeTruthy();
            expect(reduced.length).toEqual(4);
        });
        it('should return an array of objects with `action` and `label` properties', () => {
            const data = [1, 2, 3, 4, 5];
            const reduced = searchAnalytics.convertReducibleValue(data, 'action');

            expect(reduced.every(
                (result) => ({}.hasOwnProperty.call(result, 'action') && {}.hasOwnProperty.call(result, 'label'))
            )).toBeTruthy();
        });
        it('should return an array of objects with an `action` of the specified type', () => {
            const data = [1, 2, 3, 4, 5];
            const reduced = searchAnalytics.convertReducibleValue(data, 'action');
            
            expect(reduced.every(
                (result) => result.action === 'action'
            )).toBeTruthy();
        });
        it('should return an array of objects with a `label` value that is the result of the iterated value item passed through the parser function', () => {
            const data = [1, 2, 3, 4, 5];
            const reduced = searchAnalytics.convertReducibleValue(
                data,
                'action',
                (item) => item * 2
            );

            const expected = [2, 4, 6, 8, 10];
            expect(reduced.every(
                (result, index) => result.label === expected[index]
            )).toBeTruthy();
        });
        it('should return an array of objects with a `label` value equal to the iterated value item when no parser function is provided', () => {
            const data = [1, 2, 3, 4, 5];
            const reduced = searchAnalytics.convertReducibleValue(data, 'action', undefined);

            const expected = [1, 2, 3, 4, 5];
            expect(reduced.every(
                (result, index) => result.label === expected[index]
            )).toBeTruthy();
        });
    });

    describe('convertTimePeriod', () => {
        it('should assume an Immutable Set is a fiscal year', () => {
            const data = new Set(['1900']);
            const converted = searchAnalytics.convertTimePeriod(data);
            expect(Array.isArray(converted)).toBeTruthy();
            expect(converted[0].action).toEqual('Time Period - Fiscal Year');
        });
        it('should assume an an array is a date range', () => {
            const data = ['1900-01-01', '1900-02-01'];
            const converted = searchAnalytics.convertTimePeriod(data);
            expect(Array.isArray(converted)).toBeTruthy();
            expect(converted[0].action).toEqual('Time Period - Date Range');
        });
        it('should return null in other situations', () => {
            const data = 'hello';
            const converted = searchAnalytics.convertTimePeriod(data);
            expect(converted).toBeFalsy();
        });
    });

    describe('convertLocation', () => {
        it('should parse locations into strings with the location level and name', () => {
            const data = new OrderedMap({
                '123': {
                    display: {
                        entity: 'County',
                        standalone: 'Orange County, CA'
                    }
                }
            });
            const converted = searchAnalytics.convertLocation(data, 'test');
            expect(converted[0].label).toEqual('County - Orange County, CA');
        });
    });

    describe('combineAwardTypeGroups', () => {
        it('should combine award types into a single `All` item when an entire group is selected', () => {
            const data = new Set(['A', 'B', 'C', 'D'])
            const combined = searchAnalytics.combineAwardTypeGroups(data);
            expect(combined).toEqual(['All Contracts']);
        });
        it('should not combine award types into a single `All` item when some members of the group are not selected', () => {
            const data = new Set(['A', 'B', 'C'])
            const combined = searchAnalytics.combineAwardTypeGroups(data);
            expect(combined).toEqual(['A', 'B', 'C']);
        });
        it('when some full groups are selected and some incomplete groups are selected, the incomplete items should be reported individually', () => {
            const data = new Set(['A', 'B', 'C', 'D', '01'])
            const combined = searchAnalytics.combineAwardTypeGroups(data);
            expect(combined).toEqual(['All Contracts', '01']);
        });
    });

    describe('unifyDateFields', () => {
        it('should set the `timePeriod` field to the `timePeriodFY` redux filter when fiscal years are selected', () => {
            const filters = {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['1900'])
            };
            const redux = searchAnalytics.unifyDateFields(filters);
            expect(redux.timePeriod).toEqual(new Set(['1900']));
        });
        it('should set the `timePeriod` field to an array of `timePeriodStart` and `timePeriodEnd` filters when a date range is selected', () => {
            const filters = {
                timePeriodType: 'dr',
                timePeriodStart: '1900-01-01',
                timePeriodEnd: '1900-02-01'
            };
            const redux = searchAnalytics.unifyDateFields(filters);
            expect(redux.timePeriod).toEqual(['1900-01-01', '1900-02-01']);
        });
    });

    describe('convertFiltersToAnalyticEvents', () => {
        it('should flatten an array of converted filters arrays to a single-level array', () => {
            const filters = {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['1900', '1902'])
            };
            const events = searchAnalytics.convertFiltersToAnalyticEvents(filters);
            expect(Array.isArray(events)).toBeTruthy();
            expect(events).toEqual([
                {
                    action: 'Time Period - Fiscal Year',
                    label: '1900'
                },
                {
                    action: 'Time Period - Fiscal Year',
                    label: '1902'
                }
            ]);
        });
    });

    describe('sendAnalyticEvents', () => {
        it('should update each event with a `category` property', () => {
            const events = [{
                action: 'action',
                label: 'label'
            }];

            const Analytics = require('helpers/analytics/Analytics');

            searchAnalytics.sendAnalyticEvents(events);
            expect(Analytics.event).toHaveBeenCalledTimes(1);
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Advanced Search - Search Filter',
                action: 'action',
                label: 'label'
            });

            Analytics.event.mockClear();
        });
    });

    describe('sendFieldCombinations', () => {
        it('should send an Analytic event with a non-repeating `|` separated string of filter names', () => {
            const events = [{
                action: 'action',
                label: 'label'
            }, {
                action: 'action',
                label: 'label2'
            }, {
                action: 'z',
                label: '123'
            }];

            const Analytics = require('helpers/analytics/Analytics');

            searchAnalytics.sendFieldCombinations(events);
            expect(Analytics.event).toHaveBeenCalledTimes(1);
            expect(Analytics.event).toHaveBeenCalledWith({
                category: 'Advanced Search - Search Fields',
                action: 'action|z',
                event: 'search_send_all_fields',
                gtm: true
            });

            Analytics.event.mockClear();
        });
    });

    describe('uniqueFilterFields', () => {
        it('should return a string of non-repeating `|` separated string of filter names', () => {
            const filters = {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['1900']),
                selectedAwardIDs: new OrderedMap({
                    abc: 'abc'
                })
            };

            const fields = searchAnalytics.uniqueFilterFields(filters);
            expect(fields).toEqual('Award ID|Time Period - Fiscal Year');
        });
    });
});
