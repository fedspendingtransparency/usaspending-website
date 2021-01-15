/**
 * PublicationOverviewRow-test.js
 * Created by Max Kendall 12/9/2020
 */

import PublicationOverviewRow from 'models/v2/aboutTheData/PublicationOverviewRow';
import { mockAPI } from '../../containers/aboutTheData/mockData';

const mockRow = mockAPI.publications.data.results[0];
const mockTotals = mockAPI.totals.data.results;

const mockDatesRow = Object.create(PublicationOverviewRow);
mockDatesRow.populate(2020, mockRow, mockTotals);

test('should format the agency name', () => {
    expect(mockDatesRow.name).toEqual('Department of Health and Human Services (DHHS)');
});

test('should handle an agency with no abbreviation', () => {
    const missingAbbrev = {
        ...mockRow,
        abbreviation: ''
    };
    const mockDatesRowMod = Object.create(mockDatesRow);
    mockDatesRowMod.populate('2020', missingAbbrev, mockTotals);
    expect(mockDatesRowMod.name).toEqual('Department of Health and Human Services');
});

test('should format the percent of total federal budget', () => {
    expect(mockDatesRow.percentageOfTotalFederalBudget).toEqual('100.00%');
});

test('should always have 12 periods', () => {
    expect(mockDatesRow.periods.length).toEqual(12);
});

