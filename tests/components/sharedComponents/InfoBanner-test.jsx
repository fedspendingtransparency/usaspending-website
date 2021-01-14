/**
 * InfoBanner-test.jsx
 * Created by Lizzie Salita 12/31/20
 */

import React from 'react';
import InfoBanner from 'components/sharedComponents/header/InfoBanner';
import { render, screen, fireEvent } from '@test-utils';

const closeBanner = jest.fn();
const triggerModal = jest.fn();
const mockProps = {
    closeBanner,
    triggerModal
};

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
        it('should display again on 1/14/21', () => {
            render(<InfoBanner {...mockProps} />);
            expect(screen.queryByText('New to USAspending: COVID-19 Spending Data')).toBeTruthy();
        });
    });
});
