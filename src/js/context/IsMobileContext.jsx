// src/js/context/IsMobileContext.jsx
import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useIsMobile from 'hooks/useIsMobile';

/**
 * Context providing mobile breakpoint information throughout the app
 * Wraps the useIsMobile hook to avoid prop drilling
 */
export const IsMobileContext = createContext({
    isMobile: false,
    isTablet: false,
    isMedium: false,
    isDesktopSm: false,
    isDesktopLg: false
});

/**
 * Provider component for mobile breakpoint context
 * Should wrap the app at the root level (in AppContainer)
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export const IsMobileProvider = ({ children }) => {
    const breakpoints = useIsMobile();

    // Memoize to prevent unnecessary re-renders
    // Only update when breakpoint values actually change
    const value = useMemo(() => breakpoints, [
        breakpoints.isMobile,
        breakpoints.isTablet,
        breakpoints.isMedium,
        breakpoints.isDesktopSm,
        breakpoints.isDesktopLg
    ]);

    return (
        <IsMobileContext.Provider value={value}>
            {children}
        </IsMobileContext.Provider>
    );
};

IsMobileProvider.propTypes = {
    children: PropTypes.node.isRequired
};

/**
 * Custom hook to consume the mobile context
 * Use this instead of useContext(IsMobileContext) directly
 * 
 * @returns {Object} Breakpoint object with boolean flags
 * @example
 * const { isMobile, isTablet } = useIsMobileContext();
 * if (isMobile) { // render mobile view }
 */
export const useIsMobileContext = () => {
    const context = React.useContext(IsMobileContext);
    
    if (context === undefined) {
        throw new Error('useIsMobileContext must be used within IsMobileProvider');
    }
    
    return context;
};
