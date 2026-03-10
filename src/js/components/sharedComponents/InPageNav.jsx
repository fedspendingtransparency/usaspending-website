/**
 * InPageNav.jsx
 * Created by Andrea Blackwell 08/09/2023
 **/

import React, {
    useEffect, useState, useRef, useCallback
} from 'react';
import PropTypes from 'prop-types';
import { throttle } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mediumScreen, largeScreen, xLargeScreen } from 'dataMapping/shared/mobileBreakpoints';
import { checkIsOverflow, getElementData, reset } from 'helpers/inPageNavHelper';

const propTypes = {
    sections: PropTypes.array,
    activeSection: PropTypes.string,
    jumpToSection: PropTypes.func,
    detectActiveSection: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    pageName: PropTypes.string
};

const InPageNav = (props) => {
    const {
        sections, jumpToSection, pageName, detectActiveSection
    } = props;
    const [observerSupported, setObserverSupported] = useState(false);
    const [activeSection, setActiveSection] = useState(props.activeSection);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [ulElement, setUlElement] = useState(null);
    const [elementData, setElementData] = useState([]);
    const [isOverflowLeft, setIsOverflowLeft] = useState(false);
    const [isOverflowRight, setIsOverflowRight] = useState(false);
    const [padding, setPadding] = useState(32);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const navBar = useRef(null);
    const [sectionPositions, setSectionPositions] = useState([]);
    const visibleSections = new Set();

    const observerOptions = {
        threshold: 0.1
    };
    
    let firstTime = true;

    const callbackFunction = (entries) => {
        entries.forEach((entry) => {
            const section = entry.target.id.replace("agency-v2-", "");
            if (entry.isIntersecting) {
                visibleSections.add(entry.target);
            } else {
                visibleSections.delete(entry.target);
            }

            const visible = [...visibleSections];
            if (!visible.length) return;

            const topMost = visible.reduce((best, el) => {
                return el.getBoundingClientRect().top < best.getBoundingClientRect().top ? el : best;
            });

            console.log("testing sections", visible, topMost);

            sections.forEach((s) => {
                // console.log("testing sections", s, topMost, visible);
            })
            //     if (section === 'awards') {
            //         logVisualizationViewEvent("awards");
            //     }
            //     else if (section === 'time') {
            //         setTimeHasLoaded(true);
            //         logVisualizationViewEvent("time");
            //     }
            //     else if (section === 'categories') {
            //         setCategoriesHasLoaded(true);
            //         logVisualizationViewEvent("categories");
            //     }
            //     else if (section === "map") {
            //         setMapHasLoaded(true);
            //         logVisualizationViewEvent("map");
            //     }
            // }
        });
    };
    // detect if the element is overflowing on the left or the right
    const checkIsOverflowHidden = () => {
        const ulEl = navBar?.current?.querySelector("ul");
        const { left, right } = checkIsOverflow(ulEl, padding);

        setIsOverflowLeft(left);
        setIsOverflowRight(right);
    };

    const handleHorizontalScroll = useCallback((e) => {
        e.stopPropagation();
        checkIsOverflowHidden();
    });

    const scrollLeft = useCallback((e) => {
        e.stopPropagation();

        const ulEl = navBar.current.querySelector("ul");
        const elArray = [...ulEl.childNodes];
        const lastVisibleEl = {
            name: "",
            index: 0
        };

        // eslint-disable-next-line array-callback-return,consistent-return
        elArray.find((el, i) => {
            const box = el.getBoundingClientRect();
            if (box.left > 0 && box.right < ulEl.clientWidth) {
                lastVisibleEl.name = el.querySelector('a').innerHTML;
                lastVisibleEl.index = i;
                return i;
            }
        });

        const lastVisibleIndex = lastVisibleEl.index;
        // check for last 2 visible items
        if (lastVisibleIndex + 2 < elementData.length) {
            const newLeftPosition = (ulEl.scrollLeft - ulEl.clientWidth) + 20 + elementData[lastVisibleIndex + 1].width + elementData[lastVisibleIndex + 2].width;
            ulEl.scrollTo({ left: newLeftPosition, behavior: 'smooth' });
        }
        else {
            reset(navBar);
        }
    });

    const scrollRight = useCallback((e) => {
        e.stopPropagation();

        if (elementData) {
            const ulEl = navBar.current.querySelector("ul");
            const elArray = [...ulEl.childNodes];
            const firstRtHiddenEl = {
                name: "",
                index: 0
            };

            // eslint-disable-next-line array-callback-return,consistent-return
            elArray.find((el, i) => {
                const box = el.getBoundingClientRect();
                const documentWidth = ulEl.clientWidth;
                // Check if element is hidden
                if (box.right > documentWidth && box.left > padding / 2) {
                    firstRtHiddenEl.name = el.querySelector('a').innerHTML;
                    firstRtHiddenEl.index = i;
                    return i;
                }
            });

            const index = firstRtHiddenEl.index;

            // check for 2 items
            if (index - 2 >= 0) {
                const leftOffset = elementData[index - 2]?.originalLeftOffset;
                if (leftOffset) {
                    const leftPosition = leftOffset + (padding / 2);
                    ulEl.scrollTo({ left: leftPosition, behavior: 'smooth' });
                }
            }
            else {
                reset(navBar);
            }
        }
    });

    const getInitialElements = useCallback(() => {
        const ulEl = navBar.current.querySelector("ul");
        const tempElementData = getElementData(ulEl);

        setUlElement(ulEl);
        setElementData(tempElementData);
    });

    const onKeyPress = useCallback((e, direction) => {
        if (e.key === "Enter") {
            if (direction === "left") {
                scrollLeft(e);
            }

            if (direction === "right") {
                scrollRight(e);
            }
        }
    });

    const handleResize = () => {
        const newWidth = window.innerWidth;

        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
        }

        setIsMobile(windowWidth < mediumScreen);

        if (mediumScreen < windowWidth && windowWidth <= largeScreen) {
            setPadding(20 + 32);
        }
        if (largeScreen < windowWidth && windowWidth <= xLargeScreen) {
            setPadding(40 + 32);
        }
        if (xLargeScreen < windowWidth) {
            setPadding(160 + 32);
        }

        checkIsOverflowHidden();
    };

    useEffect(() => {
        getInitialElements();
        handleResize();

        window.addEventListener('resize', () => handleResize());
        return () => window.removeEventListener('resize', () => handleResize());
    }, []);

    useEffect(() => {
        checkIsOverflowHidden();
        ulElement?.addEventListener('scrollend', (e) => handleHorizontalScroll(e));
        return () => ulElement?.removeEventListener('scrollend', (e) => handleHorizontalScroll(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ulElement]);

    const cacheSectionPositions = throttle(() => {
        // Measure section positions on windowResize and first render
        const newSectionPositions = sections
            .map((section) => {
                const sectionCode = section.section;
                const domElement = document.getElementById(`${pageName}-${sectionCode}`);
                if (!domElement) {
                    // couldn't find the element
                    return null;
                }

                const verticalSectionOffset = document.querySelector('.usda-page-header')?.offsetHeight || 0;
                // Subtracting summed height of elements w/ fixed positioning
                const topPos = domElement.offsetTop - verticalSectionOffset;
                const bottomPos = (domElement.offsetHeight + topPos) - verticalSectionOffset;

                return {
                    section: sectionCode,
                    top: topPos,
                    bottom: bottomPos
                };
            });

        setSectionPositions(newSectionPositions);
    }, 100);

    const highlightCurrentSection = throttle(() => {
        const windowTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowBottom = windowTop + window.innerHeight;

        // determine the section to highlight
        let nextActiveSection = activeSection;
        let bottomSectionVisible = false;
        const visibleSections = [];

        // ignore sections if only 30px of the top or bottom are visible
        const edgeMargin = 30;
        const visibleTop = windowTop + edgeMargin;
        const visibleBottom = windowBottom - edgeMargin;

        sectionPositions.forEach((section, index) => {
            // 1. check if the section is in view
            if (section.top <= visibleBottom && section.bottom >= visibleTop) {
                // 2. get % of section in view
                const height = section.bottom - section.top;
                const visibleHeight = Math.min(section.bottom, visibleBottom)
                    - Math.max(visibleTop, section.top);
                const percentageVisible = visibleHeight / height;
                visibleSections.push({
                    section: section.section,
                    amount: percentageVisible
                });

                if (index === sectionPositions.length - 1) {
                    // this is the last section and it is visible
                    bottomSectionVisible = true;
                }
            }
            else if (index === sectionPositions.length - 1) {
                // this is the last section, so highlight it if we're at the bottom or lower
                // on the page
                if (section.top <= visibleTop) {
                    // we are lower than the top of the last section
                    bottomSectionVisible = true;
                    visibleSections.push({
                        section: section.section,
                        amount: 1
                    });
                }
            }
        });

        // select the first section we saw
        if (visibleSections.length > 0) {
            nextActiveSection = visibleSections[0].section;
            if (visibleSections[0].amount < 0.15 && visibleSections.length > 1) {
                // less than 15% of the first section is visible and we have more than 1 section,
                // select the next section
                nextActiveSection = visibleSections[1].section;
            }
        }

        // handle a case where we're at the bottom but there's the bottom section is not tall enough
        // to be the first visible section (which will cause the bottom section to never be
        // active)
        if (bottomSectionVisible && visibleSections.length > 1) {
            const bottomSection = visibleSections[visibleSections.length - 1];
            const previousSection = visibleSections[visibleSections.length - 2];
            if (previousSection.amount < 0.5 && bottomSection.amount === 1) {
                // less than half of the previous section is visible and all of the bottom section
                // is visible, select the bottom section
                nextActiveSection = bottomSection.section;
            }
        }

        if (nextActiveSection === activeSection) {
            // no change
            return;
        }
        setActiveSection(nextActiveSection);
    }, 100);

    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (observerSupported && firstTime) {
            firstTime = false;
            const target = 'agency-v2-';
            const targets = document.querySelectorAll(`[id*="${target}"]`);

            //eslint-disable-next-line no-undef
            const observer = new IntersectionObserver(callbackFunction, observerOptions);

            targets.forEach((i) => {
                if (i.className) {
                    observer.observe(i);
                }
            });

            return () => observer.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observerSupported]);

    useEffect(() => {
        if (detectActiveSection && sectionPositions.length === 0) {
            cacheSectionPositions();
        }

        const handleScrollAndSetActiveSection = () => {
            cacheSectionPositions();
            if (detectActiveSection) highlightCurrentSection();
        };

        window.addEventListener('scroll', handleScrollAndSetActiveSection);
        window.addEventListener('resize', cacheSectionPositions);

        return () => {
            window.removeEventListener('scroll', handleScrollAndSetActiveSection);
            window.removeEventListener('resize', cacheSectionPositions);
        };
    }, [
        detectActiveSection,
        cacheSectionPositions,
        highlightCurrentSection,
        sectionPositions.length
    ]);

    return (
        <div className="usda-in-page-nav__container">
            <nav
                ref={navBar}
                className={`usda-in-page-nav__wrapper ${(isOverflowLeft && !isMobile) ? 'left-fade-effect' : ''} ${isOverflowRight ? 'right-fade-effect' : ''} `}>
                {isOverflowLeft && !isMobile
                    && (
                        <div
                            aria-label="In-page navigation left paginator"
                            title="In-page navigation left paginator"
                            className="usda-in-page-nav__paginator left"
                            tabIndex="0"
                            role="button"
                            onKeyDown={(e) => onKeyPress(e, "left")}
                            onClick={(e) => scrollLeft(e)}>
                            <FontAwesomeIcon icon="chevron-left" alt="Back" />
                        </div>
                    )}
                <ul>
                    {sections.map((section) => (
                        <li className={`usda-in-page-nav__element ${section.section === activeSection ? 'active' : ''}`} key={`in-page-nav-li-${section.label}`}>
                            <a
                                role="button"
                                tabIndex="0"
                                key={`in-page-nav-link-${section.label}`}
                                onKeyDown={(e) => (e.key === "Enter" ? jumpToSection(section.section) : "")}
                                onClick={() => jumpToSection(section.section)}>
                                {section.label}
                            </a>
                        </li>
                    ))}
                </ul>
                {isOverflowRight && !isMobile
                    && (
                        <div
                            aria-label="In-page navigation right paginator"
                            title="In-page navigation right paginator"
                            className="usda-in-page-nav__paginator right"
                            tabIndex="0"
                            role="button"
                            onKeyDown={(e) => onKeyPress(e, "right")}
                            onClick={(e) => scrollRight(e)}>
                            <FontAwesomeIcon icon="chevron-right" alt="Forward" />
                        </div>
                    )}
            </nav>
        </div>
    );
};

InPageNav.propTypes = propTypes;
export default InPageNav;
