/**
 * RootHeader.jsx
 * Created by Kevin Li 8/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';


import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import { TooltipWrapper } from 'data-transparency-ui';
import { formatTreemapValues } from 'helpers/moneyFormatter';
import { generateSingular } from 'helpers/singularityHelper';
import { ExplorerInfoToolTip } from './../../../award/shared/InfoTooltipContent';

const dayjs = require('dayjs');

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
                        <>FY {this.props.fy} obligated amount</>
                        <TooltipWrapper
                            className="award-section-tt"
                            icon="info"
                            tooltipPosition="left"
                            tooltipComponent={ExplorerInfoToolTip} />

                    </div>
                    <div className="detail-header__value">
                        {this.props.isLoading ? '--' : formatTreemapValues(this.props.total)}
                    </div>
                    <div className="detail-header__update">
                        Data as of {dayjs(this.props.lastUpdate, 'YYYY-MM-DD').format('MMMM D, YYYY')}
                    </div>
                </div>
            </div>
        );
    }
}

RootHeader.propTypes = propTypes;
