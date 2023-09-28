/**
 * @jest-environment jsdom
 * 
 * AnalystGuide-test.jsx
 * Created by Andrea Blackwell 03/30/22
 */

import React from 'react';
import { render, screen } from 'test-utils';
import AnalystGuideHeader from "components/analystGuide/AnalystGuideHeader";


describe('Analyst Guide', () => {
    test('should display a heading with a title and subtitle', () => {
        render(<AnalystGuideHeader title="hello" subtitle="world" />);
        expect(screen.queryByText('hello')).toBeTruthy();
        expect(screen.queryByText('world')).toBeTruthy();
    });
});
