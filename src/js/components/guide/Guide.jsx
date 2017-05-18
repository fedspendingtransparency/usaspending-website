/**
 * Guide.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Mousetrap from 'mousetrap';

import GuideHeader from './GuideHeader';
import GuideSearchResults from './search/GuideSearchResults';
import GuideDefinition from './definition/GuideDefinition';
import NoResults from './noResults/NoResults';

const propTypes = {
    guide: React.PropTypes.object,
    loading: React.PropTypes.bool,
    error: React.PropTypes.bool,
    hideGuide: React.PropTypes.func
};

export default class Guide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentHeight: 0
        };

        this.measureAvailableHeight = this.measureAvailableHeight.bind(this);
        this.pressedEsc = this.pressedEsc.bind(this);

        this.renderTrack = this.renderTrack.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    componentDidMount() {
        this.measureAvailableHeight();
        window.addEventListener('resize', this.measureAvailableHeight);
        Mousetrap.bind('esc', this.pressedEsc);
    }

    componentDidUpdate(prevProps) {
        if (this.props.guide.term !== prevProps.guide.term) {
            // we've either gone to a definition or returned from one
            // scroll back to the top
            if (this.scrollbar) {
                this.scrollbar.scrollToTop();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureAvailableHeight);
        Mousetrap.unbind('esc');
    }

    measureAvailableHeight() {
        const sidebarHeight = this.sidebar.getBoundingClientRect().height;
        const headerHeight = this.sidebarHeader.getBoundingClientRect().height;

        const contentHeight = sidebarHeight - headerHeight;

        this.setState({
            contentHeight
        });
    }

    pressedEsc() {
        // close the guide when the escape key is pressed for accessibility and general
        // non-annoyance
        this.props.hideGuide();
    }

    renderThumb() {
        // render a component to represent the current scroll position
        // (on Macs, only visible when scroll bar settings are on "Always")
        return (
            <div className="guide-scrollbar-thumb" />
        );
    }

    renderTrack() {
        // render a component within which the thumb moves as the scrollbar scrolls
        // (on Macs, only visible when scroll bar settings are on "Always")
        return (
            <div className="guide-scrollbar-track" />
        );
    }

    render() {
        let content = (<GuideSearchResults
            {...this.props}
            updateContentHeight={this.updateContentHeight} />);

        if (this.props.guide.term.slug && this.props.guide.term.slug !== '') {
            content = (<GuideDefinition
                {...this.props}
                updateContentHeight={this.updateContentHeight} />);
        }
        else if (this.props.guide.search.results.length === 0) {
            content = <NoResults {...this.props} />;
        }

        let loading = null;
        if (this.props.loading) {
            loading = (<div className="guide-loading-content">
                Loading Guide...
            </div>);
        }
        else if (this.props.error) {
            loading = (<div className="guide-loading-content">
                Error: Could not load Guide.
            </div>);
        }

        return (
            <div className="usa-da-guide-wrapper">
                <div
                    className="guide-sidebar"
                    ref={(div) => {
                        this.sidebar = div;
                    }}>
                    <div
                        className="guide-header-wrapper"
                        ref={(div) => {
                            this.sidebarHeader = div;
                        }}>
                        <GuideHeader {...this.props} />
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
                </div>
            </div>
        );
    }
}

Guide.propTypes = propTypes;
