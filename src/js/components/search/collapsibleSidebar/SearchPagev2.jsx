/**
 * SearchPagev2.jsx
 * * Created by Andrea Blackwell November 4, 2024
 * **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { DownloadIconButton, ShareIcon, FlexGridCol } from 'data-transparency-ui';
import { Helmet } from 'react-helmet';
import { handleShareOptionClick, getBaseUrl } from 'helpers/socialShare';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import * as MetaTagHelper from 'helpers/metaTagHelper';
import FullDownloadModalContainer from 'containers/search/modals/fullDownload/FullDownloadModalContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import NoDownloadHover from '../header/NoDownloadHover';
import KeywordSearchLink from "../KeywordSearchLink";
import MobileFiltersV2 from "../mobile/MobileFiltersV2";
import SubawardDropdown from "../SubawardDropdown";
import { setSearchViewSubaward } from "../../../redux/actions/search/searchViewActions";
import ResultsView from "../newResultsView/ResultsView";
import CollapsibleSidebar from "./SidebarWrapper";
import PageFeatureFlag from "../../sharedComponents/PageFeatureFlag";

require('pages/search/searchPage.scss');


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
    const [searchv2, setSearchv2] = useState(null);
    const [fullSidebar, setFullSidebar] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

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

    const pluralizeFilterLabel = (count) => {
        if (count === 1) {
            return 'filter';
        }
        return 'filters';
    };

    useEffect(() => {
        setStateHash(hash);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash]);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 100);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    useEffect(() => {
        setSearchv2(true);
        setFullSidebar(<CollapsibleSidebar filters={filters} hash={hash} showMobileFilters={showMobileFilters} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageWrapper
            pageName="Advanced Search"
            classNames={`usa-da-search-page v2 ${showMobileFilters && sidebarOpen ? 'fixed-body' : ''}`}
            title="Advanced Search"
            metaTagProps={MetaTagHelper.getSearchPageMetaTags(stateHash)}
            toolBarComponents={[
                <SubawardDropdown size="sm" label="Filter by:" enabled setSearchViewSubaward={setSearchViewSubaward} selectedValue="prime" />,
                <ShareIcon
                    isEnabled
                    url={getBaseUrl(getSlugWithHash())}
                    onShareOptionClick={handleShare}
                    classNames={!isMobile ? "margin-right" : ""} />,
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
            <PageFeatureFlag>
                <div id="main-content">
                    <div className="search-contents v2">
                        <div className="full-search-sidebar">
                            {fullSidebar}
                            {isMobile === false && searchv2 === false ?
                                <KeywordSearchLink />
                                : ''}
                        </div>
                        <div className="mobile-filter-button-wrapper">
                            <button
                                className="mobile-filter-button-v2"
                                onClick={toggleMobileFilters}
                                onKeyUp={(e) => {
                                    if (e.key === "Escape" && showMobileFilters) {
                                        toggleMobileFilters();
                                    }
                                }}>
                                <div className="mobile-filter-button-content">
                                    <div className="mobile-filter-button-icon">
                                        <img
                                            className="usa-da-mobile-filter-icon"
                                            alt="Toggle filters"
                                            aria-label="Toggle filters"
                                            src="img/Add-search-filters-icon.svg" />
                                    </div>
                                    <div className="mobile-filter-button-label">
                                        {`Add search ${pluralizeFilterLabel(filterCount)}`}
                                    </div>
                                </div>
                            </button>
                        </div>
                        <FlexGridCol className={`mobile-search-sidebar-v2 ${sidebarOpen ? 'sidebar-opened' : ''}`}>
                            <MobileFiltersV2
                                filters={filters}
                                showMobileFilters={showMobileFilters}
                                setShowMobileFilters={setShowMobileFilters}
                                sidebarOpen={sidebarOpen}
                                setSidebarOpen={setSidebarOpen} />
                        </FlexGridCol>
                        <Helmet>
                            <link href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css" rel="stylesheet" />
                        </Helmet>
                        <div className="search-results-view-container">
                            <ResultsView
                                filters={filters}
                                isMobile={isMobile}
                                filterCount={filterCount}
                                showMobileFilters={showMobileFilters}
                                updateFilterCount={updateFilterCount}
                                requestsComplete={requestsComplete}
                                noFiltersApplied={noFiltersApplied}
                                hash={hash} />
                        </div>
                    </div>
                    <FullDownloadModalContainer
                        download={download}
                        mounted={showFullDownload}
                        hideModal={hideDownloadModal} />
                </div>
            </PageFeatureFlag>
        </PageWrapper>
    );
};

SearchPage.propTypes = propTypes;

export default SearchPage;
