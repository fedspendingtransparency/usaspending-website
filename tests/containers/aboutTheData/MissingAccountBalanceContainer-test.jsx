import React from 'react';
import { render, screen } from 'test-utils';
import MissingAccountBalanceContainer from 'containers/aboutTheData/modals/MissingAccountBalanceContainer';

const defaultProps = {
    fiscalYear: 2020,
    fiscalPeriod: 8,
    agencyCode: '020'
};

describe('Missing Account Balance Container', () => {
    it('should render column headers', () => {
        render(<MissingAccountBalanceContainer {...defaultProps} />);
        expect(screen.queryByText('Treasury Account Symbol (TAS)')).toBeTruthy();
        expect(screen.queryByText('Obligated Amount')).toBeTruthy();
        expect(screen.queryByText('% of Agency Total in GTAS')).toBeTruthy();
    });
});
