/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isCancel } from 'axios';
import PropTypes from "prop-types";
import useIsMobile from "hooks/useIsMobile";
import { restoreHashedFilters } from 'redux/actions/search/searchHashActions';
import { restoreUrlHash, parseRemoteFilters, searchURLParams } from "helpers/searchHelper";

import SidebarContent from "./SidebarContent";
import MobileSidebarContent from "./MobileSidebarContent";
import NLSidebarButtons from "./NLSidebarButtons";
import AboutTheDataLink from "components/sharedComponents/AboutTheDataLink";
import NLSidebarContent from "./NLSidebarContent";
import { FILTERS } from './SidebarConstants';
import useRequestNLSearch from "./useRequestNLSearch";
import { setIsNLSearchComplete } from '../../../redux/actions/sidebar/sidebarActions';

const propTypes = {
    showMobileFilters: PropTypes.bool,
    setShowMobileFilters: PropTypes.func,
    mobileSidebarContent: PropTypes.string,
    sidebarIsOpen: PropTypes.bool,
    setSidebarIsOpen: PropTypes.func
    
}

// eslint-disable-next-line prefer-arrow-callback
const SidebarWrapper = React.memo(function SidebarWrapper({
    showMobileFilters, 
    setShowMobileFilters, 
    mobileSidebarContent, 
    sidebarIsOpen, 
    setSidebarIsOpen
}) {
    const { isMedium } = useIsMobile();
    const sidebarContent = useSelector((state) => state.sidebar.sidebarContent);
    const isSearchActive = useSelector((state) => state.sidebar.isSearchActive);
    const isNLSearchComplete = useSelector((state) => state.sidebar.isNLSearchComplete);
    const [text, setText] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isDesktopFilters = sidebarContent === FILTERS;
    const isMobileFilters = mobileSidebarContent === FILTERS;

    const { data, refetch, cancelQuery, isFetching } = useRequestNLSearch(text);

    const parsedData = data?.split('\n')
            .filter((line) => line.trim() !== '')
            .map((line) => JSON.parse(line));

    const toggleOpened = (e) => {
        e.preventDefault();
        setSidebarIsOpen((prevState) => !prevState);
    };

    const closeSidebar = () => {
        if (isMedium) {
            setShowMobileFilters(false);
        } else {
            setSidebarIsOpen(false);
        }
    }

    const keyHandler = (e, func) => {
        if (e.key === "Enter") {
            func(e);
        }
    };

    const hintOnClick = (e) => {
        if(e?.target.textContent) {
            setText(e.target.textContent);
        }
    };

    const startNLSearch = () => {
        if(text && typeof refetch === "function") {
            refetch();
        }
    }

    const request = useRef();

    useEffect(() => {
        if (isFetching) {
            content = (
                <div className="search-results-loading">
                    <div className="search-results__loading-message">
                        <LoadingSpinner />
                        <div className="loading-text">
                            Please wait while we load your results
                        </div>
                    </div>
                </div>
            );
        }
        if (!isFetching && parsedData && Object.keys(parsedData).length > 0) {
            const done = parsedData.find((res) => {
                if (res.type === "search_complete") {
                    return res;
                }
            });

            if (done?.result) {
                // const nlHash = '90e50821bf552b36f20c74de96262d27';  // For testing purposes while NL is under development
                const nlHash = done.result;
                if (request.current) {
                    request.current.cancel();
                }

                request.current = restoreUrlHash({
                    hash: nlHash
                });

                request.current.promise
                    .then((res) => {
                        const filtersInImmutableStructure = parseRemoteFilters(res.data.filter);

                        if (filtersInImmutableStructure) {
                            // apply the filters to both the staged and applied stores
                            dispatch(restoreHashedFilters(filtersInImmutableStructure));
                            dispatch(setIsNLSearchComplete(!isFetching));
                        }
                        else {
                            console.error('Error fetching filters from hash');
                            // TODO: corrupt hash redirect to error page.
                            // No such page as /hash-error, need to update
                            navigate("/hash-error", { replace: true });
                            dispatch(setIsNLSearchComplete(!isFetching));
                        }
                        request.current = null;
                    })
                    .catch((err) => {
                        if (!isCancel(err)) {
                            console.error('Error fetching filters from hash: ', err);
                            // remove hash since corresponding filter selections aren't retrievable.
                            request.current = null;
                            dispatch(setIsNLSearchComplete(!isFetching));
                        }
                    });
            }
        }
    }, [parsedData, isFetching]);

    const renderDesktopSidebar = () => (
        <div className="collapsible-sidebar-header">
            <div className="sidebar-title-row">
                <h2 className="sidebar-title">
                    {isDesktopFilters ? 'Filter' : 'Smart Assist'}
                </h2>
                <div
                    onClick={toggleOpened}
                    onKeyDown={(e) => {
                        keyHandler(e, toggleOpened);
                    }}
                    role="button"
                    className="sidebar-close"
                    aria-label="Close"
                    tabIndex={0}>
                    <FontAwesomeIcon className="close" icon="close" />
                </div>    
            </div>

            { isDesktopFilters ? (
                <>
                    <div className="link">
                        <AboutTheDataLink slug="data-elements">
                                Learn more about filters
                        </AboutTheDataLink>
                    </div>
                    <SidebarContent />
                </>
            ): (
                <NLSidebarContent
                    hintOnClick={hintOnClick}
                    text={text}
                    setText={setText}
                    startNLSearch={startNLSearch} 
                    data={parsedData}
                    cancelQuery={cancelQuery} />
            )}   
        </div>    
    );

    const renderMobileSidebar = () => (
        <div className={`collapsible-sidebar-header ${isMobileFilters ? "" : "is-nl"}`}>
            <div className="sidebar-title-row">
                <h2 className="sidebar-title">
                    {isMobileFilters ? 'Filter' : 'Smart Assist'}
                </h2>
                <div
                    onClick={closeSidebar}
                    onKeyDown={(e) => {
                        keyHandler(e, closeSidebar);
                    }}
                    role="button"
                    className="sidebar-close"
                    aria-label="Close"
                    tabIndex={0}>
                    <FontAwesomeIcon className="close" icon="close" />
                </div>    
            </div>

            { isMobileFilters ? (
                <>
                    <div className="link">
                        <AboutTheDataLink slug="data-elements">
                                Learn more about filters
                        </AboutTheDataLink>
                    </div>
                    <MobileSidebarContent 
                        setShowMobileFilters={setShowMobileFilters} 
                        mobileSidebarContent={mobileSidebarContent} 
                        showMobileFilters={showMobileFilters}/>  
                </>
            ): (
                <NLSidebarContent
                    hintOnClick={hintOnClick}
                    text={text}
                    setText={setText}
                    startNLSearch={startNLSearch} 
                    data={parsedData}
                    cancelQuery={cancelQuery} />
            )}
        </div>
    );
    
    return (
        <>
            <NLSidebarButtons
                sidebarContent={sidebarContent}
                setSidebarIsOpen={toggleOpened}
                sidebarIsOpen={sidebarIsOpen}
                isMedium={isMedium} 
                setShowMobileFilters={setShowMobileFilters}
                isActiveNlSearch={isSearchActive && !isNLSearchComplete} />
            {/* Eventually remove search-sidebar css */}
            <div
                className={`search-collapsible-sidebar-container search-sidebar sticky ${
                    sidebarIsOpen || showMobileFilters ? "opened" : ""
                } ${
                    showMobileFilters ? "mobile" : ""}`
                }>
                
                { isMedium 
                    ? showMobileFilters && renderMobileSidebar()
                    : sidebarIsOpen && renderDesktopSidebar()
                }
            </div>
        </> 
    );                 
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
