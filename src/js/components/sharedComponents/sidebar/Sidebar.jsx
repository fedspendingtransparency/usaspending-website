/**
 * Sidebar.jsx
 * Created by Kevin Li 6/8/17
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { Link } from 'react-router-dom';

import FYPicker from 'components/state/RecipientFYPicker';
import { useDynamicStickyClass } from 'helpers/stickyHeaderHelper';
import SidebarLink from './SidebarLink';

const propTypes = {
    active: PropTypes.string,
    pageName: PropTypes.string,
    sections: PropTypes.array,
    jumpToSection: PropTypes.func,
    fyPicker: PropTypes.bool,
    selectedFy: PropTypes.string,
    pickedYear: PropTypes.func,
    detectActiveSection: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    fixedStickyBreakpoint: PropTypes.number,
    isGoingToBeSticky: PropTypes.bool,
    verticalSectionOffset: PropTypes.number,
    children: PropTypes.node
};

/**
 * isGoingToBeSticky
 * - pass this parameter when you know your side bar will be sticky.
 * This prevents the side bar from a flickering width by setting it's
 * width instead of using auto.
 */

const Sidebar = ({
    active,
    pageName,
    sections,
    jumpToSection,
    fyPicker,
    selectedFy,
    pickedYear,
    detectActiveSection = false,
    fixedStickyBreakpoint = null,
    isGoingToBeSticky = false,
    verticalSectionOffset = 0,
    children
}) => {
    // yPosition, in px, of sections referenced in sidebar
    const outerReferenceDiv = useRef();
    const referenceDiv = useRef();
    const div = useRef();
    const [sectionPositions, setSectionPositions] = useState([]);
    const [sidebarWidth, setSidebarWidth] = useState("auto");
    const [isSidebarSticky, , , handleScroll] = useDynamicStickyClass(referenceDiv, fixedStickyBreakpoint);
    const [activeSection, setActiveSection] = useState(active || sections[0].section);

    useEffect(() => {
        const updateSidebarWidth = throttle(() => {
            if (isGoingToBeSticky && (sidebarWidth !== `${div.current.offsetWidth}px`)) { // set width so no flicker on load
                setSidebarWidth(`${div.current.offsetWidth}px`);
            }
            if (isGoingToBeSticky && (sidebarWidth !== `${outerReferenceDiv.current.offsetWidth}px`)) { // set width on resize
                setSidebarWidth(`${outerReferenceDiv.current.offsetWidth}px`);
            }
            if (!isGoingToBeSticky) {
                if (isSidebarSticky && sidebarWidth !== `${referenceDiv.current.offsetWidth}px`) {
                    setSidebarWidth(`${referenceDiv.current.offsetWidth}px`);
                }
                else if (!isSidebarSticky && sidebarWidth !== div.current.offsetWidth) {
                    setSidebarWidth(`auto`);
                }
            }
        }, 100);
        updateSidebarWidth();
        window.addEventListener('resize', updateSidebarWidth);

        return () => {
            window.removeEventListener('resize', updateSidebarWidth);
        };
    }, [sidebarWidth, setSidebarWidth, isSidebarSticky, isGoingToBeSticky]);

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
            handleScroll();
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
        handleScroll,
        sectionPositions.length
    ]);

    const jumpToSectionWrapper = (section) => {
        if (!active) return jumpToSection(section);
        return jumpToSection(section, activeSection);
    };

    const buildItems = (section) => {
        let link = (
            <SidebarLink
                section={section.section}
                label={section.label}
                overLine={section.overLine}
                active={activeSection}
                onClick={jumpToSectionWrapper} />
        );
        if (section.url) {
            const activeClass = activeSection === section.section ? 'active' : '';
            link = (
                <Link
                    className={`sidebar-link ${activeClass}`}
                    to={section.url}>
                    {section.label}
                </Link>
            );
        }
        return (
            <li key={section.section}>
                {link}
            </li>
        );
    };

    const floatSidebar = isSidebarSticky
        ? 'float-sidebar'
        : '';

    return (
        <div ref={outerReferenceDiv}>
            <div className={`${pageName}-sidebar-reference ${floatSidebar}`} ref={referenceDiv}>
              &nbsp;
            </div>
            <div ref={div} className={`${pageName}-sidebar-content ${floatSidebar}`} style={{ width: sidebarWidth }}>
                <div className={`${pageName}-sidebar-content-background`}>
                    {fyPicker && (
                        <FYPicker
                            selectedFy={selectedFy}
                            pickedYear={pickedYear} />
                    )}
                    <ul>
                        {sections.map(buildItems)}
                    </ul>
                </div>
                {children}
            </div>
        </div>
    );
};

Sidebar.propTypes = propTypes;

export default Sidebar;
