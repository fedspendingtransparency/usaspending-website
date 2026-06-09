import '@testing-library/jest-dom';
import registerIcons from "../src/js/registerIcons";
import { TextEncoder, TextDecoder } from 'util';
import { toMeetTouchTargetSize } from './testResources/mobileTestUtils';

if (!global.TextEncoder) {
    global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
    global.TextDecoder = TextDecoder;
}

window.URL.createObjectURL = function () {};

// Mock matchMedia globally for all tests
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
        return [];
    }
    unobserve() {}
};

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Add custom matchers
expect.extend(toMeetTouchTargetSize);

registerIcons();
