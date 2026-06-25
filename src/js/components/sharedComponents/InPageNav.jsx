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
        sections, jumpToSection, pageName, detectActiveSection, rootMargin, threshold, loading
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
        rootMargin: rootMargin || `-140px 0px 0px 0px`,
        threshold: threshold || [0, 0.25, 0.5, 0.75, 1]
    };

    let initialPageLoad = true;
    const prefix = `${pageName}-`;

    const callbackFunction = useCallback((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                visibleSections.add(entry.target);
            }
            else {
                visibleSections.delete(entry.target);
            }

            const visible = [...visibleSections];

            if (visible.length) {
                const topMost = visible.reduce((best, el) => (el.getBoundingClientRect().top < best.getBoundingClientRect().top ? el : best));

                const section = topMost.id.replace(prefix, "");

                setActiveSection(section);
            }
        });
    });
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

                const verticalSectionOffset = document.querySelector('.usda-page-header')?.offsetHeight || 60;
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

    useEffect(() => {
        getInitialElements();
        handleResize();
        setObserverSupported('IntersectionObserver' in window);

        window.addEventListener('resize', () => handleResize());
        return () => window.removeEventListener('resize', () => handleResize());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        // eslint-disable-next-line consistent-return
        if (observerSupported && initialPageLoad) {
            initialPageLoad = false;
            const target = prefix;
            const targets = document.querySelectorAll(`[id*='${target}']`);
            // eslint-disable-next-line no-undef
            const observer = new IntersectionObserver(callbackFunction, observerOptions);
            targets.forEach((i) => {
                if (i) {
                    observer.observe(i);
                }
            });

            return () => observer.disconnect();
        }
    }, [observerSupported, loading]);

    useEffect(() => {
        if (detectActiveSection && sectionPositions.length === 0) {
            cacheSectionPositions();
        }

        window.addEventListener('resize', cacheSectionPositions);

        return () => {
            window.removeEventListener('resize', cacheSectionPositions);
        };
    }, [detectActiveSection, sectionPositions.length]);

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
