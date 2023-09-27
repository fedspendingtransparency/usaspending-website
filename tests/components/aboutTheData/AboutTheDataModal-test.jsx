/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from 'test-utils';
import AboutTheDataModal from 'components/aboutTheData/AboutTheDataModal';
window.scroll = jest.fn();
const defaultProps = {
    mounted: true,
    closeModal: () => {},
    type: 'publicationDates',
    title: 'Publication Dates',
    className: 'hi',
    agencyData: {
        agencyName: 'Assaley & Hill School of Business',
        agencyCode: '020',
        fiscalYear: 2020,
        fiscalPeriod: 8
    }
};

describe('About The Data Modal', () => {
    it('should render agency name', () => {
        render(<AboutTheDataModal {...defaultProps} />);
        expect(screen.queryByText(defaultProps.agencyData.agencyName.toUpperCase())).toBeTruthy();
    });
    it('should render title', () => {
        render(<AboutTheDataModal {...defaultProps} />);
        expect(screen.getByTitle('Publication Dates')).toBeTruthy();
    });
    it('should render fiscal year quarter and period', () => {
        render(<AboutTheDataModal {...defaultProps} />);
        expect(screen.queryByText('FY 2020 P8')).toBeTruthy();
    });
});
