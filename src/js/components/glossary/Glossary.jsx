/**
 * Glossary.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useCallback, useEffect, useState, useRef } from 'react';
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
    hideGlossary: PropTypes.func,
    zIndexClass: PropTypes.string,
    history: PropTypes.object
};

const Glossary = (props) => {
    const [contentHeight, setContentHeight] = useState(0);
    const [content, setContent] = useState(null);
    const [scrollbar, setScrollbar] = useState(null);
    const [loadingContent, setLoadingContent] = useState('');

    const measureAvailableHeight = useCallback(() => {
        const sidebarHeight = document.getElementById('glossary-sidebar')?.getBoundingClientRect().height || 0;
        const headerHeight = document.getElementById('glossary-sidebar-header')?.getBoundingClientRect().height || 0;

        setContentHeight(sidebarHeight - headerHeight);
    });

    const closeGlossary = useCallback(() => {
        props.hideGlossary();

        // remove search param from url
        // todo - probably need to change this history to useHistory hook
        // then get rid of history prop
        if (props.history.location.search.includes('glossary')) {
            props.history.replace({
                search: ''
            });
        }
        // move focus back to the main content
        const mainContent = document.getElementById('main-focus');
        if (mainContent) {
            mainContent.focus();
        }
    });

    const track = () => <div className="atd-scrollbar-track" />;
    const thumb = () => <div className="atd-scrollbar-thumb" />;

    useEffect(() => {
        measureAvailableHeight();

        if (props.loading) {
            setLoadingContent('Loading Glossary...');
        }
        else if (props.error) {
            setLoadingContent('Error: Could not load Glossary.');
        }

        if (props.glossary.search.results.length === 0) {
            setContent(<NoResults {...props} />);
        }
        else if (props.glossary.term.slug && props.glossary.term.slug !== '') {
            // todo - what is updateContentHeight?
            // send contentHeight instead?
            // neither of these cmpnts have this as a prop though, strange
            // leave it out at first
            setContent(<GlossaryDefinition {...props} />);
        }
        else setContent((<GlossarySearchResults {...props} />));
    }, [measureAvailableHeight, props]);

    useEffect(() => {
        Mousetrap.bind('esc', closeGlossary);

        window.addEventListener('resize', measureAvailableHeight);
        return () => {
            window.removeEventListener('resize', measureAvailableHeight);
            Mousetrap.unbind('esc');
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
        <div className={`usa-da-glossary-wrapper ${props.zIndexClass}`}>
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
                {props.loading &&
                    <div className="glossary-loading-content">
                        {loadingContent}
                    </div>
                }
                <Scrollbars
                    style={{ contentHeight }}
                    renderTrackVertical={track}
                    renderThumbVertical={thumb}
                    ref={(s) => setScrollbar(s)}>
                    {content}
                </Scrollbars>
            </aside>
        </div>
    );
};

// export class Glossary extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             contentHeight: 0
//         };
//
//         this.measureAvailableHeight = this.measureAvailableHeight.bind(this);
//         this.closeGlossary = this.closeGlossary.bind(this);
//
//         this.renderTrack = this.renderTrack.bind(this);
//         this.renderThumb = this.renderThumb.bind(this);
//     }
//
//     componentDidMount() {
//         this.measureAvailableHeight();
//         window.addEventListener('resize', this.measureAvailableHeight);
//         Mousetrap.bind('esc', this.closeGlossary);
//     }
//
//     componentDidUpdate(prevProps) {
//         if (this.props.glossary.term !== prevProps.glossary.term) {
//             // we've either gone to a definition or returned from one
//             // scroll back to the top
//             if (this.scrollbar) {
//                 this.scrollbar.scrollToTop();
//             }
//         }
//     }
//
//     componentWillUnmount() {
//         window.removeEventListener('resize', this.measureAvailableHeight);
//         Mousetrap.unbind('esc');
//     }
//
//     closeGlossary() {
//         // close the glossary when the escape key is pressed for accessibility and general
//         // non-annoyance
//         // we are now also removing the glossary search param from the url when closing the
//         // glossary
//         // we will want to update this method when changing over to a functional component
//         this.props.hideGlossary();
//         // remove search param from url
//         if (this.props.history.location.search.includes('glossary')) {
//             this.props.history.replace({
//                 search: ''
//             });
//         }
//         // move focus back to the main content
//         const mainContent = document.getElementById('main-focus');
//         if (mainContent) {
//             mainContent.focus();
//         }
//     }
//
//     measureAvailableHeight() {
//         const sidebarHeight = this.sidebar.getBoundingClientRect().height;
//         const headerHeight = this.sidebarHeader.getBoundingClientRect().height;
//
//         const contentHeight = sidebarHeight - headerHeight;
//
//         this.setState({
//             contentHeight
//         });
//     }
//
//     renderThumb() {
//     // render a component to represent the current scroll position
//     // (on Macs, only visible when scroll bar settings are on "Always")
//         return (
//             <div className="glossary-scrollbar-thumb" />
//         );
//     }
//
//     renderTrack() {
//     // render a component within which the thumb moves as the scrollbar scrolls
//     // (on Macs, only visible when scroll bar settings are on "Always")
//         return (
//             <div className="glossary-scrollbar-track" />
//         );
//     }
//
//     render() {
//         let content = (<GlossarySearchResults
//             {...this.props}
//             updateContentHeight={this.updateContentHeight} />);
//
//         if (this.props.glossary.term.slug && this.props.glossary.term.slug !== '') {
//             content = (<GlossaryDefinition
//                 {...this.props}
//                 updateContentHeight={this.updateContentHeight} />);
//         }
//         else if (this.props.glossary.search.results.length === 0) {
//             content = <NoResults {...this.props} />;
//         }
//
//         let loading = null;
//         if (this.props.loading) {
//             loading = (
//                 <div className="glossary-loading-content">
//                     Loading Glossary...
//                 </div>
//             );
//             content = null;
//         }
//         else if (this.props.error) {
//             loading = (
//                 <div className="glossary-loading-content">
//                     Error: Could not load Glossary.
//                 </div>
//             );
//             content = null;
//         }
//
//         return (
//             <div className={`usa-da-glossary-wrapper ${this.props.zIndexClass}`}>
//                 <aside
//                     role="dialog"
//                     aria-labelledby="glossary-title"
//                     className="glossary-sidebar"
//                     ref={(div) => {
//                         this.sidebar = div;
//                     }}>
//                     <div
//                         className="glossary-header-wrapper"
//                         ref={(div) => {
//                             this.sidebarHeader = div;
//                         }}>
//                         <GlossaryHeader
//                             {...this.props}
//                             closeGlossary={this.closeGlossary} />
//                     </div>
//                     {loading}
//                     <Scrollbars
//                         style={{ height: this.state.contentHeight }}
//                         renderTrackVertical={this.renderTrack}
//                         renderThumbVertical={this.renderThumb}
//                         ref={(scrollbar) => {
//                             this.scrollbar = scrollbar;
//                         }}>
//                         {content}
//                     </Scrollbars>
//                 </aside>
//             </div>
//         );
//     }
// }

Glossary.propTypes = propTypes;
// export default withRouter(Glossary);
export default Glossary;
