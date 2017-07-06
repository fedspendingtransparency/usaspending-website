/**
 * GeoCapitaTooltip.jsx
 * Created by Kevin Li 5/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as MapHelper from 'helpers/mapHelper';

const propTypes = {
    state: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    y: PropTypes.number,
    x: PropTypes.number,
    visualization: PropTypes.object,
    rank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rankCount: PropTypes.number,
    population: PropTypes.number
};

export default class GeoCapitaTooltip extends React.Component {
    componentDidMount() {
        this.positionTooltip();
    }
    componentDidUpdate() {
        this.positionTooltip();
    }

    positionTooltip() {
        // we need to wait for the tooltip to render before we can full position it due to its
        // dynamic width
        const tooltipWidth = this.div.offsetWidth;
        const containerX = this.containerDiv.getBoundingClientRect().left;
        const windowWidth = window.innerWidth;

        // determine the tooltip direction
        let direction = 'left';
        // // allow 20px padding
        if (tooltipWidth + containerX + this.props.x >= windowWidth - 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = -9;
        if (direction === 'right') {
            offset = 9 + tooltipWidth;
        }

        this.div.style.top = `${this.props.y - 15}px`;
        this.div.style.left = `${this.props.x - offset}px`;
        this.div.className = `tooltip ${direction}`;
        this.pointerDiv.className = `tooltip-pointer ${direction}`;
    }

    render() {
        const stateName = MapHelper.stateNameFromCode(this.props.state);
        const populationUnits = MoneyFormatter.calculateUnitForSingleValue(this.props.population);
        let displayedPopulation = this.props.population;
        if (populationUnits.unit > 1) {
            displayedPopulation = `${Math.round((this.props.population * 10) / populationUnits.unit) / 10} ${populationUnits.longLabel}`;
        }

        let formattedAmount = MoneyFormatter.formatMoney(this.props.value);
        if (isNaN(this.props.value)) {
            // handle N/A amounts
            formattedAmount = this.props.value;
        }

        return (
            <div
                className="visualization-tooltip"
                ref={(div) => {
                    this.containerDiv = div;
                }}>
                <div
                    className="tooltip"
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <div
                        className="tooltip-pointer"
                        ref={(div) => {
                            this.pointerDiv = div;
                        }} />
                    <div className="tooltip-title">
                        {stateName}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            <div className="tooltip-value">
                                {formattedAmount}
                            </div>
                            <div className="tooltip-label">
                                Per Capita Amount
                            </div>
                        </div>
                        <div className="tooltip-right">
                            <div className="tooltip-value">
                                {this.props.rank} of {this.props.rankCount}
                            </div>
                            <div className="tooltip-label">
                                Per Capita Rank
                            </div>
                        </div>
                    </div>
                    <div className="state-population">
                        Population of {stateName}:&nbsp; {displayedPopulation}
                    </div>
                </div>
            </div>
        );
    }
}

GeoCapitaTooltip.propTypes = propTypes;
