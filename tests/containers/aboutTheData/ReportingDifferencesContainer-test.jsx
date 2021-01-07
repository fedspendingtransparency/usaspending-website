import React from 'react';
import { render, waitFor } from 'test-utils';
import * as aboutTheDataHelper from 'helpers/aboutTheDataHelper';
import ReportingDifferencesContainer from 'containers/aboutTheData/modals/ReportingDifferencesContainer';

const defaultProps = {
    agencyData: {
        fiscalYear: 2020,
        fiscalPeriod: 8,
        agencyCode: '012'
    }
};

describe('Publication Dates Container', () => {
    it('should call api one time on mount', () => {
        const differencesRequest = jest.spyOn(aboutTheDataHelper, 'fetchReportingDifferences');
        render(<ReportingDifferencesContainer {...defaultProps} />);
        waitFor(() => expect(differencesRequest).toHaveBeenCalledTimes(1));
    });
});
