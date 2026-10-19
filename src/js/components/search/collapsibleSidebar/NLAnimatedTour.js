/**
 * NLAnimatedTour.js
 * Created by Nick Torres 10/6/2026
 */

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const MOBILE_BREAKPOINT = 992;
const MOBILE_STEP3_WAIT_MS = 1000;
const MOBILE_SCROLL_DELAY_MS = 400;
const MOBILE_SCROLL_OFFSET = 200;
const RESIZE_DEBOUNCE_MS = 200;

const isMobileViewport = () => window.innerWidth <= MOBILE_BREAKPOINT;

const stepContent = {
    step1: {
        title: 'Search your way',
        description: 'Toggle between our Advanced Search Filters or AI-powered Smart Assist. Both give you the same data.'
    },
    step2: {
        title: 'Begin your search',
        description: 'Begin typing your government spending question or use one of our examples above to help you get started. Ask your government spending questions in your own words, then click Search.'
    },
    step3: {
        title: 'Not sure what to ask?',
        description: 'Try one of our example prompts to start your search.'
    },
    step4: {
        title: 'Understanding terminology',
        description: "Access the glossary any time to look up terms you don't recognize."
    },
    step5: {
        title: 'Need more help?',
        description: 'Explore articles and resources to learn more about Smart Assist.'
    }
};

const desktopSteps = [
    { element: '#animated-tour-step1', popover: { ...stepContent.step1, side: "right", align: 'start', showButtons: ["next", "close"] } },
    { element: '#animated-tour-step2', popover: { ...stepContent.step2, side: "right", align: 'center' } },
    { element: '#animated-tour-step3', popover: { ...stepContent.step3, side: "right", align: 'center' } },
    { element: '#animated-tour-step4', popover: { ...stepContent.step4, side: "top", align: 'center' } },
    { element: '#animated-tour-step5', popover: { ...stepContent.step5, side: "bottom", align: 'center' } }
];

const mobileSteps = [
    { element: '#animated-tour-mobile-step1', popover: { ...stepContent.step1, side: "top", align: 'start', showButtons: ["next", "close"] } },
    { element: '#animated-tour-step2', popover: { ...stepContent.step2, side: "top", align: 'center' } },
    { element: '#animated-tour-step3', waitForElement: MOBILE_STEP3_WAIT_MS, popover: { ...stepContent.step3, side: "bottom", align: 'center' } },
    { element: '#animated-tour-step4', popover: { ...stepContent.step4, side: "top", align: 'center' } },
    { element: '#animated-tour-step5', popover: { ...stepContent.step5, side: "bottom", align: 'center' } }
];

const getStepsForScreenSize = () => (isMobileViewport() ? mobileSteps : desktopSteps);

const scrollToStep4 = () => {
    const sectionDom = document.querySelector("#animated-tour-step4");
    if (!sectionDom) {
        return;
    }

    window.scrollTo({
        top: sectionDom.offsetTop - MOBILE_SCROLL_OFFSET,
        left: 0,
        behavior: 'smooth'
    });
};

const animatedTour = driver({
    onNextClick: (element, step) => {
        if (step.element === "#animated-tour-step3" && isMobileViewport()) {
            document.querySelector(".sidebar-close")?.click();
            setTimeout(scrollToStep4, MOBILE_SCROLL_DELAY_MS);
        }

        animatedTour.moveNext();
    },
    onPrevClick: (element, step) => {
        if (step.element === "#animated-tour-step4" && isMobileViewport()) {
            const elements = document.querySelectorAll('.mobile-filter-button-v2');
            elements[elements.length - 1]?.click();
        }

        animatedTour.movePrevious();
    },
    smoothScroll: true,
    allowScroll: true,
    stagePadding: 20,
    popoverClass: 'nl-theme',
    showProgress: true,
    doneBtnText: "Done",
    overlayClickBehavior: 'close',
    steps: getStepsForScreenSize()
});

let currentIsMobile = isMobileViewport();
let resizeTimeout;

const handleViewportChange = () => {
    const nowMobile = isMobileViewport();
    if (nowMobile === currentIsMobile) {
        return;
    }

    currentIsMobile = nowMobile;

    // setSteps() resets the driver's active-index state even mid-tour, which breaks
    // next/previous navigation. setConfig() swaps the steps without touching state.
    animatedTour.setConfig({ ...animatedTour.getConfig(), steps: getStepsForScreenSize() });

    if (animatedTour.isActive()) {
        const activeIndex = animatedTour.getActiveIndex();
        if (typeof activeIndex === 'number') {
            animatedTour.moveTo(activeIndex);
        }
    }
};

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleViewportChange, RESIZE_DEBOUNCE_MS);
});

let currentPath = window.location.pathname + window.location.search;

const handleUrlChange = () => {
    const newPath = window.location.pathname + window.location.search;
    if (newPath === currentPath) {
        return;
    }

    currentPath = newPath;
    animatedTour.destroy();
};

// React Router navigates via history.pushState/replaceState, which don't fire 'popstate',
// so those methods are wrapped here to catch in-app navigation along with back/forward.
// this prevents the tour remaining open when the url changes
['pushState', 'replaceState'].forEach((methodName) => {
    const originalMethod = window.history[methodName].bind(window.history);
    window.history[methodName] = (...args) => {
        originalMethod(...args);
        handleUrlChange();
    };
});

window.addEventListener('popstate', handleUrlChange);

export default animatedTour;
