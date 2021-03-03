/**
 * CoreReportingRow-test.js
 * Created by Lizzie Salita 1/12/21
 */

import CoreReportingRow from 'models/v2/aboutTheData/CoreReportingRow';
import { mockAPI } from '../../containers/aboutTheData/mockData';

const mockReportingPeriodRow = mockAPI.submissions.data.results[0];

test.each([
    ['_budgetAuthority', null, { ...mockReportingPeriodRow, current_total_budget_authority_amount: null }],
    ['_budgetAuthority', 0, { ...mockReportingPeriodRow, current_total_budget_authority_amount: 0 }],
    ['budgetAuthority', '--', { ...mockReportingPeriodRow, current_total_budget_authority_amount: null }],
    ['budgetAuthority', '$0.00', { ...mockReportingPeriodRow, current_total_budget_authority_amount: 0 }],
    ['budgetAuthority', '$8,000.72'],
    ['_obligationDifference', 0, { ...mockReportingPeriodRow, obligation_difference: 0 }],
    ['_obligationDifference', null, { ...mockReportingPeriodRow, obligation_difference: null }],
    ['obligationDifference', '--', { ...mockReportingPeriodRow, obligation_difference: null }],
    ['obligationDifference', '$0.00', { ...mockReportingPeriodRow, obligation_difference: 0 }],
    ['obligationDifference', '$4,000.00'],
    ['discrepancyCount', '2,000'],
    ['mostRecentPublicationDate', '01/10/2020'],
    ['_gtasObligationTotal', 50000],
    ['unlinkedContracts', '20,002'],
    ['unlinkedAssistance', '10,001']
])('should format the property %s as %s', (property, output, sourceData = mockReportingPeriodRow) => {
    const row = Object.create(CoreReportingRow);
    row.populateCore(sourceData);
    expect(row[property]).toEqual(output);
});
