/**
 * SearchPage.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { DownloadIconButton, ShareIcon } from 'data-transparency-ui';
import { Helmet } from 'react-helmet';
import { handleShareOptionClick, getBaseUrl } from 'helpers/socialShare';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { AddFilter } from 'components/sharedComponents/icons/Icons';
import * as MetaTagHelper from 'helpers/metaTagHelper';
import FullDownloadModalContainer from 'containers/search/modals/fullDownload/FullDownloadModalContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import SearchSidebar from './SearchSidebar';
import SearchResults from './SearchResults';
import NoDownloadHover from './header/NoDownloadHover';
import KeywordSearchLink from "./KeywordSearchLink";
import MobileFilters from "./mobile/MobileFilters";
import SubawardDropdown from "./visualizations/SubawardDropdown";
import { setSearchViewSubaward } from "../../redux/actions/search/searchViewActions";

const propTypes = {
    download: PropTypes.object,
    filters: PropTypes.object,
    appliedFilters: PropTypes.object,
    downloadAvailable: PropTypes.bool,
    downloadInFlight: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    noFiltersApplied: PropTypes.bool,
    hash: PropTypes.string
};

// comment here
const slug = 'search/';
const emailSubject = 'Award Search results on USAspending.gov';

const SearchPage = ({
    download,
    filters,
    appliedFilters,
    downloadAvailable,
    downloadInFlight,
    requestsComplete,
    noFiltersApplied,
    hash
}) => {
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filterCount, setFilterCount] = useState(0);
    const [showFullDownload, setShowFullDownload] = useState(false);
    const [stateHash, setStateHash] = useState(hash);
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const getSlugWithHash = () => {
        if (hash) {
            return `${slug}?hash=${hash}`;
        }
        return slug;
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, getSlugWithHash(), {
            subject: emailSubject,
            body: `View search results for federal awards on USAspending.gov:  ${getBaseUrl(getSlugWithHash())}`
        });
    };

    /**
     * Use the top filter bar container's internal filter parsing to track the current number of
     * filters applied
     */
    const updateFilterCount = (count) => {
        setFilterCount(count);
    };

    /**
     * Toggle whether or not to show the mobile filter view
     */
    const toggleMobileFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    /**
     * Shows the full download modal
     */
    const showDownloadModal = () => {
        setShowFullDownload(true);
    };

    /**
     * Hides the full download modal
     */
    const hideDownloadModal = () => {
        setShowFullDownload(false);
    };

    let fullSidebar = (
        <SearchSidebar
            filters={filters}
            hash={hash} />
    );
    if (isMobile) {
        fullSidebar = null;
    }

    const pluralizeFilterLabel = (count) => {
        if (count === 1) {
            return 'Filter';
        }
        return 'Filters';
    };

    let showCountBadge = '';
    if (filterCount === 0) {
        showCountBadge = 'hide';
    }

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    useEffect(() => {
        setStateHash(hash);
    }, [hash]);

    return (
        <PageWrapper
            pageName="Advanced Search"
            classNames="usa-da-search-page"
            title="Advanced Search"
            metaTagProps={MetaTagHelper.getSearchPageMetaTags(stateHash)}
            toolBarComponents={[
                <SubawardDropdown size="sm" label="Filter by:" enabled setSearchViewSubaward={setSearchViewSubaward} selectedValue="prime" />,
                <ShareIcon
                    isEnabled
                    url={getBaseUrl(getSlugWithHash())}
                    onShareOptionClick={handleShare} />,
                <DownloadIconButton
                    tooltipPosition="left"
                    tooltipComponent={(!downloadAvailable && hash)
                        ? <NoDownloadHover />
                        : null
                    }
                    isEnabled={downloadAvailable}
                    downloadInFlight={downloadInFlight}
                    onClick={showDownloadModal} />
            ]}
            filters={appliedFilters}>
            <div id="main-content">
                <div className="search-contents">
                    <div className="full-search-sidebar">
                        { fullSidebar }
                        {isMobile === false ?
                            <KeywordSearchLink />
                            : '' }
                    </div>
                    <div className="mobile-filter-button-wrapper">
                        <button
                            className="mobile-filter-button"
                            onClick={toggleMobileFilters}>
                            <div className="mobile-filter-button-content">
                                <div className={`mobile-filter-button-count ${showCountBadge}`}>
                                    {filterCount}
                                </div>
                                <div className="mobile-filter-button-icon">
                                    <AddFilter alt="Toggle filters" />
                                </div>
                                <div className="mobile-filter-button-label">
                                    {pluralizeFilterLabel(filterCount)}
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="mobile-search-sidebar">
                        <MobileFilters
                            filters={filters}
                            filterCount={filterCount}
                            showMobileFilters={showMobileFilters}
                            toggleMobileFilters={toggleMobileFilters} />
                    </div>
                    <Helmet>
                        <link href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css" rel="stylesheet" />
                    </Helmet>
                    <SearchResults
                        filters={filters}
                        isMobile={isMobile}
                        filterCount={filterCount}
                        showMobileFilters={showMobileFilters}
                        updateFilterCount={updateFilterCount}
                        toggleMobileFilters={toggleMobileFilters}
                        requestsComplete={requestsComplete}
                        noFiltersApplied={noFiltersApplied} />
                </div>
                <FullDownloadModalContainer
                    download={download}
                    mounted={showFullDownload}
                    hideModal={hideDownloadModal} />
            </div>
        </PageWrapper>
    );
};

SearchPage.propTypes = propTypes;
export default SearchPage;
