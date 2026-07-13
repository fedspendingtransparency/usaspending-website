/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@test-utils';
import IntroSection from '-components/interactiveDataSources/sections/IntroSection';

describe('IntroSection', () => {
    test('should display the intro section with text', () => {
        const { getByTestId } = render(<IntroSection />);
        const introMainText = getByTestId('interactive-data-sources__bodyText');
        expect(introMainText.innerHTML.length).toBeGreaterThan(2);
    });

    test('should display the download share button group with text', () => {
        const { getByTestId } = render(<IntroSection />);
        const bodyText = getByTestId('share-dl-group');
        expect(bodyText.innerHTML.length).toBeGreaterThan(2);
    });
});
