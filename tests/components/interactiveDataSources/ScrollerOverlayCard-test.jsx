/**
 * @jest-environment jsdom
 */
import React from 'react';
import { log } from "console";
import { render, screen } from 'test-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollerOverlayCard from "components/interactiveDataSources/scroller/scrollerOverlay/ScrollerOverlayCard";

describe('Scroller Overlay Card', () => {
    test('should display an icon, heading, content, and link', () => {
        render(<ScrollerOverlayCard
            icon={<span>font-awesome-icon<FontAwesomeIcon size="2x" icon="chart-area" /></span>}
            overline={<p>testing</p>}
            heading={<p>hello</p>}
            content={<p>world</p>} />);
        expect(screen.queryByText('font-awesome-icon')).toBeTruthy();
        expect(screen.queryByText('testing')).toBeTruthy();
        expect(screen.queryByText('hello')).toBeTruthy();
        expect(screen.queryByText('world')).toBeTruthy();
    });
});
