/**
 * SideBarNav.jsx
 * Created by Spencer Su 10/14/2026
 **/

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from "lodash-es";
import { largeScreen, mediumScreen, xLargeScreen } from 'dataMapping/shared/mobileBreakpoints';
import { checkIsOverflow } from 'helpers/inPageNavHelper';
import { FlexGridCol, NewPicker } from 'data-transparency-ui';

const propTypes = {
    sections: PropTypes.array,
    activeSection: PropTypes.string,
    jumpToSection: PropTypes.func,
    detectActiveSection: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    pageName: PropTypes.string,
    rootMargin: PropTypes.string,
    threshold: PropTypes.array,
    loading: PropTypes.bool
};

const SideBarNav = ({
    sections, jumpToSection, pageName, detectActiveSection, rootMargin, threshold, loading, ...props
}) => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [activeSection, setActiveSection] = useState(props.activeSection);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isOverflowLeft, setIsOverflowLeft] = useState(false);
    const [isOverflowRight, setIsOverflowRight] = useState(false);
    const [padding, setPadding] = useState(32);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const navBar = useRef(null);
    const [sectionPositions, setSectionPositions] = useState([]);

    // const mobileOptions = (options) => {
    //     const formattedData = options.map(({ section: name, label: value }) => ({
    //         name,
    //         value,
    //     }));
    // };

    const sideBarClick = (option) => {
        jumpToSection(option);
        setActiveSection(option);
    };

    const visibleSections = new Set();

    const observerOptions = {
        rootMargin: rootMargin || `-140px 0px 0px 0px`,
        threshold: threshold || [0, 0.25, 0.5, 0.75, 1]
    };

    const initialLoadRef = useRef(true);
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

    const handleResize = () => {
        const newWidth = window.innerWidth;

        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
            setIsMobile(newWidth < mediumScreen);
        }

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

    useEffect(() => {
        // getInitialElements();
        handleResize();
        setObserverSupported('IntersectionObserver' in window);

        window.addEventListener('resize', () => handleResize());
        return () => window.removeEventListener('resize', () => handleResize());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (observerSupported && initialLoadRef.current) {
            initialLoadRef.current = false;
            const targets = document.querySelectorAll(`[id*='${prefix}']`);
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
        <>
            {!!isMobile && (
                <NewPicker
                    options={sections}
                    leftIcon=""
                    selectedOption={sections?.length ?
                        // eslint-disable-next-line max-len, react/prop-types
                        sections?.find((obj) => obj.value === props?.activeField || obj.value === props?.sort?.field)?.name :
                        `${props?.activeField || props.sort?.field}`}
                    size="md"
                    label="Sort by:"
                    enabled
                    sortFn={() => sections}
                    classname="mobile-sort__picker" />
            )}
            {!isMobile && (

                <FlexGridCol
                    className="search-info-page__sidebar-col"
                    desktop={{ span: 3, offset: 0 }}
                    tablet={3}
                    mobile={3}>
                    <div className="left">
                        <h2>Browse topics on this page</h2>
                        <nav
                            ref={navBar}
                            className={`usda-in-page-nav__wrapper ${(isOverflowLeft && !isMobile) ? 'left-fade-effect' : ''} ${isOverflowRight ? 'right-fade-effect' : ''} `}>
                            <ul className="sticky-sidebar-nav">
                                {sections.map((section) => (
                                    <li
                                        className={`usda-in-page-nav__element ${section.section === activeSection ? 'active' : ''}`}
                                        key={`in-page-nav-li-${section.label}`}>
                                        <button
                                            className={`sidenav-anchor ${section.section === activeSection ? 'active' : ''}`}
                                            tabIndex="0"
                                            id={`in-page-nav-link-${section.label}`}
                                            key={`in-page-nav-link-${section.label}`}
                                            onKeyDown={(e) => (e.key === "Enter" ? sideBarClick(section.section) : "")}
                                            onClick={() => sideBarClick(section.section)}>
                                            {section.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </FlexGridCol>
            )}
        </>
    );
};

SideBarNav.propTypes = propTypes;
export default SideBarNav;
