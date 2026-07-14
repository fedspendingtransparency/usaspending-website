/**
 * Glossary.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { hideGlossary, clearGlossaryTerm } from '-redux/actions/glossary/glossaryActions';

import { getQueryParamString } from 'helpers/queryParams';
import GlossaryHeader from './GlossaryHeader';
import GlossarySearchResults from './search/GlossarySearchResults';
import GlossaryDefinition from './definition/GlossaryDefinition';
import NoResults from './noResults/NoResults';
import useQueryParams from "../../hooks/useQueryParams";

const propTypes = {
    glossary: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    zIndexClass: PropTypes.string,
    performSearch: PropTypes.func,
    glossaryResults: PropTypes.object,
    searchLoading: PropTypes.bool
};

const Glossary = ({
    glossary, glossaryResults, searchLoading, loading, error, zIndexClass, performSearch
}) => {
    const history = useNavigate();
    const query = useQueryParams();
    const [contentHeight, setContentHeight] = useState(0);
    const [content, setContent] = useState(null);
    const [loadingContent, setLoadingContent] = useState(null);
    const [scrollbar, setScrollbar] = useState(null);
    const [firstMount, setFirstMount] = useState(true);

    const dispatch = useDispatch();
    const measureAvailableHeight = (useCallback(() => {
        const sidebarHeight = document.getElementById('glossary-sidebar')?.getBoundingClientRect().height || 0;
        const headerHeight = document.getElementById('glossary-sidebar-header')?.getBoundingClientRect().height || 0;

        setContentHeight(sidebarHeight - headerHeight);
    }));

    useEffect(() => {
        if (glossary?.display) {
            setFirstMount(false);
        }
    }, [glossary.display]);

    const closeGlossary = useCallback((e) => {
        if (e.key === 'Escape' || (e.type === 'click')) {
            dispatch(clearGlossaryTerm());
            dispatch(hideGlossary());

            // remove search param from url
            if (window.location.href.includes('glossary')) {
                delete query.glossary;
                const queryNew = getQueryParamString(query);
                history({
                    pathname: '',
                    search: queryNew
                }, { replace: true });
            }

            // move focus back to the main content
            const mainContent = document.getElementById('main-focus');
            if (mainContent) {
                mainContent.focus();
            }
        }
        
    }, [dispatch, history, query]);

    const track = () => <div className="glossary-scrollbar-track" />;
    const thumb = () => <div className="glossary-scrollbar-thumb" />;

    useEffect(() => {
        measureAvailableHeight();

        if (glossaryResults?.length === 0) {
            setContent(<NoResults glossary={glossary} searchLoading={searchLoading} />);
            setLoadingContent(null);
        }
        else if (glossary?.term.slug && glossary?.term.slug !== '') {
            setContent(<GlossaryDefinition glossary={glossary} />);
            setLoadingContent(null);
        }
        else {
            setContent(<GlossarySearchResults glossary={glossary} searchLoading={searchLoading} glossaryResults={glossaryResults} />);
            setLoadingContent(null);
        }

        if (loading) {
            setLoadingContent(<div className="glossary-loading-content">Loading Glossary...</div>);
            setContent(null);
        }
        else if (error) {
            setLoadingContent(<div className="glossary-loading-content">Error: Could not load Glossary.</div>);
            setContent(null);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, error, glossaryResults, glossary?.term.slug]);

    useEffect(() => {
        window.addEventListener('keyup', closeGlossary);
        window.addEventListener('resize', measureAvailableHeight);
        return () => {
            window.removeEventListener('resize', measureAvailableHeight);
            window.removeEventListener('keyup', closeGlossary);
        };
    }, [closeGlossary, measureAvailableHeight]);

    useEffect(() => {
        measureAvailableHeight();
        scrollbar?.scrollToTop();
    }, [measureAvailableHeight, scrollbar]);

    useEffect(() => {
        if (glossary?.term) {
            scrollbar?.scrollToTop();
        }
    }, [scrollbar]);

    return (
        <div
            style={{ visibility: firstMount ? "hidden" : "" }}
            className={glossary?.display ? `opened usa-da-glossary-wrapper ${zIndexClass}` : `usa-da-glossary-wrapper ${zIndexClass}`}>
            <aside
                id="glossary-sidebar"
                role="dialog"
                aria-labelledby="glossary-title"
                className="glossary-sidebar">
                <div
                    id="glossary-sidebar-header"
                    className="glossary-header-wrapper">
                    <GlossaryHeader
                        glossary={glossary}
                        performSearch={performSearch}
                        closeGlossary={closeGlossary} />
                </div>
                {loadingContent}
                <Scrollbars
                    style={{ height: contentHeight }}
                    renderTrackVertical={track}
                    renderThumbVertical={thumb}
                    ref={(s) => setScrollbar(s)}>
                    {content}
                </Scrollbars>
            </aside>
        </div>
    );
};

Glossary.propTypes = propTypes;
export default Glossary;
