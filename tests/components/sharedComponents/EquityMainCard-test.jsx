/**
 * @jest-environment jsdom
 * 
 * MainCard-test.jsx
 * Created by Nick Torres 06/27/22
 */

import React from 'react';
import MainCard from 'components/dataDives/shared/MainCard';
import { render, screen } from '../../testResources/test-utils';

const testHdg = "This is a test heading";
const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis nunc eget lorem dolor sed. Sed risus ultricies tristique nulla aliquet enim. Lectus nulla at volutpat diam ut venenatis tellus. Placerat in egestas erat imperdiet sed.";

describe('EquityMainCard', () => {
    it('should render the card with test heading and text', () => {
        render(<MainCard heading={testHdg} text={testText} />);
        expect(screen.queryByText('text not on the card')).toBeFalsy();
        expect(screen.queryByText(testHdg)).toBeTruthy();
        expect(screen.queryByText(testText)).toBeTruthy();
    });
});
