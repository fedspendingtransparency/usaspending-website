/**
 * ExplorerInfoTooltip.jsx
 * Created by David Trinh on 6/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeTooltip: PropTypes.func,
    showInfoTooltip: PropTypes.bool
};


const margin = 15;
const tooltipPadding = 6;

export default class ExplorerInfoTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            iconTop: 0,
            iconRight: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    getPosition() {
        const icon = document.getElementById('detail-header__icon');
        const iconTop = icon.offsetHeight + tooltipPadding;
        const iconRight = icon.offsetWidth - margin;

        return { iconTop, iconRight };
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.props.showInfoTooltip && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.closeTooltip();
        }
    }

    handleWindowResize() {
    // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            const position = this.getPosition();

            this.setState({
                windowWidth,
                iconTop: position.iconTop,
                iconRight: position.iconRight
            });
        }
    }

    render() {
        return (
            <div
                ref={this.setWrapperRef}
                className="homepage-hero-tooltip"
                style={{
                    top: this.state.iconTop,
                    right: this.state.iconRight
                }}>
                <div className="homepage-hero-tooltip__info_icon">
                    <Icons.InfoCircle />
                </div>
                <div className="homepage-hero-tooltip__text_holder">
                    <div className="homepage-hero-tooltip__tooltip_title">
                        Data Source:
                    </div>
                    <div className="homepage-hero-tooltip__tooltip_text">
                        The sum of line 2190 across all remaining accounts in the
                        <em> GTAS SF 133 Report on Budget Execution and Budgetary Resources </em>
                        for this period, after excluding loan financing accounts. Loan program
                        accounts <u>are</u> included.
                    </div>
                </div>
            </div>
        );
    }
}

ExplorerInfoTooltip.propTypes = propTypes;
