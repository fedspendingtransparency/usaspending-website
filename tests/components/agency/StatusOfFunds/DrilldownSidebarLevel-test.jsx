/**
 * @jest-environment jsdom
 * 
 * DrilldownSidebarLevel-test.jsx
 * Created by Lizzie Salita 11/23/21
 */

import React from 'react';
import DrilldownSidebarLevel
    from "components/agency/statusOfFunds/DrilldownSidebarLevel";
import { render, screen } from '../../../testResources/test-utils';

describe('Agency V2 Status of Funds DrilldownSidebarLevel', () => {
    const mockProps = {
        label: 'Find me',
        name: 'Ministry of Magic',
        obligated: '$1.56 M',
        budgetaryResources: '$2.23 M',
        active: true
    };

    it('does not render the back button if the goBack function is undefined', () => {
        render(<DrilldownSidebarLevel {...mockProps} />);
        expect(screen.queryByTitle('Go up a level')).toBeFalsy();
    });

    it('renders the back button if the goBack function is defined', () => {
        const newProps = {
            ...mockProps,
            goBack: () => {}
        };
        render(<DrilldownSidebarLevel {...newProps} />);
        expect(screen.queryByTitle('Go up a level')).toBeTruthy();
    });

    it('does not render the trail line for the active / last level', () => {
        render(<DrilldownSidebarLevel {...mockProps} />);
        expect(screen.queryByTestId('trailLine')).toBeFalsy();
    });

    it('does render the trail line for higher levels than the active level', () => {
        const newProps = {
            ...mockProps,
            active: false
        };
        render(<DrilldownSidebarLevel {...newProps} />);
        expect(screen.queryByTestId('trailLine')).toBeTruthy();
    });
});
