/**
 * IntroSection-test.jsx
 * Created by Brian Petway 11/08/21
 */

import React from 'react';
import IntroSection
    from "components/agency/statusOfFunds/IntroSection";
import { render, screen } from '../../../testResources/test-utils';

describe('Agency V2 Status of Funds IntroSection', () => {
    const mockProps = {
        fy: '2021',
        name: 'Test Agency',
        totalItems: 15
    };
    const mockStore = {
        agency: {
            budgetaryResources: {
                2021: {
                    agencyBudget: '1 Million Dollars'
                }
            }
        }
    };

    const introSentence = `How were funds distributed in FY ${mockProps.fy} for the ${mockProps.name}?`;
    const copy = `In FY ${mockProps.fy}, the ${mockProps.name} had ${mockStore.agency.budgetaryResources["2021"].agencyBudget} in available budgetary resources  distributed among its ${mockProps.totalItems} agency sub-components. Agencies spend available budgetary resources by making financial promises called obligations . In this section, we show the total budgetary resources broken out by agency sub-component and how much of that funding has been obligated.`;
    const directions = 'Select a segment in the chart below to dive deeper into' +
        ' the data.';

    it('displays the fy and agency name in the intro sentence', () => {
        render(
            <IntroSection {...mockProps} />,
            { initialState: mockStore }
        );
        expect(screen.getByText(introSentence)).toBeTruthy();
    });
    it('displays the fy, agency name, and amount in the copy', () => {
        render(
            <IntroSection {...mockProps} />,
            { initialState: mockStore }
        );
        const copyElement = screen.getByTestId('introCopy');
        expect(copyElement.textContent).toBe(copy);
    });
    it('contains glossary links for "budgetary resources" and "obligation"', () => {
        render(
            <IntroSection {...mockProps} />,
            { initialState: mockStore }
        );
        const links = screen.getAllByRole('link', { className: 'status-of-funds__glossary-term' });
        expect(links.length).toBe(2);
    });
    it('contains a sentence with directions about the chart below', () => {
        render(
            <IntroSection {...mockProps} />,
            { initialState: mockStore }
        );
        expect(screen.getByText(directions)).toBeTruthy();
    });
});
