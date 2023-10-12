/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, waitFor, fireEvent, screen } from 'test-utils';
import { expect } from '@jest/globals';
import * as agencyReportingAPI from 'apis/agencyReporting';
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

test('makes one request for table data on mount', () => {
    const tableRequest = jest.spyOn(agencyReportingAPI, 'fetchAgency').mockReturnValue(mockResponse);

    render(<AgencyDetailsContainer {...defaultProps} />);

    return waitFor(() => {
        expect(tableRequest).toHaveBeenCalledTimes(1);
    });
});

test('when the sort field changes, only one request is made', () => {
    const tableRequest = jest.spyOn(agencyReportingAPI, 'fetchAgency').mockClear().mockReturnValue(mockResponse);
    render(<AgencyDetailsContainer {...defaultProps} />);

    fireEvent.click(screen.getByTitle('Sort table by descending Percent of Total Federal Budget'));
    return waitFor(() => {
        expect(tableRequest).toHaveBeenCalledTimes(2);
    });
});

test('when the sort order changes, only one request is made', () => {
    const tableRequest = jest.spyOn(agencyReportingAPI, 'fetchAgency').mockClear().mockReturnValue(mockResponse);
    render(<AgencyDetailsContainer {...defaultProps} />);

    fireEvent.click(screen.getByTitle('Sort table by ascending Reporting Period'));

    return waitFor(() => {
        expect(tableRequest).toHaveBeenCalledTimes(2);
    });
});

test('Indicates a default sort of descending Reporting Period', () => {
    render(<AgencyDetailsContainer {...defaultProps} />);
    expect(screen.getByTitle('Sort table by descending Reporting Period')).toHaveClass('table-header__icon_active');
});
