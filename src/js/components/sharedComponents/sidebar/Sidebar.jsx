/**
 * Sidebar.jsx
 * Created by Kevin Li 6/8/17
 */

import React, { useEffect, useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import FYPicker from 'components/state/RecipientFYPicker';
import SidebarLink from './SidebarLink';
import { useDynamicStickyClass } from '../stickyHeader/StickyHeader';

const propTypes = {
    active: PropTypes.string,
    pageName: PropTypes.string,
    sections: PropTypes.array,
    jumpToSection: PropTypes.func,
    fyPicker: PropTypes.bool,
    selectedFy: PropTypes.string,
    pickedYear: PropTypes.func,
    detectActiveSection: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    fixedStickyBreakpoint: PropTypes.number
};

const defaultSectionOffsets = { stickyVerticalOffset: 0 };
const referenceDiv = createRef();
const div = createRef();

const Sidebar = ({
    active,
    pageName,
    sections,
    jumpToSection,
    fyPicker,
    selectedFy,
    pickedYear,
    detectActiveSection = false,
    fixedStickyBreakpoint = null
}) => {
    // yPosition, in px, of sections referenced in sidebar
    const [sectionPositions, setSectionPositions] = useState([]);
    const [sidebarWidth, setSidebarWidth] = useState("auto");
    const [isSidebarSticky, , , handleScroll] = useDynamicStickyClass(referenceDiv, fixedStickyBreakpoint);

    useEffect(() => {
        const updateSidebarWidth = throttle(() => {
            if (isSidebarSticky && sidebarWidth !== referenceDiv.current.offsetWidth) {
                setSidebarWidth(`${referenceDiv.current.offsetWidth}px`);
            }
            else if (!isSidebarSticky && sidebarWidth !== div.current.offsetWidth) {
                setSidebarWidth(`auto`);
            }
        }, 100);
        updateSidebarWidth();
        window.addEventListener('resize', updateSidebarWidth);

        return () => {
            window.removeEventListener('resize', updateSidebarWidth);
        };
    }, [sidebarWidth, setSidebarWidth, isSidebarSticky]);

    const cacheSectionPositions = throttle(() => {
        // Measure section positions on windowResize and first render
        const newSectionPositions = sections
            .map((section) => ({ ...defaultSectionOffsets, ...section }))
            .map((section) => {
                const sectionCode = section.section;
                const domElement = document.getElementById(`${pageName}-${sectionCode}`);
                if (!domElement) {
                    // couldn't find the element
                    return null;
                }
                // Subtracting summed height of elements w/ fixed positioning
                const topPos = domElement.offsetTop - section.stickyVerticalOffset;
                const bottomPos = (domElement.offsetHeight + topPos) - section.stickyVerticalOffset;

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
        let nextActiveSection = active;
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
            if (visibleSections[0].amount < 0.50 && visibleSections.length > 1) {
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

        if (nextActiveSection === active) {
            // no change
            return;
        }
        detectActiveSection(nextActiveSection);
    }, 100);

    useEffect(() => {
        if (detectActiveSection && sectionPositions.length === 0) {
            cacheSectionPositions();
        }

        const handleScrollAndSetActiveSection = () => {
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

    const buildItems = (section) => {
        let link = (
            <SidebarLink
                section={section.section}
                label={section.label}
                active={active}
                onClick={jumpToSection} />
        );
        if (section.url) {
            const activeClass = active === section.section ? 'active' : '';
            link = (
                <a
                    className={`sidebar-link ${activeClass}`}
                    href={section.url}>
                    {section.label}
                </a>
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
        <div>
            <div className={`${pageName}-sidebar-reference ${floatSidebar}`} ref={referenceDiv}>
                &nbsp;
            </div>
            <div ref={div} className={`${pageName}-sidebar-content ${floatSidebar}`} style={{ width: sidebarWidth }}>
                {fyPicker && (
                    <FYPicker
                        selectedFy={selectedFy}
                        pickedYear={pickedYear} />
                )}
                <ul>
                    {sections.map(buildItems)}
                </ul>
            </div>
        </div>
    );
};

Sidebar.propTypes = propTypes;

export default Sidebar;
