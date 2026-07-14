/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@test-utils';
import Frequency from 'components/interactiveDataSources/scrollerSections/Frequency';

describe('Frequency', () => {
    beforeEach(() => {
        const mockIntersectionObserver = jest.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null
        });
        window.IntersectionObserver = mockIntersectionObserver;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });


    it('Check if content wrapper is on the page', () => {
        const { container } = render(<Frequency />);
        const content = container.getElementsByClassName('scroller-overlay-card__content-wrapper');
        expect(content.length).toBeGreaterThan(2);
    });

    it('Check if text is in content wrapper', () => {
        const { container } = render(<Frequency />);
        const content = container.getElementsByClassName('scroller-overlay-card__content-wrapper')[0];
        const contentParagraph = content.getElementsByTagName('p')[0].innerHTML;
        expect(contentParagraph.length).toBeGreaterThan(2);
    });


    it('Check  backdrops and content overlays', () => {
        const { container } = render(<Frequency />);
        const backdrop = container.querySelector('div[name="animation"]');
        const overlay = container.querySelector('div[data-react-scrollama-id="react-scrollama-1"]');

        expect(backdrop).toBeTruthy();
        expect(overlay).toBeTruthy();
    });
});
