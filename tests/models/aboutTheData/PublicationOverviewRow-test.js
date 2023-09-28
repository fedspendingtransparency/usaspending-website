/**
 * @jest-environment jsdom
 * 
 * PublicationOverviewRow-test.js
 * Created by Max Kendall 12/9/2020
 */

import PublicationOverviewRow from 'models/v2/aboutTheData/PublicationOverviewRow';
import { mockAPI } from '../../containers/aboutTheData/mockData';

const mockRow = mockAPI.publications.data.results[0];
const mockTotal = 10000;

const mockDatesRow = Object.create(PublicationOverviewRow);
mockDatesRow.populate(mockRow, mockTotal);

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

test.each([
    [mockTotal, 8000.72, '80.01%'],
    [mockTotal, null, '--'],
    [null, 100, '--']
])('when overall total is %s and agency total is %s, percent of total budget is %s ', (overallTotal, agencyTotal, expected) => {
    const model = Object.create(PublicationOverviewRow);
    const results = {
        ...mockRow,
        current_total_budget_authority_amount: agencyTotal
    };
    model.populate(results, overallTotal);
    expect(model.percentageOfTotalFederalBudget).toEqual(expected);
});
