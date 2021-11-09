/**
 * IntroSection-test.jsx
 * Created by Brian Petway 11/08/21
 */

import React from 'react';
import { render, screen } from 'test-utils';
import IntroSection
    from "../../../../src/js/components/agencyV2/statusOfFunds/IntroSection";

describe('Agency V2 Status of Funds IntroSection', () => {
    const fy = '2021';
    const mockStore = {
        agencyV2: {
            overview: {
                name: 'Test Agency'
            },
            budgetaryResources: {
                2021: {
                    agencyBudget: '1 Million Dollars'
                }
            }
        }
    };

    const introSentence = `How were funds distributed in FY ${fy} for the ${mockStore.agencyV2.overview.name}?`;
    const copy = `In FY ${fy}, the ${mockStore.agencyV2.overview.name} had ${mockStore.agencyV2.budgetaryResources["2021"].agencyBudget} in available budgetary resources  distributed among its 12 agency sub-components. Agencies spend available budgetary resources by making financial promises called obligations . In this section, we show the total budgetary resources broken out by agency sub-component and how much of that funding has been obligated.`;
    const directions = 'Select a segment in the chart below to dive deeper into' +
        ' the data.';

    it('displays the fy and agency name in the intro sentence', () => {
        render(
            <IntroSection fy="2021" />,
            { initialState: mockStore }
        );
        expect(screen.getByText(introSentence)).toBeTruthy();
    });
    it('displays the fy, agency name, and amount in the copy', () => {
        render(
            <IntroSection fy="2021" />,
            { initialState: mockStore }
        );
        const copyElement = screen.getByTestId('introCopy');
        expect(copyElement.textContent).toBe(copy);
    });
    it('contains glossary links for "budgetary resources" and "obligation"', () => {
        render(
            <IntroSection fy="2021" />,
            { initialState: mockStore }
        );
        const links = screen.getAllByRole('link', { className: 'status-of-funds__glossary-term' });
        expect(links.length).toBe(2);
    });
    it('contains a sentence with directions about the chart below', () => {
        render(
            <IntroSection fy="2021" />,
            { initialState: mockStore }
        );
        expect(screen.getByText(directions)).toBeTruthy();
    });
});
