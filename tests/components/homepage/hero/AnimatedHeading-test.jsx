import React from 'react';
import { render, screen } from '@test-utils';

import AnimatedHeading from 'components/homepageUpdate/hero/AnimatedHeading';


describe('AnimatedHeading', () => {
    it('animated text is showing', (done) => {
        const element = render(<AnimatedHeading />);

        expect(screen.queryByText('government spending')).toBeTruthy();
        const landingHeading = document.getElementsbyClassName()
        const style = window.getComputedStyle(element);
        expect(style)
        expect(screen.queryByText('The official source of government spending data')).toBeFalsy();
        setTimeout(() => {
            expect(screen.queryByText('The official source of government spending data')).toBeTruthy();
        }, 12000); // 1 second

    });
});