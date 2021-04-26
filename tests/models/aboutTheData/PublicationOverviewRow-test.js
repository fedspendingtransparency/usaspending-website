/**
 * PublicationOverviewRow-test.js
 * Created by Max Kendall 12/9/2020
 */

import PublicationOverviewRow from 'models/v2/aboutTheData/PublicationOverviewRow';
import { mockAPI } from '../../containers/aboutTheData/mockData';

const mockRow = mockAPI.publications.data.results[0];
const mockTotal = 10000;

const mockDatesRow = Object.create(PublicationOverviewRow);
mockDatesRow.populate(mockRow, mockTotal, 2021);

test('should format the agency name', () => {
    expect(mockDatesRow.name).toEqual('Mock Agency (ABC)');
});

test('should handle an agency with no abbreviation', () => {
    const missingAbbrev = {
        ...mockRow,
        abbreviation: ''
    };
    const mockDatesRowMod = Object.create(mockDatesRow);
    mockDatesRowMod.populate(missingAbbrev, mockTotal, 2021);
    expect(mockDatesRowMod.name).toEqual('Mock Agency');
});

test('should format the percent of total federal budget', () => {
    // 8000.72 / 10000
    expect(mockDatesRow.percentageOfTotalFederalBudget).toEqual('80.01%');
});

test('should always have 11 periods if after FY 2021', () => {
    expect(mockDatesRow.periods.length).toEqual(11);
});

test('should remove periods 2, 4, 5 for 2020', () => {
    mockDatesRow.populate(mockRow, mockTotal, 2020);
    expect(mockDatesRow.periods.find((data) => data.period === 2)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 4)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 5)).toEqual(undefined);
});

test('should remove periods 2, 4, 5, 7, 8, 10, 11 for 2018 & 2019', () => {
    mockDatesRow.populate(mockRow, mockTotal, 2018);
    expect(mockDatesRow.periods.find((data) => data.period === 2)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 4)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 5)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 7)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 8)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 10)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 11)).toEqual(undefined);
    mockDatesRow.populate(mockRow, mockTotal, 2019);
    expect(mockDatesRow.periods.find((data) => data.period === 2)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 4)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 5)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 7)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 8)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 10)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 11)).toEqual(undefined);
});

test('should remove periods 2, 3, 4, 5, 7, 8, 10, 11 for 2017', () => {
    mockDatesRow.populate(mockRow, mockTotal, 2017);
    expect(mockDatesRow.periods.find((data) => data.period === 2)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 3)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 4)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 5)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 7)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 8)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 10)).toEqual(undefined);
    expect(mockDatesRow.periods.find((data) => data.period === 11)).toEqual(undefined);
});
