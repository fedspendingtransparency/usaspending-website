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
            render(
                <Accordion title={titleText}>
                    <div>
                        <p>{bodyText}</p>
                    </div>
                </Accordion>
            );

        const { getByTestId } = renderComponent();
        expect(getByTestId('accordion')).not.toHaveClass('open');
    });

    it('expects the title to be rendered.', () => {
        render(
            <Accordion title={titleText}>
                <div>
                    <p>{bodyText}</p>
                </div>
            </Accordion>
        );

        expect(screen.queryByText(titleText)).toBeTruthy();
    });

    it('expects the body copy to be rendered.', () => {
        render(
            <Accordion title={titleText}>
                <div>
                    <p>{bodyText}</p>
                </div>
            </Accordion>
        );

        expect(screen.queryByText(bodyText)).toBeTruthy();
    });

    it('opens the native details accordion when the summary is clicked.', () => {
        render(
            <Accordion title={titleText}>
                <div>
                    <p>{bodyText}</p>
                </div>
            </Accordion>
        );

        const element = screen.getByTestId('accordion');
        expect(element).not.toHaveAttribute('open');
        fireEvent.click(screen.getByText(titleText));
        expect(element).toHaveAttribute('open');
    });

    it('renders the details accordion open when defaultOpen is set.', () => {
        render(
            <Accordion title={titleText} defaultOpen>
                <p>{bodyText}</p>
            </Accordion>
        );

        expect(screen.getByTestId('accordion')).toHaveAttribute('open');
    });

    it('reflects the open prop and calls setOpen with an updater in the controlled variant.', () => {
        const setOpen = jest.fn();
        const { rerender } = render(
            <Accordion title={titleText} open={false} setOpen={setOpen}>
                <p>{bodyText}</p>
            </Accordion>
        );

        const button = screen.getByRole('button', { name: 'Open toggle' });
        expect(screen.getByTestId('accordion')).not.toHaveClass('open');
        expect(button).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(button);

        expect(setOpen).toHaveBeenCalledTimes(1);
        expect(setOpen.mock.calls[0][0](false)).toBe(true);

        rerender(
            <Accordion title={titleText} open setOpen={setOpen}>
                <p>{bodyText}</p>
            </Accordion>
        );

        expect(screen.getByTestId('accordion')).toHaveClass('open');
        expect(screen.getByRole('button', { name: 'Close toggle' })).toHaveAttribute('aria-expanded', 'true');
    });
});
