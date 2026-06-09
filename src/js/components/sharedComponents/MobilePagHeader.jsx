import React from 'react';
import PropTypes from 'prop-types';
import { useIsMobileContext } from 'context/IsMobileContext';

/**
 * Mobile-optimized page header with optional back button and actions
 */
const MobilePageHeader = ({
    title,
    subtitle = null,
    onBack = null,
    actions = null,
    sticky = true,
    className = ''
}) => {
    const { isMobile } = useIsMobileContext();

    const headerClasses = [
        'mobile-page-header',
        sticky && 'mobile-page-header--sticky',
        isMobile && 'mobile-page-header--mobile',
        className
    ].filter(Boolean).join(' ');

    return (
        <header className={headerClasses}>
            <div className="mobile-page-header__inner">
                {onBack && (
                    <button
                        className="mobile-page-header__back"
                        onClick={onBack}
                        aria-label="Go back"
                    >
                        <span className="mobile-page-header__back-icon">←</span>
                    </button>
                )}
                
                <div className="mobile-page-header__content">
                    <h1 className="mobile-page-header__title">{title}</h1>
                    {subtitle && (
                        <p className="mobile-page-header__subtitle">{subtitle}</p>
                    )}
                </div>

                {actions && (
                    <div className="mobile-page-header__actions">
                        {actions}
                    </div>
                )}
            </div>
        </header>
    );
};

MobilePageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    onBack: PropTypes.func,
    actions: PropTypes.node,
    sticky: PropTypes.bool,
    className: PropTypes.string
};

export default MobilePageHeader;
