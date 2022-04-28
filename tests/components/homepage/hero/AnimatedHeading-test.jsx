import React from 'react';
import { render, screen } from '@test-utils';

import AnimatedHeading from 'components/homepageUpdate/hero/AnimatedHeading';

describe('AnimatedHeading', () => {
    it('animated text is initially hidden', () => {
        render(<AnimatedHeading />);
        expect(screen.queryByText('government spending')).toBeTruthy();
        const phrase = document.querySelector(".phrase");
        const style = window.getComputedStyle(phrase);
        expect(style.visibility).toBe('hidden');
    });

    it('landing phrase is initially showing and then hidden after 3 seconds', () => {
        render(<AnimatedHeading />);
        const landingHeading = document.querySelector(".landing-phrase");
        const style = window.getComputedStyle(landingHeading);
        expect(style.visibility).toBe('visible');
        setTimeout(() => {
            expect(style.visibility).toBe('hidden');
        }, 4000);
    });
});
