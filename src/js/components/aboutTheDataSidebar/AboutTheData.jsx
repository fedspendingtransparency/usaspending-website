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
    hideAboutTheData
} from "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import { getDrilldownEntrySectionAndId } from "../../helpers/aboutTheDataSidebarHelper";
import { getQueryParamString } from '../../helpers/queryParams';
import schema from "../../../config/aboutTheData/aboutTheDataSchema";
import useQueryParams from "../../hooks/useQueryParams";
import AboutTheDataHeader from "./AboutTheDataHeader";
import AboutTheDataContent from "./AboutTheDataContent";

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
    const slug = useSelector((state) => state.aboutTheDataSidebar.term.slug);
    const { lastOpenedSlideout } = useSelector((state) => state.slideouts);
    const display = useSelector((state) => state.aboutTheDataSidebar.display);

    const [firstMount] = useState(() => !display);
    const [height, setHeight] = useState(getHeight());
    const [scrollbar, setScrollbar] = useState(null);

    const zIndexClass = lastOpenedSlideout === 'atd' ? 'z-index-plus-one' : 'z-index';

    const clearDrilldown = useCallback(() => dispatch(clearAboutTheDataTerm()), [dispatch]);

    const { entryId, section } = useMemo(() => {
        if (slug === "") return { entryId: null, section: null };
        return getDrilldownEntrySectionAndId(schema, slug)
    }, [slug]);

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
            entryId !== null &&
            entryId >= 0 &&
            section
        ) {
            scrollbar?.scrollToTop();
        }
    }, [entryId, section, scrollbar]);

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
                    <AboutTheDataContent clearDrilldown={clearDrilldown} entryId={entryId} section={section} />
                </Scrollbars>
            </aside>
        </div>);
};

export default AboutTheData;
