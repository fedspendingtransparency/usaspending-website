/**
 * InPageNav.jsx
 * Created by Andrea Blackwell 08/09/2023
 **/

import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { throttle } from "lodash";
import { mediumScreen, largeScreen } from 'dataMapping/shared/mobileBreakpoints';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    sections: PropTypes.array,
    activeSection: PropTypes.string,
    jumpToSection: PropTypes.func,
    detectActiveSection: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};

const InPageNav = (props) => {
    const {
        sections, jumpToSection, pageName, detectActiveSection
    } = props;
    const [activeSection, setActiveSection] = useState(props.activeSection);
    const [windowWidth, setWindowWidth] = useState(0);
    const [ulElement, setUlElement] = useState(null);
    const [elementData, setElementData] = useState([]);
    const [isOverflowLeft, setIsOverflowLeft] = useState(false);
    const [isOverflowRight, setIsOverflowRight] = useState(false);
    const [padding, setPadding] = useState(32);
    const [isMobile, setIsMobile] = useState(0);
    const navBar = useRef(null);
    const [sectionPositions, setSectionPositions] = useState([]);

    // detect if the element is overflowing on the left or the right
    const checkIsOverflowHidden = () => {
        let left = false;
        let right = false;
        const ulEl = navBar?.current?.querySelector("ul");
        const elArray = [...ulEl?.childNodes];
        const firstElPosition = elArray[0]?.getBoundingClientRect();
        const lastElPosition = elArray[elArray.length - 1]?.getBoundingClientRect();

        if (firstElPosition.left < 0 || ulEl.scrollLeft > 0) {
            left = true;
        }

        if (lastElPosition.right > ulEl.clientWidth + padding || lastElPosition.right > ulEl.scrollWidth) {
            right = true;
        }

        setIsOverflowLeft(left);
        setIsOverflowRight(right);
    };

    const handleHorizontalScroll = useCallback((e) => {
        e.stopPropagation();
        checkIsOverflowHidden();
    });

    const reset = () => {
        const ulEl = navBar.current.querySelector("ul");
        ulEl.scrollTo({ left: "0", behavior: 'smooth' });
    };

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
        // check for last visible item
        if (lastVisibleIndex + 2 < elementData.length) {
            const newLeftPosition = (ulEl.scrollLeft - ulEl.clientWidth) + 20 + elementData[lastVisibleIndex + 1].width + elementData[lastVisibleIndex + 2].width;
            ulEl.scrollTo({ left: newLeftPosition, behavior: 'smooth' });
        }
        else {
            reset();
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

            if (index - 2 >= 0) {
                const leftPosition = elementData[index - 2]?.originalLeftOffset + (padding / 2);
                ulEl.scrollTo({ left: leftPosition, behavior: 'smooth' });
            }
            else {
                reset();
            }
        }
    });

    const getInitialElements = useCallback(() => {
        const tempElementData = [];
        const ulEl = navBar.current.querySelector("ul");
        ulEl.childNodes.forEach((el) => {
            const box = el.getBoundingClientRect();
            tempElementData.push({
                name: el.innerHTML,
                originalLeftOffset: box.left,
                width: box.width
            });
        });

        setUlElement(ulEl);
        setElementData(tempElementData);
        checkIsOverflowHidden();
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

    const handleResize = throttle(() => {
        const newWidth = window.innerWidth;
        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
        }
    }, 50);

    useEffect(() => {
        handleResize();
        getInitialElements();
        window.addEventListener('resize', () => handleResize());
        return () => window.removeEventListener('resize', () => handleResize());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (windowWidth) {
            setIsMobile(windowWidth < mediumScreen);

            if (windowWidth > mediumScreen) {
                setPadding(20 + 24);
            }
            else if (windowWidth > largeScreen) {
                setPadding(40 + 24);
            }

            checkIsOverflowHidden();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth]);

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
                const visibleHeight = Math.min(section.bottom, visibleBottom) -
                    Math.max(visibleTop, section.top);
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
                className={`usda-in-page-nav__wrapper ${isOverflowLeft ? 'left-fade-effect' : ''} ${isOverflowRight ? 'right-fade-effect' : ''} `}>
                {isOverflowLeft && !isMobile &&
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
                }

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
                        </li>))}
                </ul>

                {isOverflowRight && !isMobile &&
                    <div
                        aria-label="In-page navigation right paginator"
                        title="In-page navigation right paginator"
                        className="usda-in-page-nav__paginator right"
                        tabIndex="0"
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "right")}
                        onClick={(e) => scrollRight(e)}>
                        <FontAwesomeIcon icon="chevron-right" alt="Forward" />
                    </div>}
            </nav>
        </div>
    );
};

InPageNav.propTypes = propTypes;
export default InPageNav;
