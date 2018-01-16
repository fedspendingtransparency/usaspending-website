/**
 * Glossary.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Mousetrap from 'mousetrap';

import GlossaryHeader from './GlossaryHeader';
import GlossarySearchResults from './search/GlossarySearchResults';
import GlossaryDefinition from './definition/GlossaryDefinition';
import NoResults from './noResults/NoResults';

const propTypes = {
    glossary: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    hideGlossary: PropTypes.func
};

export default class Glossary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentHeight: 0
        };

        this.measureAvailableHeight = this.measureAvailableHeight.bind(this);
        this.closeGlossary = this.closeGlossary.bind(this);
        this.trapFocus = this.trapFocus.bind(this);

        this.renderTrack = this.renderTrack.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    componentDidMount() {
        this.measureAvailableHeight();
        window.addEventListener('resize', this.measureAvailableHeight);
        document.addEventListener('focus', this.trapFocus, true);
        Mousetrap.bind('esc', this.closeGlossary);
    }

    componentDidUpdate(prevProps) {
        if (this.props.glossary.term !== prevProps.glossary.term) {
            // we've either gone to a definition or returned from one
            // scroll back to the top
            if (this.scrollbar) {
                this.scrollbar.scrollToTop();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureAvailableHeight);
        document.removeEventListener('focus', this.trapFocus, true);
        Mousetrap.unbind('esc');
    }

    closeGlossary() {
        // close the glossary when the escape key is pressed for accessibility and general
        // non-annoyance
        this.props.hideGlossary();
        document.removeEventListener('focus', this.trapFocus, true);

        // move focus back to the main content
        const mainContent = document.getElementById('main-focus');
        if (mainContent) {
            mainContent.focus();
        }
    }

    measureAvailableHeight() {
        const sidebarHeight = this.sidebar.getBoundingClientRect().height;
        const headerHeight = this.sidebarHeader.getBoundingClientRect().height;

        const contentHeight = sidebarHeight - headerHeight;

        this.setState({
            contentHeight
        });
    }

    trapFocus(e) {
        if (!this.sidebar.contains(e.target)) {
            // the user is trying to focus on something outside the glossary
            // trap the focus in the glossary sidebar until the user closes it
            e.stopPropagation();
            document.querySelector('#glossary-close-button').focus();
        }
    }

    renderThumb() {
        // render a component to represent the current scroll position
        // (on Macs, only visible when scroll bar settings are on "Always")
        return (
            <div className="glossary-scrollbar-thumb" />
        );
    }

    renderTrack() {
        // render a component within which the thumb moves as the scrollbar scrolls
        // (on Macs, only visible when scroll bar settings are on "Always")
        return (
            <div className="glossary-scrollbar-track" />
        );
    }

    render() {
        let content = (<GlossarySearchResults
            {...this.props}
            updateContentHeight={this.updateContentHeight} />);

        if (this.props.glossary.term.slug && this.props.glossary.term.slug !== '') {
            content = (<GlossaryDefinition
                {...this.props}
                updateContentHeight={this.updateContentHeight} />);
        }
        else if (this.props.glossary.search.results.length === 0) {
            content = <NoResults {...this.props} />;
        }

        let loading = null;
        if (this.props.loading) {
            loading = (
                <div className="glossary-loading-content">
                    Loading Glossary...
                </div>
            );
            content = null;
        }
        else if (this.props.error) {
            loading = (
                <div className="glossary-loading-content">
                    Error: Could not load Glossary.
                </div>
            );
            content = null;
        }

        return (
            <div className="usa-da-glossary-wrapper">
                <aside
                    role="dialog"
                    aria-labelledby="glossary-title"
                    className="glossary-sidebar"
                    ref={(div) => {
                        this.sidebar = div;
                    }}>
                    <div
                        className="glossary-header-wrapper"
                        ref={(div) => {
                            this.sidebarHeader = div;
                        }}>
                        <GlossaryHeader
                            {...this.props}
                            closeGlossary={this.closeGlossary} />
                    </div>
                    {loading}
                    <Scrollbars
                        style={{ height: this.state.contentHeight }}
                        renderTrackVertical={this.renderTrack}
                        renderThumbVertical={this.renderThumb}
                        ref={(scrollbar) => {
                            this.scrollbar = scrollbar;
                        }}>
                        {content}
                    </Scrollbars>
                </aside>
            </div>
        );
    }
}

Glossary.propTypes = propTypes;
