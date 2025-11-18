/**
 * SearchPagev2.jsx
 * * Created by Andrea Blackwell November 4, 2024
 * **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash-es';
import { Helmet } from 'react-helmet';

import { mediumScreen } from '../../../dataMapping/shared/mobileBreakpoints';
import * as MetaTagHelper from '../../../helpers/metaTagHelper';
import FullDownloadModalContainer from
    '../../../containers/search/modals/fullDownload/FullDownloadModalContainer';
import PageWrapper from '../../../components/sharedComponents/PageWrapper';
import MobileFiltersV2 from "../mobile/MobileFiltersV2";
import ResultsView from "../resultsView/ResultsView";
import CollapsibleSidebar from "./SidebarWrapper";
import MobileFilterButton from "../MobileFilterButton";
import SearchPageToolBarComponents from "../SearchPageToolBarComponents";

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
     * Hides the full download modal
     */
    const hideDownloadModal = () => {
        setShowFullDownload(false);
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
        setFullSidebar(
            <CollapsibleSidebar
                filters={filters}
                hash={hash}
                showMobileFilters={showMobileFilters}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                searchv2={searchv2} />);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageWrapper
            pageName="Advanced Search"
            classNames={`usa-da-search-page v2 ${
                showMobileFilters && sidebarOpen ? 'fixed-body' : ''
            }`}
            title="Advanced Search"
            metaTagProps={MetaTagHelper.getSearchPageMetaTags(stateHash)}
            toolBarComponents={[
                <SearchPageToolBarComponents
                    downloadAvailable={downloadAvailable}
                    downloadInFlight={downloadInFlight}
                    isMobile={isMobile}
                    hash={hash}
                    setShowFullDownload={setShowFullDownload} />
            ]}
            filters={appliedFilters}>
            <div id="main-content">
                <div className="search-contents v2">
                    {fullSidebar}
                    <MobileFilterButton
                        filterCount={filterCount}
                        showMobileFilters={showMobileFilters}
                        sidebarOpen={sidebarOpen}
                        toggleMobileFilters={toggleMobileFilters} />
                    <MobileFiltersV2
                        filters={filters}
                        showMobileFilters={showMobileFilters}
                        setShowMobileFilters={setShowMobileFilters}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen} />
                    <Helmet>
                        <link
                            href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css"
                            rel="stylesheet" />
                    </Helmet>
                    <ResultsView
                        filters={filters}
                        isMobile={isMobile}
                        filterCount={filterCount}
                        showMobileFilters={showMobileFilters}
                        updateFilterCount={updateFilterCount}
                        requestsComplete={requestsComplete}
                        noFiltersApplied={noFiltersApplied}
                        hash={hash}
                        searchV2 />
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
