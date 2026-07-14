/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@test-utils';
import { fireEvent } from '@testing-library/react';
import AboutSection from 'components/interactiveDataSources/sections/AboutSection';

describe('AboutSection', () => {
    test('should display the card in the about section with text', () => {
        const { getByTestId } = render(<AboutSection />);
        const cardText = getByTestId('cardText');
        expect(cardText.innerHTML.length).toBeGreaterThan(2);
    });

    test('should click accordion and see expanded text', () => {
        const { getAllByTestId } = render(<AboutSection />);
        const firstAccordion = getAllByTestId('accordion')[0];
        fireEvent.click(firstAccordion);
        expect(firstAccordion.innerHTML).toBeTruthy();
    });
});
