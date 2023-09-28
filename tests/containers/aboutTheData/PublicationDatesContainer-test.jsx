/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import * as agencyReportingAPI from 'apis/agencyReporting';
import PublicationDatesContainer from 'containers/aboutTheData/modals/PublicationDatesContainer';

const defaultProps = {
    agencyData: {
        fiscalYear: 2020,
        fiscalPeriod: 8,
        agencyCode: '020'
    }
};

describe('Publication Dates Container', () => {
    it('should render column headers', () => {
        render(<PublicationDatesContainer {...defaultProps} />);
        expect(screen.queryByText('Publication Dates')).toBeTruthy();
        expect(screen.queryByText('Certification Dates')).toBeTruthy();
    });
    it('should render deadline subheaders', () => {
        render(<PublicationDatesContainer {...defaultProps} />);
        expect(screen.getAllByText('Deadline: --')).toHaveLength(2);
    });
    it('should call the api one time on mount', async () => {
        const pubicationDatesRequest = jest.spyOn(agencyReportingAPI, 'fetchPublishDates');
        render(<PublicationDatesContainer {...defaultProps} />);
        await waitFor(() => expect(pubicationDatesRequest).toHaveBeenCalledTimes(1));
    });
});
