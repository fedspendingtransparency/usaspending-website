import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import * as aboutTheDataHelper from 'helpers/aboutTheDataHelper';
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
    it('should call the api one time on mount', () => {
        const pubicationDatesRequest = jest.spyOn(aboutTheDataHelper, 'fetchPublishDates');
        render(<PublicationDatesContainer {...defaultProps} />);
        waitFor(() => expect(pubicationDatesRequest).toHaveBeenCalledTimes(1));
    });
});
