/**
 * Glossary.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import GlossaryHeader from './GlossaryHeader';
import GlossarySearchResults from './search/GlossarySearchResults';
import GlossaryDefinition from './definition/GlossaryDefinition';
import NoResults from './noResults/NoResults';

const propTypes = {
    glossary: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    hideGlossary: PropTypes.func,
    zIndexClass: PropTypes.string
};

const Glossary = (props) => {
    const history = useHistory();
    const [contentHeight, setContentHeight] = useState(0);
    const [content, setContent] = useState(null);
    const [loadingContent, setLoadingContent] = useState(null);
    const [scrollbar, setScrollbar] = useState(null);
    const [firstMount, setFirstMount] = useState(true);

    const measureAvailableHeight = (useCallback(() => {
        const sidebarHeight = document.getElementById('glossary-sidebar')?.getBoundingClientRect().height || 0;
        const headerHeight = document.getElementById('glossary-sidebar-header')?.getBoundingClientRect().height || 0;

        setContentHeight(sidebarHeight - headerHeight);
    }));

    useEffect(() => {
        if (props.glossary.display) {
            setFirstMount(false);
        }
    }, [props.glossary.display]);

    const closeGlossary = useCallback((e) => {
        if (e.key === 'Escape' || (e.type === 'click')) {
            props.hideGlossary();

            // remove search param from url
            if (window.location.href.includes('glossary')) {
                history.replace(`${history.location.pathname}`);
            }

            // move focus back to the main content
            const mainContent = document.getElementById('main-focus');
            if (mainContent) {
                mainContent.focus();
            }
        }
    });

    const track = () => <div className="glossary-scrollbar-track" />;
    const thumb = () => <div className="glossary-scrollbar-thumb" />;

    useEffect(() => {
        measureAvailableHeight();

        if (props.glossary.search.results.length === 0) {
            setContent(<NoResults {...props} />);
            setLoadingContent(null);
        }
        else if (props.glossary.term.slug && props.glossary.term.slug !== '') {
            setContent(<GlossaryDefinition {...props} />);
            setLoadingContent(null);
        }
        else {
            setContent((<GlossarySearchResults {...props} />));
            setLoadingContent(null);
        }


        if (props.loading) {
            setLoadingContent(<div className="glossary-loading-content">Loading Glossary...</div>);
            setContent(null);
        }
        else if (props.error) {
            setLoadingContent(<div className="glossary-loading-content">Error: Could not load Glossary.</div>);
            setContent(null);
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.loading, props.error, props.glossary.search.results, props.glossary.term.slug]);

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
        if (props.glossary.term) {
            scrollbar?.scrollToTop();
        }
    }, [props.glossary.term, scrollbar]);

    return (
        <div
            style={{ visibility: firstMount ? "hidden" : "" }}
            className={props.glossary.display ? `opened usa-da-glossary-wrapper ${props.zIndexClass}` : `usa-da-glossary-wrapper ${props.zIndexClass}`}>
            <aside
                id="glossary-sidebar"
                role="dialog"
                aria-labelledby="glossary-title"
                className="glossary-sidebar">
                <div
                    id="glossary-sidebar-header"
                    className="glossary-header-wrapper">
                    <GlossaryHeader
                        {...props}
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
