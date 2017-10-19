/**
 * SearchPage.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import SearchHeader from './header/SearchHeader';
import SearchSidebar from './SearchSidebar';
import SearchResults from './SearchResults';

const propTypes = {
    clearAllFilters: PropTypes.func,
    filters: PropTypes.object,
    lastUpdate: PropTypes.string
};

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.sections = ['time', 'rank', 'geo', 'table'];

        this.state = {
            currentSection: this.sections[0],
            stickyHeader: false,
            showMobileFilters: false,
            filterCount: 0,
            isMobile: false
        };

        // also track the window size, but track it outside of state to avoid re-renders
        this.windowWidth = window.innerWidth;

        // throttle the ocurrences of the scroll callback to once every 50ms
        this.handlePageScroll = throttle(this.handlePageScroll.bind(this), 50);

        this.updateFilterCount = this.updateFilterCount.bind(this);
        this.toggleMobileFilters = this.toggleMobileFilters.bind(this);
    }

    componentDidMount() {
        // watch the page for scroll and resize events
        window.addEventListener('scroll', this.handlePageScroll);
        window.addEventListener('resize', this.handlePageScroll);

        this.handleWindowResize();
    }

    componentWillUnmount() {
        // stop observing scroll and resize events
        window.removeEventListener('scroll', this.handlePageScroll);
        window.removeEventListener('resize', this.handlePageScroll);
    }

    handlePageScroll() {
        this.manageHeaders();
        this.highlightSection();
        this.handleWindowResize();
    }

    handleWindowResize() {
        if (window.innerWidth < 992 && !this.state.isMobile) {
            this.setState({
                isMobile: true
            });
        }
        else if (window.innerWidth >= 992 && this.state.isMobile) {
            this.setState({
                isMobile: false
            });
        }
    }

    /**
     * Track the positions of the search header and the top filter bar within the window and
     * determine if they should be stickied or unstickied.
     */
    manageHeaders() {
        // don't do anything on mobile
        if (this.state.isMobile) {
            return;
        }

        // don't do anything if there's not enough content to have a fixed header based on the
        // current window size
        const windowHeight = window.innerHeight;
        const pageHeight = this.pageDiv.offsetHeight;
        const headerHeight = this.searchHeader.headerDiv.offsetHeight;
        if (pageHeight - windowHeight < (2 * headerHeight)) {
            return;
        }

        // we have to observe the placeholder positions since the actual divs could be fixed to the
        // window
        const headerRect = this.searchHeaderPlaceholder.getBoundingClientRect();
        const newState = {};
        let updateState = false;

        // determine if the search header needs to be stickied
        if (headerRect.top <= 0 && !this.state.stickyHeader) {
            // header has reached the top of the window
            // make the header sticky
            newState.stickyHeader = true;
            updateState = true;
        }
        else if (headerRect.top > 0 && this.state.stickyHeader) {
            // unstick the header
            newState.stickyHeader = false;
            updateState = true;
        }

        // only update the state if changes have occurred, to minimize on re-renders
        if (updateState) {
            this.setState(newState, () => {
                this.displayPlaceholders();
            });
        }
    }

    /**
     * When the search header becomes fixed positioned, a placeholder div will take its old position
     * on the page to maintain scroll position continuity. This is because the content height that
     * used to be taken up by the search header becomes 0 when the search header is pulled out of
     * the content flow into a fixed window position.
     */
    displayPlaceholders() {
        if (this.state.stickyHeader) {
            // display the header placeholder
            this.searchHeaderPlaceholder.style.visibility = 'visible';
            // placeholder height needs to match the actual header div height
            this.searchHeaderPlaceholder.style.height =
                `${this.searchHeader.headerDiv.offsetHeight}px`;
        }
        else {
            // unfix the header and hide the placeholder
            this.searchHeaderPlaceholder.style.visibility = 'hidden';
            this.searchHeaderPlaceholder.style.height = '0px';
        }
    }

    /**
     * Determine what the current section of the search results page is most in view and highlight
     * that section's icon as the current section
     */

    highlightSection() {
        const headerPosition = this.searchHeader.headerDiv.getBoundingClientRect();
        const headerHeight = this.searchHeader.headerDiv.offsetHeight;
        // determine the current bottom position of the header bar
        const viewTop = headerPosition.top + headerHeight + window.pageYOffset;
        const viewBottom = window.pageYOffset + window.innerHeight;

        // add a bias to the next section
        const nextSectionBias = 50;

        const topSection = this.sections[0];
        const bottomSection = this.sections[this.sections.length - 1];

        let currentSection = topSection;

        for (const section of this.sections) {
            // get the DOM element for the section
            const sectionDiv = document.querySelector(`#results-section-${section}`);
            if (!sectionDiv) {
                // DOM element doesn't exist, skip it
                continue;
            }

            // determine its position
            const sectionTop = sectionDiv.getBoundingClientRect().top + nextSectionBias;
            const sectionBottom = sectionTop + sectionDiv.offsetHeight + nextSectionBias;

            // check to see if it is within view
            if ((sectionTop >= viewTop && sectionTop <= viewBottom) ||
                (sectionBottom >= viewTop && sectionBottom <= viewBottom)) {
                currentSection = section;
                break;
            }

            if (section === bottomSection && viewTop >= sectionTop) {
                // we're past the bottom of the page, default to the bottom section
                currentSection = bottomSection;
            }
        }

        if (currentSection !== this.state.currentSection) {
            // don't update while we're in the same section to avoid new renders
            this.setState({
                currentSection
            });
        }
    }

    /**
     * Use the top filter bar container's internal filter parsing to track the current number of
     * filters applied
     */

    updateFilterCount(count) {
        this.setState({
            filterCount: count
        });
    }

    /**
     * Toggle whether or not to show the mobile filter view
     */

    toggleMobileFilters() {
        this.setState({
            showMobileFilters: !this.state.showMobileFilters
        });
    }

    render() {
        let fullSidebar = (<SearchSidebar filters={this.props.filters} />);
        if (this.state.isMobile) {
            fullSidebar = null;
        }

        return (
            <div
                className="usa-da-search-page"
                ref={(div) => {
                    this.pageDiv = div;
                }}>
                <MetaTags {...MetaTagHelper.searchPageMetaTags} />
                <Header />
                <main id="main-content">
                    <div
                        className="search-header-placeholder"
                        ref={(div) => {
                            this.searchHeaderPlaceholder = div;
                        }} />
                    <SearchHeader
                        isSticky={this.state.stickyHeader}
                        currentSection={this.state.currentSection}
                        ref={(component) => {
                            this.searchHeader = component;
                        }} />
                    <div className="search-contents">
                        <div className="full-search-sidebar">
                            { fullSidebar }
                        </div>
                        <SearchResults
                            filters={this.props.filters}
                            isMobile={this.state.isMobile}
                            filterCount={this.state.filterCount}
                            showMobileFilters={this.state.showMobileFilters}
                            updateFilterCount={this.updateFilterCount}
                            toggleMobileFilters={this.toggleMobileFilters}
                            clearAllFilters={this.props.clearAllFilters}
                            lastUpdate={this.props.lastUpdate} />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

}

SearchPage.propTypes = propTypes;
