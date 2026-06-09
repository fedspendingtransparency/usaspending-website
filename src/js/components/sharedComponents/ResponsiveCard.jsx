// src/js/components/sharedComponents/ResponsiveCard.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { IsMobileContext } from 'context/IsMobileContext';

/**
 * ResponsiveCard Component
 * 
 * A flexible card component that adapts its layout based on screen size.
 * On mobile, displays content in a vertical stack with optional action stacking.
 * 
 * @component
 * @example
 * // Basic usage
 * <ResponsiveCard title="Card Title">
 *   <p>Card content</p>
 * </ResponsiveCard>
 * 
 * @example
 * // With actions that stack on mobile
 * <ResponsiveCard
 *   title="Award Details"
 *   actions={<button>View Details</button>}
 *   mobileStackActions
 * >
 *   <p>Award information...</p>
 * </ResponsiveCard>
 */
const ResponsiveCard = ({
    title,
    subtitle,
    children,
    actions,
    mobileStackActions,
    className,
    variant,
    elevated,
    collapsible,
    defaultExpanded,
    onExpand,
    ariaLabel,
    testId
}) => {
    const { isMobile } = useContext(IsMobileContext);
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    /**
     * Handle collapse/expand toggle
     */
    const handleToggle = () => {
        const newExpandedState = !isExpanded;
        setIsExpanded(newExpandedState);
        if (onExpand) {
            onExpand(newExpandedState);
        }
    };

    /**
     * Build CSS class names based on props
     */
    const cardClasses = [
        'responsive-card',
        variant && `responsive-card--${variant}`,
        elevated && 'responsive-card--elevated',
        collapsible && 'responsive-card--collapsible',
        collapsible && !isExpanded && 'responsive-card--collapsed',
        className
    ].filter(Boolean).join(' ');

    /**
     * Render header with optional collapse control
     */
    const renderActions = () => {
        if (!actions) return null;

        // If mobileStackActions is true and we're on mobile, render actions below header
        if (mobileStackActions && isMobile) {
            return (
                <div className="responsive-card__mobile-actions">
                    {actions}
                </div>
            );
        }

        // Otherwise render in header
        return (
            <div className="responsive-card__actions">
                {actions}
            </div>
        );
    };

    return (
        <div
            className={cardClasses}
            aria-label={ariaLabel || title}
            data-testid={testId}
        >
            <div className="responsive-card__header">
                <div className="responsive-card__title-section">
                    {title && (
                        <h3 className="responsive-card__title">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="responsive-card__subtitle">
                            {subtitle}
                        </p>
                    )}
                </div>
                
                {/* Collapsible toggle button */}
                {collapsible && (
                    <button
                        type="button"
                        className="responsive-card__toggle"
                        onClick={handleToggle}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
                    >
                        <span className={`responsive-card__toggle-icon ${isExpanded ? 'expanded' : ''}`}>
                            ▼
                        </span>
                    </button>
                )}
                
                {/* Actions in header (desktop or non-stacking mobile) */}
                {actions && !mobileStackActions && !collapsible && (
                    <div className="responsive-card__actions">
                        {actions}
                    </div>
                )}
            </div>

            {/* Mobile stacked actions */}
            {actions && mobileStackActions && isMobile && (
                <div className="responsive-card__mobile-actions">
                    {actions}
                </div>
            )}

            {/* Card body - hide if collapsed */}
            {(!collapsible || isExpanded) && (
                <div className="responsive-card__body">
                    {children}
                </div>
            )}
        </div>
    );
};

ResponsiveCard.propTypes = {
    /**
     * Card title (rendered as h3)
     */
    title: PropTypes.string,

    /**
     * Optional subtitle below title
     */
    subtitle: PropTypes.string,

    /**
     * Main content of the card
     */
    children: PropTypes.node.isRequired,

    /**
     * Action buttons or links
     */
    actions: PropTypes.node,

    /**
     * Stack actions below header on mobile (otherwise inline)
     */
    mobileStackActions: PropTypes.bool,

    /**
     * Additional CSS class names
     */
    className: PropTypes.string,

    /**
     * Visual variant of the card
     * @type {'default'|'bordered'|'highlighted'|'warning'|'success'|'error'}
     */
    variant: PropTypes.oneOf([
        'default',
        'bordered',
        'highlighted',
        'warning',
        'success',
        'error'
    ]),

    /**
     * Apply elevated shadow effect
     */
    elevated: PropTypes.bool,

    /**
     * Enable collapse/expand functionality
     */
    collapsible: PropTypes.bool,

    /**
     * Initial expanded state (only applies if collapsible=true)
     */
    defaultExpanded: PropTypes.bool,

    /**
     * Callback when card is expanded/collapsed
     * @param {boolean} isExpanded - New expanded state
     */
    onExpand: PropTypes.func,

    /**
     * Accessible label for screen readers
     */
    ariaLabel: PropTypes.string,

    /**
     * Test ID for testing library queries
     */
    testId: PropTypes.string
};

ResponsiveCard.defaultProps = {
    title: null,
    subtitle: null,
    actions: null,
    mobileStackActions: false,
    className: '',
    variant: 'default',
    elevated: false,
    collapsible: false,
    defaultExpanded: true,
    onExpand: null,
    ariaLabel: null,
    testId: 'responsive-card'
};

export default ResponsiveCard;
