/**
 * DatesRow-test.js
 * Created by Max Kendall 12/9/2020
 */

import DatesRow from 'models/v2/aboutTheData/DatesRow';
import { mockAPI } from 'containers/aboutTheData/AgencyTableMapping';

// TODO - update when API contracts are finalized
const mockRow = mockAPI.dates.data.results[0];
const mockTotals = mockAPI.totals.data.results;

const mockDatesRow = Object.create(DatesRow);
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

