/**
 * @jest-environment jsdom
 */
import React from 'react';
import { expect } from '@jest/globals';
import { render, screen, fireEvent } from '@test-utils';
import Analytics from 'helpers/analytics/Analytics';

import SidebarContentFilterAccordion from 'components/search/collapsibleSidebar/SidebarContentFilterAccordion';

jest.mock('helpers/analytics/Analytics', () => ({
    event: jest.fn()
}));

const title = 'Location';
const filterText = 'Filter Content';

const toggle = (open) => {
    const details = screen.getByTestId('accordion');
    details.open = open;
    fireEvent(details, new Event('toggle'));
};

describe('SidebarContentFilterAccordion', () => {
    beforeEach(() => {
        Analytics.event.mockClear();
    });

    it('does not mount the filter component until the accordion is first opened.', () => {
        render(<SidebarContentFilterAccordion title={title} component={<p>{filterText}</p>} />);

        expect(screen.queryByText(filterText)).toBeNull();

        toggle(true);
        expect(screen.queryByText(filterText)).toBeTruthy();

        toggle(false);
        expect(screen.queryByText(filterText)).toBeTruthy();
    });

    it('mounts the filter component immediately when defaultOpen is set.', () => {
        render(<SidebarContentFilterAccordion title={title} component={<p>{filterText}</p>} defaultOpen />);

        expect(screen.queryByText(filterText)).toBeTruthy();
    });

    it('logs open and close analytics events.', () => {
        render(<SidebarContentFilterAccordion title={title} component={<p>{filterText}</p>} />);

        toggle(true);
        expect(Analytics.event).toHaveBeenLastCalledWith(expect.objectContaining({
            action: 'Filter Open',
            label: 'Location open'
        }));

        toggle(false);
        expect(Analytics.event).toHaveBeenLastCalledWith(expect.objectContaining({
            action: 'Filter Close',
            label: 'Location close'
        }));

        expect(Analytics.event).toHaveBeenCalledTimes(2);
    });

    it('does not log an analytics event for a toggle that does not change the open state.', () => {
        render(<SidebarContentFilterAccordion title={title} component={<p>{filterText}</p>} defaultOpen />);

        toggle(true);
        expect(Analytics.event).not.toHaveBeenCalled();
    });
});
