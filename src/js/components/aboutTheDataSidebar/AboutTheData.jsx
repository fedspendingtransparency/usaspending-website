/**
 * AboutTheData.jsx
 * Created by Nick Torres 11/2/22
 */

import React, { useState, useEffect, useCallback } from 'react';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router";
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { isEqual } from "lodash-es";
import { getDrilldownEntrySectionAndId, escapeRegExp } from 'helpers/aboutTheDataSidebarHelper';
import AboutTheDataHeader from "./AboutTheDataHeader";
import AboutTheDataListView from "./AboutTheDataListView";
import AboutTheDataDrilldown from "./AboutTheDataDrilldown";
import DownloadButton from "./DownloadButton";
import { LoadingWrapper } from "../sharedComponents/Loading";
import AboutTheDataNoResults from "./AboutTheDataNoResults";
import { useQueryParams, getQueryParamString } from '../../helpers/queryParams';


const propTypes = {
    aboutTheDataSidebar: PropTypes.object,
    hideAboutTheData: PropTypes.func,
    schema: PropTypes.object,
    clearAboutTheDataTerm: PropTypes.func,
    setAboutTheDataTerm: PropTypes.func
};

const AboutTheData = (props) => {
    const { pathname } = useLocation();
    const query = useQueryParams();
    const [height, setHeight] = useState(0);
    const [drilldown, setDrilldown] = useState(null);
    const [drilldownItemId, setDrilldownItemId] = useState(null);
    const [drilldownSection, setDrilldownSection] = useState(null);
    const [scrollbar, setScrollbar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResultsPending, setSearchResultsPending] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { schema } = props;
    const [searchResults, setSearchResults] = useState(schema);
    const dispatch = useDispatch();
    const [zIndexClass, setZIndexClass] = useState(null);

    const { input, results } = useSelector((state) => state.aboutTheDataSidebar.search);
    const { lastOpenedSlideout } = useSelector((state) => state.slideouts);
    const [firstMount, setFirstMount] = useState(true);

    useEffect(() => {
        if (props.aboutTheDataSidebar.display) {
            setFirstMount(false);
        }
    }, [props.aboutTheDataSidebar.display]);

    const clearDrilldown = () => {
        setDrilldownItemId(null);
        setDrilldownSection(null);
        setDrilldown(false);
        props.clearAboutTheDataTerm();
    };

    const clearSearch = () => {
        setSearchResults(schema);
        dispatch(aboutTheDataActions.setAboutTheDataResults(schema));
    };

    const performSearch = (term) => {
        if (!term) {
            setSearchResults(schema);
            return;
        }

        const resultItems = {};

        // look for search term in each 'fields.name' in each section
        Object.entries(schema).filter(([, section]) => section.heading !== undefined).forEach(([sectionKey, section]) => {
            const matchingFields = section.fields.filter((field) =>
                field.name.toLowerCase()
                    .includes(term.toLowerCase())
            );
            if (matchingFields.length) {
                const markupFields = [];
                matchingFields.forEach((field) => {
                    // add classname to the search term in the results
                    const regex = new RegExp(escapeRegExp(term), 'gi');
                    const markupName = field.name.replace(regex, '<match>$&<match>');
                    const parts = markupName.split('<match>');
                    const markup = <>
                        {parts.map((part) => (
                            <>
                                {part.toLowerCase() === term.toLowerCase() ? (
                                    <span className="matched-highlight">
                                        {part}
                                    </span>
                                )
                                    :
                                    <>
                                        {part}
                                    </>
                                }
                            </>
                        ))}
                    </>;

                    markupFields.push({
                        name: markup,
                        slug: field.slug
                    });
                });
                resultItems[sectionKey] = {
                    fields: markupFields,
                    heading: section.heading
                };
            }
        });
        // set results in local scope
        setSearchResults(resultItems);
        clearDrilldown();
        // and in redux
        dispatch(aboutTheDataActions.setAboutTheDataResults(resultItems));
    };

    const measureAvailableHeight = () => {
        const paddingBottom = 200;
        const wrapperHeight = document.getElementById('usa-atd-wrapper')?.getBoundingClientRect().height || 0;
        const headerHeight = document.getElementById('usa-atd-header')?.getBoundingClientRect().height || 0;

        const sidebarHeight = wrapperHeight - headerHeight - paddingBottom;

        setHeight(sidebarHeight);
    };

    const closeAboutTheData = useCallback((e) => {
        if (e.key === 'Escape' || (e.type === 'click')) {
            // close the atd drawer when the escape key is pressed, for accessibility and general non-annoyance
            props.hideAboutTheData();
            clearDrilldown();

            // remove search param from url
            if (window.location.href.includes('about-the-data')) {
                delete query['about-the-data'];
                const newQueryParams = getQueryParamString(query);

                let newUrl = pathname + newQueryParams;
                if (newUrl.split('').pop() === '?') {
                    newUrl = newUrl.substring(0, newUrl.length - 1);
                }

                window.history.replaceState(null, '', newUrl);
            }

            // move focus back to the main content
            const mainContent = document.getElementById('main-focus');
            if (mainContent) {
                mainContent.focus();
            }
        }
    });

    const track = () => <div className="atd-scrollbar-track" />;
    const thumb = () => <div className="atd-scrollbar-thumb" />;

    const selectItem = (index, section) => {
        setDrilldownItemId(index);
        setDrilldownSection(section);
        props.setAboutTheDataTerm(section.fields[index]);
    };

    const content = Object.keys(searchResults).length === 0 ? (
        <>
            <DownloadButton />
            <AboutTheDataNoResults searchTerm={searchTerm} />
        </>
    )
        :
        (
            <>
                <DownloadButton />
                {Object.values(searchResults)
                    .filter((section) => section.heading !== undefined)
                    .map((section) => (
                        <AboutTheDataListView
                            key={`section-${section.heading}`}
                            section={section}
                            selectItem={selectItem} />
                    ))}
            </>
        );

    useEffect(() => {
        setSearchTerm(input);

        if (input === null || input?.length === 0 || isEqual(results, searchResults)) {
            setSearchResultsPending(false);
            setIsLoading(false);
        }

        // if there are already results on redux set the UI to the results
        if (input?.length > 0 && !isEqual(results, searchResults)) {
            setSearchResultsPending(true);
            setSearchResults(results);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (searchResultsPending && isEqual(results, searchResults)) {
            setSearchResultsPending(false);
            setIsLoading(false);
        }
    }, [results, searchResults, searchResultsPending]);

    useEffect(() => {
        if (props.aboutTheDataSidebar.term.slug && props.aboutTheDataSidebar.term.slug !== '') {
            const entry = getDrilldownEntrySectionAndId(schema, props.aboutTheDataSidebar.term.slug);
            setDrilldownItemId(entry.entryId);
            setDrilldownSection(entry.section);
            setIsLoading(false);
        }

        window.addEventListener('resize', measureAvailableHeight);
        window.addEventListener('keyup', closeAboutTheData);
        return () => {
            window.removeEventListener('resize', measureAvailableHeight);
            window.removeEventListener('keyup', closeAboutTheData);
        };
    }, [closeAboutTheData, props.aboutTheDataSidebar.term.slug, schema]);

    useEffect(() => {
        measureAvailableHeight();
        if (scrollbar) {
            scrollbar.scrollToTop();
        }
    }, [drilldown, scrollbar]);

    useEffect(() => {
        if (drilldownItemId !== null && drilldownItemId >= 0 && drilldownSection) {
            scrollbar?.scrollToTop();
            setDrilldown(true);
        }
    }, [drilldownItemId, drilldownSection, scrollbar]);

    useEffect(() => {
        setZIndexClass(lastOpenedSlideout === 'atd' ? 'z-index-plus-one' : 'z-index');
    }, [lastOpenedSlideout]);

    return (
        <div
            id="usa-atd-wrapper"
            style={{ visibility: firstMount ? "hidden" : "" }}
            className={props.aboutTheDataSidebar.display ? `opened usa-atd-wrapper ${zIndexClass}` : `usa-atd-wrapper ${zIndexClass}`}>
            <aside
                role="dialog"
                aria-labelledby="atd-title"
                className="atd-sidebar">
                {isLoading || searchResultsPending ?
                    <><LoadingWrapper isLoading /></>
                    :
                    <>
                        <AboutTheDataHeader
                            closeAboutTheData={closeAboutTheData}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            performSearch={performSearch}
                            clearSearch={clearSearch} />
                        <Scrollbars
                            style={{ height }}
                            renderTrackVertical={track}
                            renderThumbVertical={thumb}
                            ref={(s) => setScrollbar(s)}>
                            {drilldown ?
                                <div className="atd__body">
                                    <AboutTheDataDrilldown
                                        section={drilldownSection?.heading}
                                        name={drilldownSection?.fields[drilldownItemId]?.name}
                                        clearDrilldown={clearDrilldown}
                                        slug={drilldownSection?.fields[drilldownItemId]?.slug} />
                                </div>
                                :
                                <>
                                    <div className="atd__body">
                                        {content}
                                    </div>
                                </>}
                        </Scrollbars>
                    </>
                }
            </aside>
        </div>);
};

AboutTheData.propTypes = propTypes;
export default AboutTheData;
