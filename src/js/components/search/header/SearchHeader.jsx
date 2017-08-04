/**
  * SearchHeader.jsx
  * Created by Kevin Li 11/10/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

import FormatItem from './FormatItem';
import DownloadButton from './DownloadButton';

const propTypes = {
    isSticky: PropTypes.bool,
    currentSection: PropTypes.string
};

const sectionList = ['time', 'rank', 'geo', 'table'];

export default class SearchHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSection: sectionList[0]
        };

        // the DOM state holds renderable DOM changes but exists outside of the React data lifecycle
        // to improve rendering speeds. it is instead tied to the browser's animation frames
        this.domState = {
            windowWidth: 0,
            windowHeight: 0,
            headerHeight: 0,
            headerViewTop: 0,
            stickyHeader: false,
            sections: []
        };

        this.measurePage = this.measurePage.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, {
            passive: true
        });
        window.addEventListener('resize', this.measurePage, {
            passive: true
        });

        this.measurePage();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.measurePage);
    }

    measurePage() {
        const measurements = {};
        measurements.windowHeight = window.innerHeight || document.documentElement.clientHeight
            || document.body.clientHeight;
        measurements.windowWidth = window.innerWidth || document.documentElement.clientWidth
            || document.body.clientWidth;

         // page and header height
        measurements.pageHeight = document.getElementById('main-content').offsetHeight;
        measurements.headerHeight = this.headerDiv.offsetHeight;

        // measure the header position on the page
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        // the document location is the current view position + the current scroll position
        measurements.headerTop = this.searchHeaderPlaceholder.getBoundingClientRect().top + scrollY;

        // now measure the positions of each section
        const sections = [];
        sectionList.forEach((sectionId) => {
            const section = document.getElementById(`results-section-${sectionId}`);
            const sectionTop = section.getBoundingClientRect().top + scrollY;
            sections.push(sectionTop);
        });
        measurements.sections = sections;

        // save the measurements
        this.domState = Object.assign({}, this.domState, measurements);

        // since the page has reshuffled, also treat it as a scroll event
        this.handleScroll();
    }

    handleScroll() {
        // measure the current page scroll location
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        let isSticky = false;

        // check if the header should be sticky or not
        if (scrollY >= this.domState.headerTop) {
            // the header should be sticky
            isSticky = true;
        }

        // determine which section we are in
        const activeSection = this.determineActiveSection(scrollY);

        if (isSticky !== this.domState.stickyHeader) {
            // the sticky style has changed, let's modify the DOM to add or remove the sticky style
            if (isSticky) {
                this.headerDiv.classList.add('sticky');
                // the placeholder div needs to take up the header's former height
                this.searchHeaderPlaceholder.style.height = `${this.domState.headerHeight}px`;
            }
            else {
                this.headerDiv.classList.remove('sticky');
                // remove the placeholder div's height
                this.searchHeaderPlaceholder.style.height = '0px';
            }

            // update the dom state
            this.domState.stickyHeader = isSticky;
        }

        // check if the active section has changed
        if (activeSection !== this.state.activeSection) {
            this.setState({
                activeSection
            });
        }
    }

    determineActiveSection(scrollY) {
        let lastY = -1;
        let index = 0;
        let activeSection = sectionList[0];
        for (const top of this.domState.sections) {
            if (scrollY === top) {
                activeSection = sectionList[index];
                break;
            }
            else if (scrollY > lastY && scrollY >= top) {
                activeSection = sectionList[index];
            }

            lastY = top;
            index += 1;
        }

        return activeSection;
    }

    render() {
        return (
            <div className="search-header-container">
                <div
                    className="search-header-placeholder"
                    ref={(div) => {
                        this.searchHeaderPlaceholder = div;
                    }} />
                <div
                    className="search-header-wrapper"
                    id="search-header-wrapper"
                    ref={(div) => {
                        this.headerDiv = div;
                    }}>
                    <div className="search-header">
                        <div className="search-title">
                            <h1>Search &amp; Download Data</h1>
                        </div>
                        <div className="search-options">
                            <ul className="search-formats">
                                <li>
                                    <FormatItem
                                        code="time"
                                        label="Time"
                                        currentSection={this.state.activeSection}
                                        accessibleLabel="Organize spending by time periods"
                                        icon={<Icons.Calendar alt="Time" />} />
                                </li>
                                <li>
                                    <FormatItem
                                        code="rank"
                                        label="Rank"
                                        currentSection={this.state.activeSection}
                                        accessibleLabel="Rank spending by category"
                                        icon={<Icons.Bar alt="Rank" />} />
                                </li>
                                <li>
                                    <FormatItem
                                        code="geo"
                                        label="Map"
                                        currentSection={this.state.activeSection}
                                        accessibleLabel="View spending on a map"
                                        icon={<Icons.MapMarker alt="Map Marker" />} />
                                </li>
                                <li>
                                    <FormatItem
                                        code="table"
                                        label="Table"
                                        currentSection={this.state.activeSection}
                                        accessibleLabel="View spending by award in a table"
                                        icon={<Icons.Table alt="Table Icon" />} />
                                </li>
                                <li>
                                    <DownloadButton />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SearchHeader.propTypes = propTypes;
