import React from 'react';
import { render, screen } from 'test-utils';
import IntroSection
    from "../../../../src/js/components/agencyV2/statusOfFunds/IntroSection";

describe('Agency V2 Status of Funds IntroSection', () => {
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
    it('displays the fy and agency name in the intro sentence', () => {
        render(
            <IntroSection fy="2021" />,
            { initialState: mockStore }
        );
        // const introSentenceContainer = screen.getByTestId('introSentence');
        // expect(introSentenceContainer).toBe('FY 2021');
        // expect(introSentenceContainer).toContain('Test Agency');
        // expect(screen.getByTestId('introSentence').props.children.join()).toBe('rong');
    });
    it('displays the fy, agency name, and amount in the copy', () => {

    });
    it('contains glossary links for "budgetary resources" and "obligation"', () => {

    });
    it('contains a sentence with directions about the chart below', () => {

    });
});
