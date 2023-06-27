/**
 * SearchPage.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { DownloadIconButton, ShareIcon } from 'data-transparency-ui';
import { Helmet } from 'react-helmet';
import { handleShareOptionClick, getBaseUrl } from 'helpers/socialShare';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import FullDownloadModalContainer from 'containers/search/modals/fullDownload/FullDownloadModalContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';

import SearchSidebar from './SearchSidebar';
import SearchResults from './SearchResults';
import NoDownloadHover from './header/NoDownloadHover';
import KeywordSearchLink from "./KeywordSearchLink";

const propTypes = {
    download: PropTypes.object,
    clearAllFilters: PropTypes.func,
    filters: PropTypes.object,
    appliedFilters: PropTypes.object,
    downloadAvailable: PropTypes.bool,
    downloadInFlight: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    noFiltersApplied: PropTypes.bool,
    hash: PropTypes.string,
    showAboutTheDataIcon: PropTypes.bool
};

const slug = 'search/';
const emailSubject = 'Award Search results on USAspending.gov';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMobileFilters: false,
            filterCount: 0,
            isMobile: false,
            showFullDownload: false,
            hash: props.hash
        };

        // throttle the occurrences of the scroll callback to once every 50ms
        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);

        this.updateFilterCount = this.updateFilterCount.bind(this);
        this.toggleMobileFilters = this.toggleMobileFilters.bind(this);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
    // watch the page for scroll and resize events
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.hash !== this.props.hash) {
            this.state.hash = this.props.hash;
        }
    }

    componentWillUnmount() {
    // stop observing scroll and resize events
        window.removeEventListener('resize', this.handleWindowResize);
    }


    getSlugWithHash() {
        if (this.props.hash) {
            return `${slug}?hash=${this.props.hash}`;
        }
        return slug;
    }

    handleShare = (name) => {
        handleShareOptionClick(name, this.getSlugWithHash(), {
            subject: emailSubject,
            body: `View search results for federal awards on USAspending.gov:  ${getBaseUrl(this.getSlugWithHash())}`
        });
    };

    handleWindowResize() {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth
            || document.body.clientWidth;

        if (windowWidth < 992 && !this.state.isMobile) {
            this.setState({
                isMobile: true
            });
        }
        else if (windowWidth >= 992 && this.state.isMobile) {
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

    /**
     * Shows the full download modal
     */

    showModal() {
        this.setState({
            showFullDownload: true
        });
    }

    /**
     * Hides the full download modal
     */

    hideModal() {
        this.setState({
            showFullDownload: false
        });
    }

    render() {
        let fullSidebar = (
            <SearchSidebar
                filters={this.props.filters}
                hash={this.props.hash} />
        );
        if (this.state.isMobile) {
            fullSidebar = null;
        }

        return (
            <PageWrapper
                pageName="Advanced Search"
                classNames="usa-da-search-page"
                title="Advanced Search"
                metaTagProps={MetaTagHelper.getSearchPageMetaTags(this.state.hash)}
                toolBarComponents={[
                    <ShareIcon
                        isEnabled
                        url={getBaseUrl(this.getSlugWithHash())}
                        onShareOptionClick={this.handleShare} />,
                    <DownloadIconButton
                        tooltipComponent={(!this.props.downloadAvailable && this.props.hash)
                            ? <NoDownloadHover />
                            : null
                        }
                        isEnabled={this.props.downloadAvailable}
                        downloadInFlight={this.props.downloadInFlight}
                        onClick={this.showModal} />
                ]}
                filters={this.props.appliedFilters}>
                <div id="main-content">
                    <div className="search-contents">
                        <div className="full-search-sidebar">
                            { fullSidebar }
                            {this.state.isMobile === false ?
                                <KeywordSearchLink />
                                : '' }
                        </div>
                        <Helmet>
                            <link href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css" rel="stylesheet" />
                        </Helmet>
                        <SearchResults
                            filters={this.props.filters}
                            isMobile={this.state.isMobile}
                            filterCount={this.state.filterCount}
                            showMobileFilters={this.state.showMobileFilters}
                            updateFilterCount={this.updateFilterCount}
                            toggleMobileFilters={this.toggleMobileFilters}
                            requestsComplete={this.props.requestsComplete}
                            noFiltersApplied={this.props.noFiltersApplied} />
                    </div>
                    <FullDownloadModalContainer
                        download={this.props.download}
                        mounted={this.state.showFullDownload}
                        hideModal={this.hideModal} />
                </div>
            </PageWrapper>
        );
    }
}

SearchPage.propTypes = propTypes;
