/**
 * @jest-environment jsdom
 */
import React from 'react';
import { expect } from '@jest/globals';
import { render, screen, fireEvent } from '@test-utils';

import Accordion from '../../../src/js/components/sharedComponents/accordion/Accordion';

describe('Accordion', () => {
    const titleText = 'Placeholder Title';
    const bodyText = 'Placeholder Body';

    it('expects the accordion to be rendered and closed.', () => {
        const renderComponent = () =>
            render(<Accordion
                title={titleText}>
                <div>
                    <p>{bodyText}</p>
                </div>
            </Accordion>);

        const { getByTestId } = renderComponent();
        expect(getByTestId('accordion')).not.toHaveClass('open');
    });

    it('expects the title to be rendered.', () => {
        render(<Accordion
            title={titleText}>
            <div>
                <p>{bodyText}</p>
            </div>
        </Accordion>);

        expect(screen.queryByText(titleText)).toBeTruthy();
    });

    it('expects the body copy to be rendered.', () => {
        render(<Accordion
            title={titleText}>
            <div>
                <p>{bodyText}</p>
            </div>
        </Accordion>);

        expect(screen.queryByText(bodyText)).toBeTruthy();
    });

    it(
        'does apply "open" to section element classnames if accordion is opened.',
        () => {
            const renderComponent = () =>
                render(<Accordion
                    title={titleText}>
                    <div>
                        <p>{bodyText}</p>
                    </div>
                </Accordion>);

            const { getByTestId } = renderComponent();
            const element = getByTestId('accordion');
            expect(element).not.toHaveClass('open');
            fireEvent.click(element);
            setTimeout(() => {
                expect(element).toHaveClass('open');
            }, 200);
        }
    );
});
