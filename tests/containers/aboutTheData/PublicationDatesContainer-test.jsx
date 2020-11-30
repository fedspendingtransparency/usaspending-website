import React from 'react';
import { render, screen } from 'test-utils';
import PublicationDatesContainer from 'containers/aboutTheData/modals/PublicationDatesContainer';

const defaultProps = {
    fiscalYear: 2020,
    fiscalPeriod: 8,
    agencyCode: '020'
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
});
