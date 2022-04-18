import React from 'react';
import { render, screen } from '@test-utils';

import AnimatedHeading from 'components/homepageUpdate/hero/AnimatedHeading';


describe('AnimatedHeading', () => {
    it('animated text is showing', () => {
        render(<AnimatedHeading />);
        expect(screen.queryByText('government spending')).toBeTruthy();
        const landingHeading = document.querySelector(".phrase");
        const style = window.getComputedStyle(landingHeading);
        expect(style.display).toBe('block');
    });

    it('landing phrase is showing, animated text is hidden', () => {
        render(<AnimatedHeading />);
        const landingHeading = document.querySelector(".phrase");
        const style = window.getComputedStyle(landingHeading);
        expect(style.display).toBe('block');
        setTimeout(() => {
            expect(style.display).toBe('none');
        }, 12000);
    });
});
