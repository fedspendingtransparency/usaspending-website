/**
 * FederalAccountChart.jsx
 * Created by Kevin Li 6/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import HorizontalChart from 'components/search/visualizations/rank/chart/HorizontalChart';
import BarChartLegend from 'components/search/visualizations/time/chart/BarChartLegend';

import FederalAccountTooltip from './FederalAccountTooltip';

const propTypes = {
    loading: PropTypes.bool,
    labelSeries: PropTypes.array,
    linkSeries: PropTypes.array,
    dataSeries: PropTypes.array,
    descriptions: PropTypes.array,
    width: PropTypes.number,
    labelWidth: PropTypes.number
};

const rowHeight = 60;
const axisHeight = 30;
const maxRows = 10;

export default class FederalAccountChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            tooltip: {
                label: '',
                value: 0,
                x: 0,
                y: 0
            }
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showTooltip(data) {
        this.setState({
            showTooltip: true,
            tooltip: data
        });
    }

    hideTooltip() {
        this.setState({
            showTooltip: false
        });
    }

    render() {
        let hideTooltip = '';
        if (!this.state.showTooltip) {
            hideTooltip = 'hide';
        }


        let isLoading = '';
        if (this.props.loading) {
            isLoading = 'loading-visualization';
        }

        const legend = [
            {
                color: '#597785',
                label: 'Obligated Amount',
                offset: 0
            }
        ];

        return (

            <div className={isLoading}>
                <HorizontalChart
                    labelSeries={this.props.labelSeries}
                    linkSeries={this.props.linkSeries}
                    dataSeries={this.props.dataSeries}
                    descriptions={this.props.descriptions}
                    height={(maxRows * rowHeight) + axisHeight}
                    minRows={maxRows}
                    width={this.props.width}
                    labelWidth={this.props.labelWidth}
                    selectItem={this.showTooltip}
                    deselectItem={this.hideTooltip}
                    urlRoot="#/federal_account/" />
                <svg className="horizontal-bar">
                    <g className="legend-container">
                        <BarChartLegend legend={legend} />
                    </g>
                </svg>

                <div className={`tooltip-wrapper ${hideTooltip}`}>
                    <FederalAccountTooltip
                        {...this.state.tooltip} />
                </div>
            </div>
        );
    }
}

FederalAccountChart.propTypes = propTypes;
