/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@test-utils';
import IntroSection from 'components/interactiveDataSources/sections/IntroSection';

describe('IntroSection', () => {
    test('should display the intro section with text', () => {
        const { getByTestId } = render(<IntroSection />);
        const introMainText = getByTestId('introText');
        expect(introMainText.innerHTML.length).toBeGreaterThan(2);
    });

    test('should display the body section with text', () => {
        const { getByTestId } = render(<IntroSection />);
        const bodyText = getByTestId('paragraphText');
        expect(bodyText.innerHTML.length).toBeGreaterThan(2);
    });
});
