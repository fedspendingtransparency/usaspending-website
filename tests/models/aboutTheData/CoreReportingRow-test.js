/**
 * CoreReportingRow-test.js
 * Created by Lizzie Salita 1/12/21
 */

import CoreReportingRow from 'models/v2/aboutTheData/CoreReportingRow';
import { mockAPI } from '../../containers/aboutTheData/mockData';

const mockReportingPeriodRow = mockAPI.submissions.data.results[0];

const row = Object.create(CoreReportingRow);
row.populateCore(mockReportingPeriodRow);

describe('Core Reporting Row model', () => {
    it('should format the budget authority', () => {
        expect(row.budgetAuthority).toEqual('$8,000.72');
    });
    it('should format the obligation difference', () => {
        expect(row.obligationDifference).toEqual('$4,000.00');
    });
    it('should format the discrepancy count', () => {
        expect(row.discrepancyCount).toEqual('2,000');
    });
    it('should format the publication date', () => {
        expect(row.mostRecentPublicationDate).toEqual('01/10/2020');
    });
    it('should store the raw GTAS Obligation Total', () => {
        expect(row._gtasObligationTotal).toEqual(50000);
    });
    it('should format the unlinked contracts count', () => {
        expect(row.unlinkedContracts).toEqual('20,002');
    });
    it('should format the unlinked assistance awards count', () => {
        expect(row.unlinkedAssistance).toEqual('10,001');
    });
});
