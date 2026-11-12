/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import useIsMobile from 'hooks/useIsMobile';
import { restoreHashedFilters } from 'redux/actions/search/searchHashActions';

import SidebarContent from './SidebarContent';
import MobileSidebarContent from './MobileSidebarContent';
import NLSidebarButtons from './NLSidebarButtons';
import AboutTheDataLink from 'components/sharedComponents/AboutTheDataLink';
import NLSidebarContent from './NLSidebarContent';
import { FILTERS } from './SidebarConstants';
import Analytics from '../../../helpers/analytics/Analytics';
import useRequestNLSearch from './useRequestNLSearch';
import { RESPONSE_TYPE, NL_INPUT_MAX_CHARS, QUERY_ASSISTANT_VERDICT, QUERY_ASSISTANT_STATUS } from './NLConstants';
import useQueryAssistant from './useQueryAssistant';
import { sanitizeNLInput } from 'helpers/search/naturalLanguage/sanitizeNLInput';
import { setIsNLSearchComplete, setIsNLSearchError, setIsSearchActive } from '../../../redux/actions/sidebar/sidebarActions';
import useFetchDataFromHash from './useFetchDataFromHash';

const propTypes = {
    showMobileFilters: PropTypes.bool,
    setShowMobileFilters: PropTypes.func,
    mobileSidebarContent: PropTypes.string,
    sidebarIsOpen: PropTypes.bool,
    setSidebarIsOpen: PropTypes.func
};

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

    const [text, setText] = useState('');
    const [hash, setHash] = useState();
    // the query sent to filter search: the original text, or the reworded query once the user approves it
    const [searchQuery, setSearchQuery] = useState();
    const [assistantState, setAssistantState] = useState({ status: QUERY_ASSISTANT_STATUS.IDLE, result: null });

    const dispatch = useDispatch();

    const isDesktopFilters = sidebarContent === FILTERS;
    const isMobileFilters = mobileSidebarContent === FILTERS;

    const { checkQuery, cancelCheck } = useQueryAssistant();
    const { parsedData, fetchNLSearch, cancelQuery, isFetching, fetchingError, isSuccess, clearNLCache } = useRequestNLSearch(searchQuery ?? text, 'side panel');

    const toggleOpened = (e) => {
        e.preventDefault();
        setSidebarIsOpen((prevState) => !prevState);
    };

    const closeSidebar = () => {
        if (isMedium) {
            setShowMobileFilters(false);
        }
        else {
            setSidebarIsOpen(false);
        }
    };

    const keyHandler = (e, func) => {
        if (e.key === 'Enter') {
            func(e);
        }
    };

    const request = useRef();
    const wasCancelled = useRef(false);

    // first ask the query assistant whether the query can be searched; filter search starts from the
    // searchQuery effect below once the query is answerable (or the user approves the reworded query)
    const runSearchFor = async (query) => {
        Analytics.event({
            category: 'Smart Assist - Query',
            action: 'Query Submitted',
            label: 'side panel'
        });
        const trimmed = query?.trim();
        if (trimmed) {
            wasCancelled.current = false;
            clearNLCache();
            // reset so an identical hash from a repeated search will trigger
            // a fetch to the hash endpoint
            setHash(undefined);
            setSearchQuery(undefined);
            setAssistantState({ status: QUERY_ASSISTANT_STATUS.CHECKING, result: null });
            dispatch(setIsNLSearchComplete(false));
            dispatch(setIsNLSearchError(false));

            let result;
            try {
                result = await checkQuery(trimmed);
            }
            catch {
                // a newer check or a cancel replaced this one
                return;
            }
            if (wasCancelled.current) {
                return;
            }

            setAssistantState({ status: QUERY_ASSISTANT_STATUS.DONE, result });
            if (result.verdict === QUERY_ASSISTANT_VERDICT.ANSWERABLE) {
                setSearchQuery(trimmed);
            }
            else {
                // wait for the user: approve/edit a rewrite, or pick a suggestion
                dispatch(setIsNLSearchComplete(true));
            }
            Analytics.event({
                category: 'Smart Assist - Query Assistant',
                action: 'Verdict',
                label: result.verdict
            });
        }
    };

    const startNLSearch = () => runSearchFor(text);

    const approveRewrite = (rewrittenQuery) => {
        Analytics.event({
            category: 'Smart Assist - Query Assistant',
            action: 'Rewrite Approved',
            label: 'side panel'
        });
        setAssistantState((previous) => ({ ...previous, status: QUERY_ASSISTANT_STATUS.APPROVED }));
        dispatch(setIsNLSearchComplete(false));
        setSearchQuery(rewrittenQuery);
    };

    const editRewrite = (rewrittenQuery) => {
        Analytics.event({
            category: 'Smart Assist - Query Assistant',
            action: 'Rewrite Edited',
            label: 'side panel'
        });
        setAssistantState({ status: QUERY_ASSISTANT_STATUS.IDLE, result: null });
        setText(sanitizeNLInput(rewrittenQuery).trim().slice(0, NL_INPUT_MAX_CHARS));
        dispatch(setIsSearchActive(false));
    };

    const selectSuggestion = (suggestion) => {
        Analytics.event({
            category: 'Smart Assist - Query Assistant',
            action: 'Suggestion Selected',
            label: 'side panel'
        });
        setText(suggestion);
        runSearchFor(suggestion);
    };

    useEffect(() => {
        if (searchQuery && typeof fetchNLSearch === 'function') {
            fetchNLSearch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const handleCancelQuery = () => {
        wasCancelled.current = true;
        cancelCheck();
        setAssistantState({ status: QUERY_ASSISTANT_STATUS.IDLE, result: null });
        if (request.current) {
            request.current.cancel();
            request.current = null;
        }
        if (typeof cancelQuery === 'function') {
            cancelQuery();
            dispatch(setIsNLSearchComplete(true));
        }
    };

    const { filterResults, hashError, loadResultsView, hashSuccess } = useFetchDataFromHash(hash);

    useEffect(() => {
        if (fetchingError) {
            dispatch(setIsNLSearchError(true));
        }

        if (hashError) {
            dispatch(setIsNLSearchError(true));
        }

        // check if the results is a filter object if not, show the hash error page
        if (filterResults && Object.keys(filterResults).length > 0 && hashSuccess) {
            dispatch(restoreHashedFilters(filterResults));
        }

        dispatch(setIsNLSearchComplete(!isFetching));
    }, [filterResults, hashSuccess, hashError, fetchingError]);

    useEffect(() => {
        if (hash) {
            loadResultsView();
        }
    }, [hash]);

    useEffect(() => {
        if (wasCancelled.current) {
            return;
        }

        if (isSuccess && parsedData && Object.keys(parsedData).length > 0) {
            const done = parsedData.find((res) => {
                if (res.type === RESPONSE_TYPE.SEARCH_COMPLETE) {
                    return res;
                }
            });

            if (done?.result) {
                setHash(done.result);
            }
            dispatch(setIsNLSearchComplete(!isFetching));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parsedData, isSuccess]);

    const renderDesktopSidebar = () => (
        <div className="collapsible-sidebar-header">
            <div className="sidebar-title-row">
                <h2 className="sidebar-title">
                    {isDesktopFilters ? 'Advanced Search' : 'Smart Assist'}
                </h2>
                {!isDesktopFilters && <span className="sidebar-beta-badge">BETA</span>}
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

            { isDesktopFilters ?
                (
                    <>
                        <div className="link">
                            <AboutTheDataLink slug="data-elements">
                                Learn more about filters
                            </AboutTheDataLink>
                        </div>
                        <SidebarContent />
                    </>
                ) :
                (
                    <NLSidebarContent
                        text={text}
                        setText={setText}
                        startNLSearch={startNLSearch}
                        data={parsedData}
                        cancelQuery={handleCancelQuery}
                        assistantState={assistantState}
                        onApproveRewrite={approveRewrite}
                        onEditRewrite={editRewrite}
                        onSelectSuggestion={selectSuggestion} />
                )}
        </div>
    );

    const renderMobileSidebar = () => (
        <div className={`collapsible-sidebar-header ${isMobileFilters ? '' : 'is-nl'}`}>
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

            { isMobileFilters ?
                (
                    <>
                        <div className="link">
                            <AboutTheDataLink slug="data-elements">
                                Learn more about filters
                            </AboutTheDataLink>
                        </div>
                        <MobileSidebarContent
                            setShowMobileFilters={setShowMobileFilters}
                            mobileSidebarContent={mobileSidebarContent}
                            showMobileFilters={showMobileFilters} />
                    </>
                ) :
                (
                    <NLSidebarContent
                        text={text}
                        setText={setText}
                        startNLSearch={startNLSearch}
                        data={parsedData}
                        cancelQuery={handleCancelQuery}
                        assistantState={assistantState}
                        onApproveRewrite={approveRewrite}
                        onEditRewrite={editRewrite}
                        onSelectSuggestion={selectSuggestion} />
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
                    sidebarIsOpen || showMobileFilters ? 'opened' : ''
                } ${
                    showMobileFilters ? 'mobile' : ''}`}>

                { isMedium ?
                    showMobileFilters && renderMobileSidebar() :
                    sidebarIsOpen && renderDesktopSidebar()}
            </div>
        </>
    );
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
