/**
 * DetailsTooltip.jsx
 * Created by Lizzie Salita 5/8/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeTooltip: PropTypes.func,
    showInfoTooltip: PropTypes.bool
};

export default class DetailsTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.props.showInfoTooltip && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.closeTooltip();
        }
    }

    render() {
        return (
            <div
                ref={this.setWrapperRef}
                onBlur={this.props.closeTooltip}
                onMouseLeave={this.props.closeTooltip}
                className="state-overview-tooltip"
                style={{
                    top: 44,
                    left: 100
                }}>
                <div className="state-overview-tooltip__info_icon">
                    <Icons.InfoCircle />
                </div>
                <div className="state-overview-tooltip__text_holder">
                    <div className="state-overview-tooltip__tooltip_title">
                        Data Sources
                    </div>
                    <div className="state-overview-tooltip__tooltip_text">
                        <p>
                            The amounts used are based on U.S. Census data of specific years noted in parentheses.
                        </p>
                        <p>
                            <strong>Awarded Amount Per Capita</strong> is calculated using the Total Award Amount of the
                            selected time period, divided by the population amount shown in the table.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

DetailsTooltip.propTypes = propTypes;
