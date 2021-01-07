/**
 * InfoBanner-test.jsx
 * Created by Lizzie Salita 12/31/20
 */

import React from 'react';
import InfoBanner from 'components/sharedComponents/header/InfoBanner';
import { render, screen, fireEvent } from '@test-utils';

const nativeDate = Date.now;

const closeBanner = jest.fn();
const triggerModal = jest.fn();
const mockProps = {
    closeBanner,
    triggerModal
};

afterAll(() => {
    // restore the native date function
    Date.now = nativeDate;
});

describe('InfoBanner', () => {
    it('should render the dismiss button', () => {
        render(<InfoBanner {...mockProps} />);
        expect(screen.queryByTitle('Dismiss message')).toBeTruthy();
    });
    it('should close the banner on click', () => {
        render(<InfoBanner {...mockProps} />);
        fireEvent.click(screen.getByTitle('Dismiss message'));
        expect(closeBanner).toHaveBeenCalled();
    });
    describe('COVID-19 banner', () => {
        it('should display before 1/4/21', () => {
            // mock date 12/31/20
            Date.now = () => new Date(2020, 11, 31);
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByText('New to USAspending: COVID-19 Spending Data')).toBeTruthy();
        });
        it('should display again on 1/14/21', () => {
            // mock date 1/14/21
            Date.now = () => new Date(2021, 0, 14);
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByText('New to USAspending: COVID-19 Spending Data')).toBeTruthy();
        });
        it('should not display between 1/4/21 and 1/14/21', () => {
            // mock date 1/4/21
            Date.now = () => new Date(2021, 0, 4);
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByText('New to USAspending: COVID-19 Spending Data')).toBeFalsy();
        });
    });
    describe('Pre-migration banner', () => {
        it('should not display before 1/4/21', () => {
            // mock date 1/3/21
            Date.now = () => new Date(2021, 0, 3);
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByTestId('pre-migration-message')).toBeFalsy();
        });
        it('should not display after 1/8/21', () => {
            Date.now = () => new Date(2021, 0, 8);
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByTestId('pre-migration-message')).toBeFalsy();
        });
        it('should display between 1/4/21 and 1/8/21', () => {
            Date.now = () => new Date(2021, 0, 4);
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByTestId('pre-migration-message')).toBeTruthy();
        });
    });
    describe('Migration banner', () => {
        it('should not display before 1/8/21', () => {
            // mock date 1/7/21
            Date.now = () => new Date(2021, 0, 7);
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByTestId('migration-message')).toBeFalsy();
        });
        it('should display on 1/8/21', () => {
            Date.now = () => new Date(2021, 0, 8);
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByTestId('migration-message')).toBeTruthy();
        });
        it('should not display on 1/14/21', () => {
            Date.now = () => new Date(2021, 0, 14);
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByTestId('migration-message')).toBeFalsy();
        });
    });
});
