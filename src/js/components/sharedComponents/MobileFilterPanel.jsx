import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIsMobileContext } from 'context/IsMobileContext';

/**
 * Sliding filter panel for mobile
 */
const MobileFilterPanel = ({
    isOpen,
    onClose,
    title = 'Filters',
    children,
    onApply = null,
    onClear = null,
    resultCount = null
}) => {
    const { isMobile } = useIsMobileContext();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isMobile || !isVisible) return null;

    return (
        <>
            <div 
                className={`mobile-filter-panel__overlay ${isOpen ? 'mobile-filter-panel__overlay--open' : ''}`}
                onClick={onClose}
            />
            <div className={`mobile-filter-panel ${isOpen ? 'mobile-filter-panel--open' : ''}`}>
                <div className="mobile-filter-panel__header">
                    <h2 className="mobile-filter-panel__title">{title}</h2>
                    <button 
                        className="mobile-filter-panel__close"
                        onClick={onClose}
                        aria-label="Close filters"
                    >
                        ✕
                    </button>
                </div>

                <div className="mobile-filter-panel__content">
                    {children}
                </div>

                <div className="mobile-filter-panel__footer">
                    {onClear && (
                        <button 
                            className="mobile-filter-panel__button mobile-filter-panel__button--secondary"
                            onClick={onClear}
                        >
                            Clear All
                        </button>
                    )}
                    <button 
                        className="mobile-filter-panel__button mobile-filter-panel__button--primary"
                        onClick={() => {
                            onApply?.();
                            onClose();
                        }}
                    >
                        {resultCount !== null ? `View ${resultCount} Results` : 'Apply Filters'}
                    </button>
                </div>
            </div>
        </>
    );
};

MobileFilterPanel.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    onApply: PropTypes.func,
    onClear: PropTypes.func,
    resultCount: PropTypes.number
};

export default MobileFilterPanel;
