/**
 * AboutContent.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { find, throttle } from 'lodash';
import { useDispatch } from 'react-redux';
import { showModal } from 'redux/actions/modal/modalActions';
import { scrollToY } from 'helpers/scrollToHelper';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';

import Sidebar from '../sharedComponents/sidebar/Sidebar';

import Mission from './Mission';
import Background from './Background';
import DataSources from './DataSources';
import DataQuality from './DataQuality';
import MoreInfo from './MoreInfo';
import Contact from './Contact';
import Development from './Development';
import Careers from './Careers';
import Licensing from './Licensing';

const aboutSections = [
    {
        section: 'mission',
        label: 'Mission'
    },
    {
        section: 'background',
        label: 'Background'
    },
    {
        section: 'data-sources',
        label: 'Data Sources'
    },
    {
        section: 'data-quality',
        label: 'Data Quality'
    },
    {
        section: 'development',
        label: 'Development and Releases'
    },
    {
        section: 'careers',
        label: 'Careers'
    },
    {
        section: 'licensing',
        label: 'Licensing'
    },
    {
        section: 'more-info',
        label: 'More Information'
    },
    {
        section: 'contact',
        label: 'Contact'
    }
];

const propTypes = {
    location: PropTypes.object // Router location object
};

const AboutContent = ({ location }) => {
    const [activeSection, setActiveSection] = useState(location.state?.fromCareersLink ? 'careers' : 'mission');
    const [sectionPositions, setSectionPositions] = useState([]);
    const [windowHeight, setWindowHeight] = useState(0);

    const cacheSectionPositions = throttle(async () => {
        // it is expensive to measure the DOM elements on every scroll, so measure them upfront
        // (and when the window resizes) and cache the values
        const newSectionPositions = aboutSections.map((section) => {
            const sectionCode = section.section;
            const domElement = document.getElementById(`about-${sectionCode}`);
            if (!domElement) {
                // couldn't find the element
                return { section: sectionCode, top: 0, bottom: 0 };
            }

            const topPos = domElement.offsetTop;
            const bottomPos = domElement.offsetHeight + topPos;

            return {
                section: sectionCode,
                top: topPos,
                bottom: bottomPos
            };
        });
        setSectionPositions(newSectionPositions);
        setWindowHeight(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    }, 100);

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(aboutSections, {
            section
        });

        if (!matchedSection) {
            // no matching section
            return;
        }
        setActiveSection(section);
        // scroll to the correct section
        const sectionDom = document.querySelector(`#about-${section}`);
        if (!sectionDom) {
            return;
        }

        const sectionTop = sectionDom.offsetTop - 10 - stickyHeaderHeight;
        scrollToY(sectionTop, 700);
    };

    const highlightCurrentSection = throttle(() => {
        const windowTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowBottom = windowTop + windowHeight;

        // determine the section to highlight
        let currentActiveSection = aboutSections[0].section;
        let bottomSectionVisible = false;
        const visibleSections = [];

        // ignore sections if only 30px of the top or bottom are visible
        const edgeMargin = 50;
        const visibleTop = windowTop + edgeMargin;
        const visibleBottom = windowBottom - edgeMargin;

        sectionPositions.forEach((section, index) => {
            // check if the section is in view at all
            if (section.top <= visibleBottom && section.bottom >= visibleTop) {
                // at least some of the section is in view, determine how much
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
            currentActiveSection = visibleSections[0].section;
            if (visibleSections[0].amount < 0.15 && visibleSections.length > 1) {
                // less than 15% of the first section is visible and we have more than 1 section,
                // select the next section
                currentActiveSection = visibleSections[1].section;
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
                currentActiveSection = bottomSection.section;
            }
        }

        if (currentActiveSection === activeSection) {
            // no change
            return;
        }
        setActiveSection(currentActiveSection);
    }, 100);

    useEffect(() => {
        cacheSectionPositions();
        window.addEventListener('scroll', highlightCurrentSection);
        window.addEventListener('resize', cacheSectionPositions);
        if (location.state?.fromCareersLink) jumpToSection('careers');
        return () => {
            window.removeEventListener('scroll', highlightCurrentSection);
            window.removeEventListener('resize', cacheSectionPositions);
        };
    }, []);

    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        e.persist();
        if (e?.target) {
            dispatch(showModal(e.target.parentNode.getAttribute('data-href') || e.target.getAttribute('data-href') || e.target.value));
        }
    };

    return (
        <div className="about-content-wrapper">
            <div className="about-sidebar">
                <Sidebar
                    isGoingToBeSticky
                    active={activeSection}
                    pageName="about"
                    sections={aboutSections}
                    jumpToSection={jumpToSection}
                    fixedStickyBreakpoint={getStickyBreakPointForSidebar()} />
            </div>
            <div className="about-content">
                <div className="about-padded-content">
                    <Mission />
                    <Background />
                    <DataSources onExternalLinkClick={onExternalLinkClick} />
                    <DataQuality onExternalLinkClick={onExternalLinkClick} />
                    <Development />
                    <Careers />
                    <Licensing />
                    <MoreInfo />
                    <Contact />
                </div>
            </div>
        </div>
    );
};

AboutContent.propTypes = propTypes;
export default withRouter(AboutContent);
