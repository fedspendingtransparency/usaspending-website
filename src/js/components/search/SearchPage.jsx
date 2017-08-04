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
    clearAllFilters: PropTypes.func
};

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMobileFilters: false,
            filterCount: 0,
            isMobile: false
        };

        // throttle the ocurrences of the scroll callback to once every 50ms
        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);

        this.updateFilterCount = this.updateFilterCount.bind(this);
        this.toggleMobileFilters = this.toggleMobileFilters.bind(this);
    }

    componentDidMount() {
        // watch the page for scroll and resize events
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    }

    componentWillUnmount() {
        // stop observing scroll and resize events
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth
            || document.body.clientWidth;

        if (windowWidth < 768 && !this.state.isMobile) {
            this.setState({
                isMobile: true
            });
        }
        else if (windowWidth >= 768 && this.state.isMobile) {
            this.setState({
                isMobile: false
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
        let fullSidebar = (<SearchSidebar />);
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
                    <SearchHeader />
                    <div className="search-contents">
                        <div className="full-search-sidebar">
                            { fullSidebar }
                        </div>
                        <SearchResults
                            isMobile={this.state.isMobile}
                            filterCount={this.state.filterCount}
                            showMobileFilters={this.state.showMobileFilters}
                            updateFilterCount={this.updateFilterCount}
                            toggleMobileFilters={this.toggleMobileFilters}
                            clearAllFilters={this.props.clearAllFilters} />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

}

SearchPage.propTypes = propTypes;
