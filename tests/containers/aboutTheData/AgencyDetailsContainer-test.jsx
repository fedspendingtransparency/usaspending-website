import React from 'react';
import { render, waitFor, fireEvent, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import * as aboutTheDataHelper from 'helpers/aboutTheDataHelper';
import AgencyDetailsContainer from 'containers/aboutTheData/AgencyDetailsContainer';
import { mockReportingPeriodRow } from './mockData';

const defaultProps = {
    agencyName: 'Mock Agency (ABC)',
    agencyCode: '123',
    modalClick: jest.fn()
};

const mockResponse = {
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve(mockReportingPeriodRow);
        });
    }),
    cancel: () => {
        console.log('cancel executed!');
    }
};

test('makes a request for table data on mount', () => {
    const tableRequest = jest.spyOn(aboutTheDataHelper, 'fetchAgency').mockReturnValue(mockResponse);

    render(<AgencyDetailsContainer {...defaultProps} />);
    expect(tableRequest).toHaveBeenCalledTimes(2); // once for each useEffect
});

test('when the sort field changes, a new request is made', () => {
    const tableRequest = jest.spyOn(aboutTheDataHelper, 'fetchAgency').mockClear().mockReturnValue(mockResponse);
    render(<AgencyDetailsContainer {...defaultProps} />);

    fireEvent.click(screen.getByTitle('Sort table by descending Percent of Total Federal Budget'));
    expect(tableRequest).toHaveBeenCalledTimes(3);
});

test('when the sort order changes, a new request is made', () => {
    const tableRequest = jest.spyOn(aboutTheDataHelper, 'fetchAgency').mockClear().mockReturnValue(mockResponse);
    render(<AgencyDetailsContainer {...defaultProps} />);

    fireEvent.click(screen.getByTitle('Sort table by ascending Reporting Period'));

    return waitFor(() => {
        expect(tableRequest).toHaveBeenCalledTimes(3);
    });
});

test('Indicates a default sort of descending Reporting Period', () => {
    render(<AgencyDetailsContainer {...defaultProps} />);
    expect(screen.getByTitle('Sort table by descending Reporting Period')).toHaveClass('table-header__icon_active');
});
