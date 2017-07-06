/**
 * AgencySidebar.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import SidebarLink from './SidebarLink';

const propTypes = {
    active: PropTypes.string,
    sections: PropTypes.array,
    jumpToSection: PropTypes.func
};

export default class AgencySidebar extends React.Component {
    constructor(props) {
        super(props);

        this.lastY = null;
        this.windowDidScroll = throttle(this.windowDidScroll.bind(this), 12);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.windowDidScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.windowDidScroll);
    }

    windowDidScroll() {
        // check where the sidebar is in the viewport
        if (!this.div || !this.referenceDiv) {
            // the DOM element is missing!
            return;
        }

        if (this.lastY === window.scrollY) {
            // no position change
            return;
        }

        this.lastY = window.scrollY;

        let shouldFloat = false;

        const divPos = this.referenceDiv.getBoundingClientRect().top;
        if (divPos < 60) {
            // it needs to float because the sidebar is less than 60px from the top or out of view
            shouldFloat = true;
        }

        if (shouldFloat) {
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            const originalPos = this.referenceDiv.offsetTop;
            // the Y offset is 60px lower to ensure the current page padding is maintained
            const offsetPos = (scrollPos - originalPos) + 60;
            this.div.style.transform = `translate(0px,${offsetPos}px)`;
        }
        else {
            this.div.style.transform = null;
        }
    }

    render() {
        const items = this.props.sections.map((section) => (
            <li key={section.section}>
                <SidebarLink
                    section={section.section}
                    label={section.label}
                    active={this.props.active}
                    onClick={this.props.jumpToSection} />
            </li>
        ));

        return (
            <div>
                <div
                    ref={(div) => {
                        // this is an empty div that does not float with the page so we can track
                        // the inline/non-floating Y position of the sidebar
                        this.referenceDiv = div;
                    }} />
                <div
                    className="agency-sidebar-content"
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <ul>
                        { items }
                    </ul>
                </div>
            </div>
        );
    }
}

AgencySidebar.propTypes = propTypes;
