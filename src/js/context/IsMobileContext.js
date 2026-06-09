// src/js/context/IsMobileContext.js
import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useIsMobile from 'hooks/useIsMobile';

export const IsMobileContext = createContext({
    isMobile: false,
    isTablet: false,
    isMedium: false,
    isDesktopSm: false,
    isDesktopLg: false
});

export const IsMobileProvider = ({ children }) => {
    const breakpoints = useIsMobile();

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

export const useIsMobileContext = () => {
    const context = React.useContext(IsMobileContext);
    if (context === undefined) {
        throw new Error('useIsMobileContext must be used within IsMobileProvider');
    }
    return context;
};

export default IsMobileContext;
