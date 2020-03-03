/**
 * AboutContent.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React from 'react';
import { find, throttle } from 'lodash';
import { scrollToY } from 'helpers/scrollToHelper';
import * as StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';

import Sidebar from '../sharedComponents/sidebar/Sidebar';

import Mission from './Mission';
import Background from './Background';
import DataSources from './DataSources';
import DataQuality from './DataQuality';
import MoreInfo from './MoreInfo';
import Contact from './Contact';
import Development from './Development';
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

export default class AboutContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSection: 'mission',
            sectionPositions: [],
            window: {
                height: 0
            }
        };

        this.jumpToSection = this.jumpToSection.bind(this);
        this.highlightCurrentSection = throttle(this.highlightCurrentSection.bind(this), 100);
        this.cacheSectionPositions = throttle(this.cacheSectionPositions.bind(this), 100);
    }

    componentDidMount() {
        this.cacheSectionPositions();
        window.addEventListener('scroll', this.highlightCurrentSection);
        window.addEventListener('resize', this.cacheSectionPositions);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.highlightCurrentSection);
        window.removeEventListener('resize', this.cacheSectionPositions);
    }

    cacheSectionPositions() {
        // it is expensive to measure the DOM elements on every scroll, so measure them upfront
        // (and when the window resizes) and cache the values
        const sectionPositions = [];

        for (let i = 0; i < aboutSections.length; i++) {
            const sectionCode = aboutSections[i].section;
            const domElement = document.getElementById(`about-${sectionCode}`);
            if (!domElement) {
                // couldn't find the element
                continue;
            }

            const topPos = domElement.offsetTop;
            const bottomPos = domElement.offsetHeight + topPos;

            sectionPositions.push({
                section: sectionCode,
                top: topPos,
                bottom: bottomPos
            });
        }

        const windowHeight = window.innerHeight
            || document.documentElement.clientHeight || document.body.clientHeight;

        this.setState({
            sectionPositions,
            window: {
                height: windowHeight
            }
        });
    }

    jumpToSection(section = '') {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(aboutSections, {
            section
        });

        if (!matchedSection) {
            // no matching section
            return;
        }

        // update the state
        this.setState({
            activeSection: section
        }, () => {
            // scroll to the correct section
            const sectionDom = document.querySelector(`#about-${section}`);
            if (!sectionDom) {
                return;
            }

            const sectionTop = sectionDom.offsetTop - 10 - StickyHeader.stickyHeaderHeight;
            scrollToY(sectionTop, 700);
        });
    }

    highlightCurrentSection() {
        const windowTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowBottom = windowTop + this.state.window.height;

        // determine the section to highlight
        let activeSection = aboutSections[0].section;
        let bottomSectionVisible = false;
        const visibleSections = [];

        // ignore sections if only 30px of the top or bottom are visible
        const edgeMargin = 50;
        const visibleTop = windowTop + edgeMargin;
        const visibleBottom = windowBottom - edgeMargin;

        this.state.sectionPositions.forEach((section, index) => {
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

                if (index === this.state.sectionPositions.length - 1) {
                    // this is the last section and it is visible
                    bottomSectionVisible = true;
                }
            }
            else if (index === this.state.sectionPositions.length - 1) {
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
            activeSection = visibleSections[0].section;
            if (visibleSections[0].amount < 0.15 && visibleSections.length > 1) {
                // less than 15% of the first section is visible and we have more than 1 section,
                // select the next section
                activeSection = visibleSections[1].section;
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
                activeSection = bottomSection.section;
            }
        }

        if (activeSection === this.state.activeSection) {
            // no change
            return;
        }

        this.setState({
            activeSection
        });
    }

    render() {
        return (
            <div className="about-content-wrapper">
                <div className="about-sidebar">
                    <Sidebar
                        active={this.state.activeSection}
                        pageName="about"
                        sections={aboutSections}
                        jumpToSection={this.jumpToSection}
                        fixedStickyBreakpoint={StickyHeader.stickyHeaderHeight} />
                </div>
                <div className="about-content">
                    <div className="about-padded-content">
                        <Mission />
                        <Background />
                        <DataSources />
                        <DataQuality />
                        <Development />
                        <Licensing />
                        <MoreInfo />
                        <Contact />
                    </div>
                </div>
            </div>
        );
    }
}
