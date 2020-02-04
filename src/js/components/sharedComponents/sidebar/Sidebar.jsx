/**
 * Sidebar.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import FYPicker from 'components/state/RecipientFYPicker';
import SidebarLink from './SidebarLink';

const propTypes = {
    active: PropTypes.string,
    pageName: PropTypes.string,
    sections: PropTypes.array,
    jumpToSection: PropTypes.func,
    stickyHeaderHeight: PropTypes.number,
    fyPicker: PropTypes.bool,
    selectedFy: PropTypes.string,
    pickedYear: PropTypes.func,
    detectActiveSection: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};

const defaultProps = {
    detectActiveSection: false
};

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldFloat: false,
            sidebarWidth: 0,
            floatPoint: 0,
            sectionPositions: [],
            window: {
                height: 0
            }
        };

        this.lastY = null;
        this.floatSideBarVertical = throttle(this.floatSideBarVertical.bind(this), 16);
        this.measureSidebarWidth = this.measureSidebarWidth.bind(this);
        this.highlightCurrentSection = throttle(this.highlightCurrentSection.bind(this), 100);
        this.cacheSectionPositions = throttle(this.cacheSectionPositions.bind(this), 100);
    }

    componentDidMount() {
        this.measureSidebarWidth();
        if (this.props.detectActiveSection) {
            this.cacheSectionPositions();
        }
        window.addEventListener('scroll', this.floatSideBarVertical);
        window.addEventListener('resize', this.measureSidebarWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.floatSideBarVertical);
        window.removeEventListener('resize', this.measureSidebarWidth);
    }

    cacheSectionPositions() {
        // it is expensive to measure the DOM elements on every scroll, so measure them upfront
        // (and when the window resizes) and cache the values
        const sectionPositions = this.props.sections.map((section) => {
            const sectionCode = section.section;
            const domElement = document.getElementById(`${this.props.pageName}-${sectionCode}`);
            if (!domElement) {
                // couldn't find the element
                return null;
            }

            const topPos = domElement.offsetTop;
            const bottomPos = domElement.offsetHeight + topPos;

            return {
                section: sectionCode,
                top: topPos,
                bottom: bottomPos
            };
        });

        const windowHeight = window.innerHeight
            || document.documentElement.clientHeight || document.body.clientHeight;

        this.setState({
            sectionPositions,
            window: {
                height: windowHeight
            }
        });
    }

    measureSidebarWidth() {
        // measure the reference div
        let targetElement = this.referenceDiv;
        if (!this.state.shouldFloat) {
            // sidebar isn't floating, so measure that instead
            targetElement = this.div;
        }

        const width = targetElement.offsetWidth;
        // also measure the Y position at which to float the sidebar
        // Subtract the height of the absolutely-positioned sticky header
        const floatPoint = targetElement.offsetTop - 30 - this.props.stickyHeaderHeight;

        this.setState({
            floatPoint,
            sidebarWidth: width
        }, () => {
            if (this.state.shouldFloat) {
                // when the sidebar floats it calls outside of the grid layout, so
                // programmatically force it to the correct width
                this.div.style.width = `${width}px`;
            }
            else {
                this.div.style.width = 'auto';
            }
            if (this.props.detectActiveSection) {
                this.cacheSectionPositions();
            }
        });
    }

    highlightCurrentSection() {
        console.log("HighlightCurrentSection fired", this.props.active);
        const windowTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowBottom = windowTop + this.state.window.height;

        // determine the section to highlight
        let activeSection = this.props.active;
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
        this.props.detectActiveSection(activeSection);
    }

    floatSideBarVertical() {
        // check where the sidebar is in the viewport
        if (!this.div || !this.referenceDiv) {
            // the DOM element is missing!
            return;
        }

        let shouldFloat = false;
        const yPos = window.scrollY || window.pageYOffset;
        if (yPos > this.state.floatPoint) {
            // it needs to float because the sidebar is less than 60px from the top or out of view
            shouldFloat = true;
        }

        if (shouldFloat !== this.state.shouldFloat) {
            this.setState({
                shouldFloat
            }, () => {
                if (shouldFloat) {
                    // when the sidebar floats it calls outside of the grid layout, so
                    // programmatically force it to the correct width
                    this.div.style.width = `${this.state.sidebarWidth}px`;
                }
            });
        }

        if (this.props.detectActiveSection) {
            this.highlightCurrentSection();
        }
    }

    render() {
        const items = this.props.sections.map((section) => {
            let link = (
                <SidebarLink
                    section={section.section}
                    label={section.label}
                    active={this.props.active}
                    onClick={this.props.jumpToSection} />
            );
            if (section.url) {
                const active = this.props.active === section.section ? 'active' : '';
                link = (
                    <a
                        className={`sidebar-link ${active}`}
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
        });

        let floatSidebar = '';
        if (this.state.shouldFloat) {
            floatSidebar = 'float-sidebar';
        }

        let fyPicker = null;
        if (this.props.fyPicker) {
            fyPicker = (
                <FYPicker
                    selectedFy={this.props.selectedFy}
                    pickedYear={this.props.pickedYear} />
            );
        }

        return (
            <div>
                <div
                    className={`${this.props.pageName}-sidebar-reference ${floatSidebar}`}
                    ref={(div) => {
                        // this is an empty div that does not float with the page so we can track
                        // the inline/non-floating Y position of the sidebar
                        this.referenceDiv = div;
                    }}>
                    &nbsp;
                </div>
                <div
                    className={`${this.props.pageName}-sidebar-content ${floatSidebar}`}
                    ref={(div) => {
                        this.div = div;
                    }}>
                    {fyPicker}
                    <ul>
                        { items }
                    </ul>
                </div>
            </div>
        );
    }
}

Sidebar.defaultProps = defaultProps;
Sidebar.propTypes = propTypes;
