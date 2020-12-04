import React from 'react';
import { render, screen } from 'test-utils';
import ReportingDifferencesContainer from 'containers/aboutTheData/modals/ReportingDifferencesContainer';
import { reportingDifferencesColumns } from 'dataMapping/aboutTheData/modals';

const defaultProps = {
    fiscalYear: 2020,
    fiscalPeriod: 8,
    agencyCode: '020',
    agencyData: {
        agencyName: 'Jon',
        obligationDiff: 50,
        tasAccountsTotal: 100
    }
};

describe('Missing Account Balance Container', () => {
    it('should render column headers', () => {
        render(<ReportingDifferencesContainer {...defaultProps} />);
        expect(screen.queryByText(reportingDifferencesColumns[0].displayName)).toBeTruthy();
        expect(screen.queryByText(reportingDifferencesColumns[1].displayName)).toBeTruthy();
        expect(screen.queryByText(reportingDifferencesColumns[2].displayName)).toBeTruthy();
        expect(screen.queryByText(reportingDifferencesColumns[3].displayName)).toBeTruthy();
    });
});
