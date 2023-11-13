/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, waitFor } from 'test-utils';
import * as agencyReportingAPI from 'apis/agencyReporting';
import ReportingDifferencesContainer from 'containers/aboutTheData/modals/ReportingDifferencesContainer';

const defaultProps = {
    agencyData: {
        fiscalYear: 2020,
        fiscalPeriod: 8,
        agencyCode: '012'
    }
};

describe('Reporting Differences Container', () => {
    it('should call api one time on mount', () => {
        const differencesRequest = jest.spyOn(agencyReportingAPI, 'fetchReportingDifferences');
        render(<ReportingDifferencesContainer {...defaultProps} />);
        waitFor(() => expect(differencesRequest).toHaveBeenCalledTimes(1));
    });
});
