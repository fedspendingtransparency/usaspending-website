/**
 * SearchPagev2.jsx
 * * Created by Andrea Blackwell November 4, 2024
 * **/

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useDispatch } from "react-redux";
import useIsMobile from "hooks/useIsMobile";

import * as MetaTagHelper from 'helpers/metaTagHelper';
import FullDownloadModalContainer from
    'containers/search/modals/fullDownload/FullDownloadModalContainer';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { showModal } from "redux/actions/modal/modalActions";

import TooltipContext from "context/TooltipContext";
import MobileFiltersV2 from "../mobile/MobileFiltersV2";
import ResultsView from "../resultsView/ResultsView";
import CollapsibleSidebar from "./SidebarWrapper";
import MobileFilterButton from "../MobileFilterButton";
import searchPageToolBarComponents from "../SearchPageToolBarComponents";

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
    const [tooltipData, setTooltipData] = useState({
        top: 0, left: 0, display: 'none', tooltip: <></>
    });
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filterCount, setFilterCount] = useState(0);
    const [showFullDownload, setShowFullDownload] = useState(false);
    const [stateHash, setStateHash] = useState(hash);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const dispatch = useDispatch();
    const { isMedium } = useIsMobile();
    const searchContents = useRef();

    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };

    // Use the top filter bar container's internal filter parsing to track the current number of filters applied
    const updateFilterCount = (count) => {
        setFilterCount(count);
    };

    // Toggle whether or not to show the mobile filter view
    const toggleMobileFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    // Hides the full download modal
    const hideDownloadModal = () => {
        setShowFullDownload(false);
    };

    // Testing
    useEffect(() => {
        console.log(searchContents?.current?.clientHeight);
    }, [searchContents]);

    useEffect(() => {
        setStateHash(hash);
    }, [hash]);

    return (
        <PageWrapper
            pageName="Advanced Search"
            classNames={`usa-da-search-page v2 ${
                showMobileFilters && sidebarOpen ? 'fixed-body' : ''
            }`}
            title="Advanced Search"
            metaTagProps={MetaTagHelper.getSearchPageMetaTags(stateHash)}
            toolBarComponents={
                searchPageToolBarComponents(
                    isMedium,
                    downloadAvailable,
                    downloadInFlight,
                    hash,
                    setShowFullDownload,
                    handleShareDispatch
                )
            }
            filters={appliedFilters}>
            <div id="main-content">
                <div className="search-contents v2" ref={searchContents}>
                    <TooltipContext value={(tt) => setTooltipData(tt)}>
                        <CollapsibleSidebar
                            filters={filters}
                            hash={hash}
                            showMobileFilters={showMobileFilters}
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen} />
                    </TooltipContext>
                    <div
                        className="new-tooltip__tooltip-wrapper"
                        style={{
                            top: tooltipData.top,
                            left: tooltipData.left,
                            display: tooltipData.display
                        }}>
                        <div className="tooltip-wrapper">
                            <div className="tooltip-pointer" />
                            {tooltipData.tooltip}
                        </div>
                    </div>
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
                        isMobile={isMedium}
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
