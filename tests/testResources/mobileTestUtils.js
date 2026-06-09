/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/**
 * Mobile Testing Utilities
 * Extends existing test-utils.js with mobile context support
 */
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import reducer from "../../src/js/redux/reducers/index";
import { IsMobileContext } from "../../src/js/context/IsMobileContext";

/**
 * Pre-configured viewport contexts for testing
 */
export const mobileViewport = {
    isMobile: true,
    isTablet: true,
    isMedium: true,
    isDesktopSm: true,
    isDesktopLg: false
};

export const tabletViewport = {
    isMobile: false,
    isTablet: true,
    isMedium: true,
    isDesktopSm: true,
    isDesktopLg: false
};

export const desktopViewport = {
    isMobile: false,
    isTablet: false,
    isMedium: false,
    isDesktopSm: true,
    isDesktopLg: false
};

export const largeDesktopViewport = {
    isMobile: false,
    isTablet: false,
    isMedium: false,
    isDesktopSm: false,
    isDesktopLg: true
};

/**
 * Render with mobile context, Redux store, Router, and React Query
 * Extends the existing render function with mobile context support
 * 
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @param {Object} options.initialState - Redux initial state
 * @param {Object} options.store - Redux store (optional)
 * @param {Object} options.mobileContext - Mobile breakpoint context (defaults to desktop)
 * @returns {Object} Render result from React Testing Library
 */
export function renderWithMobile(
    ui,
    {
        initialState,
        store = createStore(reducer, initialState),
        mobileContext = desktopViewport,
        ...renderOptions
    } = {}
) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    function Wrapper({ children }) {
        return (
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <BrowserRouter>
                        <IsMobileContext.Provider value={mobileContext}>
                            {children}
                        </IsMobileContext.Provider>
                    </BrowserRouter>
                </Provider>
            </QueryClientProvider>
        );
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Render with mobile context and Redux, but without Router
 * Useful for testing components that don't use routing
 * 
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @param {Object} options.initialState - Redux initial state
 * @param {Object} options.store - Redux store (optional)
 * @param {Object} options.mobileContext - Mobile breakpoint context (defaults to desktop)
 * @returns {Object} Render result from React Testing Library
 */
export function renderWithMobileWithoutRouter(
    ui,
    {
        initialState,
        store = createStore(reducer, initialState),
        mobileContext = desktopViewport,
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <IsMobileContext.Provider value={mobileContext}>
                    {children}
                </IsMobileContext.Provider>
            </Provider>
        );
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Mock window.matchMedia for breakpoint testing
 * Call this in beforeEach/beforeAll to set up media query mocking
 * 
 * @param {number} width - Window width in pixels
 */
export const mockMatchMedia = (width = 1024) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => {
            // Parse max-width queries
            const maxWidthMatch = query.match(/max-width:\s*(\d+)px/);
            const minWidthMatch = query.match(/min-width:\s*(\d+)px/);

            let matches = false;
            if (maxWidthMatch) {
                matches = width <= parseInt(maxWidthMatch[1], 10);
            } else if (minWidthMatch) {
                matches = width >= parseInt(minWidthMatch[1], 10);
            }

            return {
                matches,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            };
        })
    });
};

/**
 * Mock window.innerWidth for resize testing
 * 
 * @param {number} width - Window width in pixels
 */
export const mockWindowWidth = (width) => {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width
    });
};

/**
 * Check if element meets minimum touch target size (44x44px)
 * Useful for accessibility testing
 * 
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if meets WCAG touch target requirements
 */
export const meetsTouchTargetSize = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.width >= 44 && rect.height >= 44;
};

/**
 * Custom matcher for Jest to check touch target size
 * Usage: expect(element).toMeetTouchTargetSize()
 */
export const toMeetTouchTargetSize = {
    toMeetTouchTargetSize(received) {
        const rect = received.getBoundingClientRect();
        const pass = rect.width >= 44 && rect.height >= 44;

        if (pass) {
            return {
                message: () =>
                    `expected element not to meet touch target size (44x44px), but got ${rect.width}x${rect.height}`,
                pass: true
            };
        }
        return {
            message: () =>
                `expected element to meet touch target size (44x44px), but got ${rect.width}x${rect.height}`,
            pass: false
        };
    }
};

// Re-export everything from testing library for convenience
export * from "@testing-library/react";
