import React from 'react';
import { render, screen } from '@test-utils';
import IntroSection from 'components/interactiveDataSources/sections/IntroSection';

describe('IntroSection', () => {
    test('should display the intro section with text', () => {
        render(<IntroSection />);
        expect(screen.queryByText('USAspending Data Sources')).toBeTruthy();
    });
});
