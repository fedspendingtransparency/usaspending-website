/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import * as agencyReportingAPI from 'apis/agencyReporting';
import MissingAccountBalanceContainer from 'containers/aboutTheData/modals/MissingAccountBalanceContainer';

const defaultProps = {
    agencyData: {
        fiscalYear: 2020,
        fiscalPeriod: 8,
        agencyCode: '020',
        gtasObligationTotal: 1011010
    }
};

describe('Missing Account Balance Container', () => {
    it('should render column headers', () => {
        render(<MissingAccountBalanceContainer {...defaultProps} />);
        expect(screen.queryByText('Treasury Account Symbol (TAS)')).toBeTruthy();
        expect(screen.queryByText('Obligated Amount')).toBeTruthy();
        expect(screen.queryByText('% of Agency Total in GTAS')).toBeTruthy();
    });
    it('should call the api one time on mount', () => {
        const pubicationDatesRequest = jest.spyOn(agencyReportingAPI, 'fetchPublishDates');
        render(<MissingAccountBalanceContainer {...defaultProps} />);
        waitFor(() => expect(pubicationDatesRequest).toHaveBeenCalledTimes(1));
    });
});
