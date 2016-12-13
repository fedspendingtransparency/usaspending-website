/**
 * SearchPage.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import _ from 'lodash';

import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import SearchHeader from './header/SearchHeader';
import SearchSidebar from './SearchSidebar';
import SearchResults from './SearchResults';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.sections = ['time', 'map', 'rank', 'table'];
        this.headerBottom = 0;

        this.state = {
            currentSection: this.sections[0],
            stickyHeader: false,
            stickyTopFilterBar: false
        };

        this.handlePageScroll = _.throttle(this.handlePageScroll.bind(this), 50);
    }
    componentDidMount() {
        // watch the page for scroll events
        window.addEventListener('scroll', this.handlePageScroll);

        this.headerBottom = this.searchHeader.headerDiv.getBoundingClientRect().top
            + this.searchHeader.headerDiv.offsetHeight;
    }

    componentWillUnmount() {
        // stop observing scroll events
        window.removeScrollEventListener('scroll', this.handlePageScroll);
    }

    handlePageScroll() {
        this.manageHeaders();
        this.highlightSection();
    }

    manageHeaders() {
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
        // cheat and access the DOM for the top filter bar element because it is nested too far down
        const contentRect = document.querySelector('#search-top-filter-bar-placeholder')
            .getBoundingClientRect();
        const headerRect = this.searchHeaderPlaceholder.getBoundingClientRect();
        const newState = {};
        let updateState = false;

        // determine which items need to be stickied
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

        if (contentRect.top <= headerHeight && !this.state.stickyTopFilterBar) {
            // make the top filter bar sticky
            newState.stickyTopFilterBar = true;
            updateState = true;
        }
        else if (contentRect.top > headerHeight && this.state.stickyTopFilterBar) {
            // unstick the top filter bar
            newState.stickyTopFilterBar = false;
            updateState = true;
        }

        if (updateState) {
            this.setState(newState, () => {
                this.displayPlaceholders();
            });
        }
    }

    displayPlaceholders() {
        // when an item becomes fixed positioned, a placeholder div will take its old position
        // on the page to remain scroll position continuity

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

    highlightSection() {
        // iterate through the sections and determine which one we are in

        // determine the current bottom position of the header bar
        const visibleTop = this.headerBottom;
        // add a bias to the next section
        const nextSectionBias = 50;

        let topSection = 'time';

        for (const section of this.sections) {
            const sectionDiv = document.querySelector(`#results-section-${section}`);
            if (sectionDiv) {
                // not all sections may exist
                const sectionTop = sectionDiv.getBoundingClientRect().top - visibleTop
                    - nextSectionBias;
                const sectionBottom = sectionDiv.offsetHeight + sectionTop;

                if (sectionTop >= 0 || sectionBottom >= 0) {
                    // the section is in view
                    topSection = section;
                    break;
                }
            }
        }

        if (topSection !== this.state.currentSection) {
            // don't update while we're in the same section to avoid new renders
            this.setState({
                currentSection: topSection
            });
        }
    }

    render() {
        return (
            <div
                className="usa-da-search-page"
                ref={(div) => {
                    this.pageDiv = div;
                }}>
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
                        <SearchSidebar />
                        <SearchResults isSticky={this.state.stickyTopFilterBar} />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

}
