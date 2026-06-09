/**
 * ResponsiveCard Component Tests
 */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ResponsiveCard from '../../../src/js/components/sharedComponents/ResponsiveCard';
import {
    renderWithMobileWithoutRouter,
    mobileViewport,
    desktopViewport
} from '../../testResources/mobileTestUtils';

describe('ResponsiveCard', () => {
    describe('Basic Rendering', () => {
        it('renders children content', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard>
                    <p>Test Content</p>
                </ResponsiveCard>
            );

            expect(screen.getByText('Test Content')).toBeInTheDocument();
        });

        it('renders title when provided', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard title="Test Title">
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(screen.getByText('Test Title')).toBeInTheDocument();
        });

        it('renders subtitle when provided', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard 
                    title="Test Title" 
                    subtitle="Test Subtitle"
                >
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
        });

        it('applies custom className', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard className="custom-class">
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card');
            expect(container.firstChild).toHaveClass('custom-class');
        });

        it('uses testId when provided', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard testId="custom-card">
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(screen.getByTestId('custom-card')).toBeInTheDocument();
        });
    });

    describe('Variants', () => {
        it('applies warning variant class', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard variant="warning">
                    <p>Warning content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card--warning');
        });

        it('applies success variant class', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard variant="success">
                    <p>Success content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card--success');
        });

        it('applies error variant class', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard variant="error">
                    <p>Error content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card--error');
        });

        it('applies highlighted variant class', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard variant="highlighted">
                    <p>Highlighted content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card--highlighted');
        });

        it('applies bordered variant class', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard variant="bordered">
                    <p>Bordered content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card--bordered');
        });

        it('applies elevated class when elevated prop is true', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard elevated>
                    <p>Elevated card</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card--elevated');
        });
    });

    describe('Actions - Responsive Behavior', () => {
        const actionButtons = (
            <>
                <button type="button">View Details</button>
                <button type="button">Download</button>
            </>
        );

        it('renders actions in header on desktop by default', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard
                    title="Card Title"
                    actions={actionButtons}
                />,
                { mobileContext: desktopViewport }
            );

            const viewButton = screen.getByRole('button', { name: 'View Details' });
            const actionsContainer = viewButton.closest('.responsive-card__actions');
            
            expect(actionsContainer).toBeInTheDocument();
            expect(actionsContainer.closest('.responsive-card__header')).toBeInTheDocument();
        });

        it('keeps actions in header on mobile when mobileStackActions is false', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard
                    title="Card Title"
                    actions={actionButtons}
                    mobileStackActions={false}
                >
                    <p>Content</p>
                </ResponsiveCard>,
                { mobileContext: mobileViewport }
            );

            const viewButton = screen.getByRole('button', { name: 'View Details' });
            const actionsContainer = viewButton.closest('.responsive-card__actions');
            
            expect(actionsContainer).toBeInTheDocument();
        });

        it('stacks actions below header on mobile when mobileStackActions is true', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard
                    title="Card Title"
                    actions={actionButtons}
                    mobileStackActions
                >
                    <p>Content</p>
                </ResponsiveCard>,
                { mobileContext: mobileViewport }
            );

            const viewButton = screen.getByRole('button', { name: 'View Details' });
            const mobileActionsContainer = viewButton.closest('.responsive-card__mobile-actions');
            
            expect(mobileActionsContainer).toBeInTheDocument();
        });

        it('does not render mobile actions on desktop even with mobileStackActions', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard
                    title="Card Title"
                    actions={actionButtons}
                    mobileStackActions
                >
                    <p>Content</p>
                </ResponsiveCard>,
                { mobileContext: desktopViewport }
            );

            const viewButton = screen.getByRole('button', { name: 'View Details' });
            const actionsContainer = viewButton.closest('.responsive-card__actions');
            
            expect(actionsContainer).toBeInTheDocument();
            expect(screen.queryByText('View Details').closest('.responsive-card__mobile-actions')).not.toBeInTheDocument();
        });
    });

    describe('Collapsible Functionality', () => {
        it('renders toggle button when collapsible', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard title="Card Title" collapsible>
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(screen.getByRole('button', { name: /collapse/i })).toBeInTheDocument();
        });

        it('does not render toggle button when not collapsible', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard title="Card Title" collapsible={false}>
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(screen.queryByRole('button', { name: /collapse/i })).not.toBeInTheDocument();
        });

        it('shows content when expanded by default', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard title="Card Title" collapsible>
                    <p>Hidden Content</p>
                </ResponsiveCard>
            );

            expect(screen.getByText('Hidden Content')).toBeVisible();
        });

        it('hides content when defaultExpanded is false', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard 
                    title="Card Title" 
                    collapsible 
                    defaultExpanded={false}
                >
                    <p>Hidden Content</p>
                </ResponsiveCard>
            );

            expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
        });

        it('toggles content visibility on button click', async () => {
            const user = userEvent.setup();
            
            renderWithMobileWithoutRouter(
                <ResponsiveCard title="Card Title" collapsible>
                    <p>Toggle Content</p>
                </ResponsiveCard>
            );

            const toggleButton = screen.getByRole('button', { name: /collapse/i });
            
            // Initially expanded
            expect(screen.getByText('Toggle Content')).toBeVisible();
            expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

            // Click to collapse
            await user.click(toggleButton);
            expect(screen.queryByText('Toggle Content')).not.toBeInTheDocument();
            expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
            expect(screen.getByRole('button', { name: /expand/i })).toBeInTheDocument();

            // Click to expand again
            await user.click(toggleButton);
            expect(screen.getByText('Toggle Content')).toBeVisible();
            expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
        });

        it('calls onExpand callback when toggled', async () => {
            const user = userEvent.setup();
            const onExpand = jest.fn();

            renderWithMobileWithoutRouter(
                <ResponsiveCard 
                    title="Card Title" 
                    collapsible 
                    onExpand={onExpand}
                >
                    <p>Content</p>
                </ResponsiveCard>
            );

            const toggleButton = screen.getByRole('button', { name: /collapse/i });
            
            // Collapse
            await user.click(toggleButton);
            expect(onExpand).toHaveBeenCalledWith(false);
            expect(onExpand).toHaveBeenCalledTimes(1);

            // Expand
            await user.click(toggleButton);
            expect(onExpand).toHaveBeenCalledWith(true);
            expect(onExpand).toHaveBeenCalledTimes(2);
        });

        it('applies collapsible class modifier', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard title="Card Title" collapsible>
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card--collapsible');
        });

        it('applies collapsed class modifier when collapsed', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard 
                    title="Card Title" 
                    collapsible 
                    defaultExpanded={false}
                >
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card--collapsed');
        });

        it('hides mobile actions when collapsed', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard 
                    title="Card Title"
                    collapsible
                    defaultExpanded={false}
                    actions={<button type="button">Action</button>}
                    mobileStackActions
                >
                    <p>Content</p>
                </ResponsiveCard>,
                { mobileContext: mobileViewport }
            );

            expect(screen.queryByRole('button', { name: 'Action' })).not.toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('has accessible toggle button with aria-expanded', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard title="Card Title" collapsible>
                    <p>Content</p>
                </ResponsiveCard>
            );

            const button = screen.getByRole('button', { name: /collapse/i });
            expect(button).toHaveAttribute('aria-expanded');
            expect(button).toHaveAttribute('type', 'button');
        });

        it('uses custom ariaLabel when provided', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard ariaLabel="Custom Label">
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveAttribute('aria-label', 'Custom Label');
        });

        it('uses title as aria-label when no custom label provided', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard title="Card Title">
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveAttribute('aria-label', 'Card Title');
        });

        it('toggle button is keyboard accessible', async () => {
            const user = userEvent.setup();
            
            renderWithMobileWithoutRouter(
                <ResponsiveCard title="Card Title" collapsible>
                    <p>Content</p>
                </ResponsiveCard>
            );

            const toggleButton = screen.getByRole('button', { name: /collapse/i });
            
            // Focus the button
            toggleButton.focus();
            expect(toggleButton).toHaveFocus();

            // Press Enter
            await user.keyboard('{Enter}');
            expect(screen.queryByText('Content')).not.toBeInTheDocument();

            // Press Space to expand again
            await user.keyboard(' ');
            expect(screen.getByText('Content')).toBeVisible();
        });
    });

    describe('Edge Cases', () => {
        it('renders without title or subtitle', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard>
                    <p>Content only</p>
                </ResponsiveCard>
            );

            expect(screen.getByText('Content only')).toBeInTheDocument();
        });

        it('renders without actions', () => {
            renderWithMobileWithoutRouter(
                <ResponsiveCard title="No Actions">
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(screen.getByText('No Actions')).toBeInTheDocument();
            expect(screen.queryByRole('button')).not.toBeInTheDocument();
        });

        it('handles empty children gracefully', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard title="Empty">
                    {null}
                </ResponsiveCard>
            );

            expect(container.querySelector('.responsive-card__body')).toBeInTheDocument();
        });

        it('handles multiple variant props correctly', () => {
            const { container } = renderWithMobileWithoutRouter(
                <ResponsiveCard variant="warning" elevated>
                    <p>Content</p>
                </ResponsiveCard>
            );

            expect(container.firstChild).toHaveClass('responsive-card--warning');
            expect(container.firstChild).toHaveClass('responsive-card--elevated');
        });
    });
});
