/**
 * AboutTheData.jsx
 * Created by Nick Torres 11/2/22
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { Scrollbars } from 'react-custom-scrollbars';

import {
    clearAboutTheDataTerm,
    hideAboutTheData,
    setAboutTheDataTerm
} from "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import { getDrilldownEntrySectionAndId, escapeRegExp } from "../../helpers/aboutTheDataSidebarHelper";
import { getQueryParamString } from '../../helpers/queryParams';
import schema from "../../../config/aboutTheData/aboutTheDataSchema";
import useQueryParams from "../../hooks/useQueryParams";
import AboutTheDataHeader from "./AboutTheDataHeader";
import AboutTheDataListView from "./AboutTheDataListView";
import AboutTheDataDrilldown from "./AboutTheDataDrilldown";
import DownloadButton from "./DownloadButton";
import AboutTheDataNoResults from "./AboutTheDataNoResults";

const getHeight = () => {
    const paddingBottom = 200;
    const wrapperHeight = document.getElementById('usa-atd-wrapper')?.getBoundingClientRect().height || 0;
    const headerHeight = document.getElementById('usa-atd-header')?.getBoundingClientRect().height || 0;

    return wrapperHeight - headerHeight - paddingBottom;
}

const AboutTheData = () => {
    const query = useQueryParams();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const input = useSelector((state) => state.aboutTheDataSidebar.search.input);
    const slug = useSelector((state) => state.aboutTheDataSidebar.term.slug);
    const { lastOpenedSlideout } = useSelector((state) => state.slideouts);
    const display = useSelector((state) => state.aboutTheDataSidebar.display);

    const [firstMount] = useState(() => !display);
    const [height, setHeight] = useState(getHeight());
    const [scrollbar, setScrollbar] = useState(null);

    const zIndexClass = lastOpenedSlideout === 'atd' ? 'z-index-plus-one' : 'z-index';

    const clearDrilldown = useCallback(() => dispatch(clearAboutTheDataTerm()), [dispatch]);

    const { entryId: drilldownItemId, section: drilldownSection } = useMemo(() => {
        if (slug === "") return { entryId: null, section: null };
        return getDrilldownEntrySectionAndId(schema, slug)
    }, [slug]);

    const searchResults = useMemo(() => {
        if (!input || input.length < 3) return schema;

        const resultItems = {};

        // look for search term in each 'fields.name' in each section
        Object
            .entries(schema)
            .filter(([, section]) => section.heading !== undefined)
            .forEach(([sectionKey, section]) => {
                const matchingFields = section.fields.filter((field) =>
                    field.name.toLowerCase()
                        .includes(input.toLowerCase())
                );
                if (matchingFields.length) {
                    const markupFields = [];
                    matchingFields.forEach((field) => {
                        // add classname to the search term in the results
                        const regex = new RegExp(escapeRegExp(input), 'gi');
                        const markupName = field.name.replace(regex, '<match>$&<match>');
                        const parts = markupName.split('<match>');
                        const markup = <>
                            {parts.map((part) => (
                                <>
                                    {part.toLowerCase() === input.toLowerCase() ? (
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

        clearDrilldown();

        return resultItems
    }, [input, clearDrilldown])

    const measureAvailableHeight = () => setHeight(getHeight());

    const closeAboutTheData = useCallback((e) => {
        if (e.key === 'Escape' || (e.type === 'click')) {
            // close the atd drawer when the escape key is pressed, for accessibility and general non-annoyance
            dispatch(hideAboutTheData());
            clearDrilldown();

            // remove search param from url
            if (window.location.href.includes('about-the-data')) {
                const newQuery = { ...query };
                delete newQuery['about-the-data'];
                const newQueryParams = getQueryParamString(newQuery);
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
    }, [clearDrilldown, dispatch, pathname, query]);

    const track = () => <div className="atd-scrollbar-track" />;
    const thumb = () => <div className="atd-scrollbar-thumb" />;

    const selectItem = (index, section) => dispatch(setAboutTheDataTerm(section.fields[index]));

    const content = Object.keys(searchResults).length === 0 ? (
        <>
            <DownloadButton />
            <AboutTheDataNoResults searchTerm={input} />
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
        window.addEventListener('resize', measureAvailableHeight);
        window.addEventListener('keyup', closeAboutTheData);
        return () => {
            window.removeEventListener('resize', measureAvailableHeight);
            window.removeEventListener('keyup', closeAboutTheData);
        };
    }, [closeAboutTheData]);

    useEffect(() => {
        if (scrollbar) {
            scrollbar.scrollToTop();
        }
    }, [scrollbar]);

    useEffect(() => {
        if (
            drilldownItemId !== null &&
            drilldownItemId >= 0 &&
            drilldownSection
        ) {
            scrollbar?.scrollToTop();
        }
    }, [drilldownItemId, drilldownSection, scrollbar]);

    return (
        <div
            id="usa-atd-wrapper"
            style={{ visibility: firstMount ? "hidden" : "" }}
            className={
                display ?
                    `opened usa-atd-wrapper ${zIndexClass}` :
                    `usa-atd-wrapper ${zIndexClass}`
            }>
            <aside
                role="dialog"
                aria-labelledby="atd-title"
                className="atd-sidebar">
                <AboutTheDataHeader closeAboutTheData={closeAboutTheData} />
                <Scrollbars
                    style={{ height }}
                    renderTrackVertical={track}
                    renderThumbVertical={thumb}
                    ref={(s) => setScrollbar(s)}>
                    { drilldownItemId !== null && drilldownItemId >= 0 && drilldownSection ?
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
                        </>
                    }
                </Scrollbars>
            </aside>
        </div>);
};

export default AboutTheData;
