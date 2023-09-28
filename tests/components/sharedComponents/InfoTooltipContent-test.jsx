/**
 * @jest-environment jsdom
 * 
 * InfoTooltipContent-test.jsx
 * Created by Nick Torres 7/12/22
 */

import React from 'react';
import { UnlinkedTooltip } from 'components/award/shared/InfoTooltipContent';
import { render, screen } from '@test-utils';

const mockText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

describe('Tooltip tests', () => {
    it('text for Unlinked tooltip should be rendered', () => {
        render(<UnlinkedTooltip />);
        expect(screen.queryByText('This award has not been linked to any federal account')).toBeTruthy();
        expect(screen.queryByText(mockText)).toBeFalsy();
    });
});
