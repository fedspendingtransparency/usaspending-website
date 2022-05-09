/**
 * RootHeader.jsx
 * Created by Kevin Li 8/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import { formatTreemapValues } from 'helpers/moneyFormatter';
import { generateSingular } from 'helpers/singularityHelper';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import ExplorerInfoToolTip from 'components/explorer/detail/ExplorerInfoTooltip';

const propTypes = {
    isLoading: PropTypes.bool,
    root: PropTypes.string,
    fy: PropTypes.string,
    total: PropTypes.number,
    lastUpdate: PropTypes.string
};

export default class RootHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
    }

    showTooltip() {
        this.setState({
            showInfoTooltip: true
        });
    }

    closeTooltip() {
        this.setState({
            showInfoTooltip: false
        });
    }

    render() {
        let tooltip = null;
        if (this.state.showInfoTooltip) {
            tooltip = (
                <ExplorerInfoToolTip
                    showInfoTooltip={this.state.showInfoTooltip}
                    closeTooltip={this.closeTooltip} />
            );
        }

        const type = sidebarTypes[this.props.root];
        const header = (
            <div className="detail-header__labels">
                <h2 className="detail-header__title">
                    You are viewing FY {this.props.fy} spending
                    by <span className="detail-header__title detail-header__title_capitalize">{type}</span>
                </h2>
                <div className="detail-header__instructions">
                    Choose {generateSingular(type, false)} {type.toLowerCase()} below to start
                    your exploration.
                </div>
            </div>);
        return (
            <div className="detail-header" id="detail-header">
                {header}
                <div className="detail-header__amounts">
                    <div className="detail-header__fy">
                            FY {this.props.fy} obligated amount
                        <span>
                            <button
                                id="detail-header__icon"
                                onMouseLeave={this.closeTooltip}
                                onBlur={this.closeTooltip}
                                className="detail-header__icon"
                                onFocus={this.showTooltip}
                                onMouseEnter={this.showTooltip}
                                onClick={this.showTooltip}>
                                <InfoCircle alt="Information" />
                            </button>
                        </span>
                    </div>
                    {tooltip}
                    <div className="detail-header__value">
                        {this.props.isLoading ? '--' : formatTreemapValues(this.props.total)}
                    </div>
                    <div className="detail-header__update">
                        Data as of {moment(this.props.lastUpdate, 'YYYY-MM-DD').format('MMMM D, YYYY')}
                    </div>
                </div>
            </div>
        );
    }
}

RootHeader.propTypes = propTypes;
