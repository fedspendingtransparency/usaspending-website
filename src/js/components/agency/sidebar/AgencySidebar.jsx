/**
 * AgencySidebar.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import { throttle } from 'lodash';

import SidebarLink from './SidebarLink';

const propTypes = {
    active: React.PropTypes.string,
    sections: React.PropTypes.array,
    jumpToSection: React.PropTypes.func
};

export default class AgencySidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldFloat: false,
            sidebarWidth: 0,
            floatPoint: 0
        };

        this.lastY = null;
        this.windowDidScroll = throttle(this.windowDidScroll.bind(this), 16);
        this.measureSidebarWidth = this.measureSidebarWidth.bind(this);
    }

    componentDidMount() {
        this.measureSidebarWidth();
        window.addEventListener('scroll', this.windowDidScroll);
        window.addEventListener('resize', this.measureSidebarWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.windowDidScroll);
        window.removeEventListener('resize', this.measureSidebarWidth);
    }

    measureSidebarWidth() {
        // measure the reference div
        let targetElement = this.referenceDiv;
        if (!this.state.shouldFloat) {
            // sidebar isn't floating, so measure that instead
            targetElement = this.div;
        }

        const width = targetElement.offsetWidth;
        // also measure the Y position at which to float the sidebar
        const floatPoint = targetElement.offsetTop - 60;

        this.setState({
            floatPoint,
            sidebarWidth: width
        }, () => {
            if (this.state.shouldFloat) {
                // when the sidebar floats it calls outside of the grid layout, so
                // programmatically force it to the correct width
                this.div.style.width = `${width}px`;
            }
        });
    }

    windowDidScroll() {
        // check where the sidebar is in the viewport
        if (!this.div || !this.referenceDiv) {
            // the DOM element is missing!
            return;
        }


        let shouldFloat = false;
        const yPos = window.scrollY || window.pageYOffset;
        if (yPos > this.state.floatPoint) {
            // it needs to float because the sidebar is less than 60px from the top or out of view
            shouldFloat = true;
        }

        if (shouldFloat !== this.state.shouldFloat) {
            this.setState({
                shouldFloat
            }, () => {
                if (shouldFloat) {
                    // when the sidebar floats it calls outside of the grid layout, so
                    // programmatically force it to the correct width
                    this.div.style.width = `${this.state.sidebarWidth}px`;
                }
            });
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

        let floatSidebar = '';
        if (this.state.shouldFloat) {
            floatSidebar = 'float-sidebar';
        }

        return (
            <div>
                <div
                    className={`agency-sidebar-reference ${floatSidebar}`}
                    ref={(div) => {
                        // this is an empty div that does not float with the page so we can track
                        // the inline/non-floating Y position of the sidebar
                        this.referenceDiv = div;
                    }}>
                    &nbsp;
                </div>
                <div
                    className={`agency-sidebar-content ${floatSidebar}`}
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
