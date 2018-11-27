/**
 * FederalAccountChart.jsx
 * Created by Kevin Li 6/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleLeft, AngleRight } from 'components/sharedComponents/icons/Icons';
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
    labelWidth: PropTypes.number,
    page: PropTypes.number,
    changePage: PropTypes.func,
    isLastPage: PropTypes.bool
};

const rowHeight = 35;
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

        this.clickedNext = this.clickedNext.bind(this);
        this.clickedPrev = this.clickedPrev.bind(this);
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

    clickedNext() {
        if (this.props.loading || this.props.isLastPage) {
            return;
        }

        const nextPage = this.props.page + 1;
        this.props.changePage(nextPage);
    }

    clickedPrev() {
        if (this.props.loading) {
            return;
        }

        const nextPage = Math.max(1, this.props.page - 1);
        this.props.changePage(nextPage);
    }

    render() {
        let hideTooltip = '';
        if (!this.state.showTooltip) {
            hideTooltip = 'hide';
        }

        let hidePrevious = '';
        if (this.props.page === 1) {
            hidePrevious = 'hide';
        }

        let hideNext = '';
        if (this.props.isLastPage) {
            hideNext = 'hide';
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
                    height={(this.props.dataSeries.length * rowHeight) + axisHeight}
                    itemHeight={rowHeight}
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

                <div className="visualization-pager-container">
                    <div className="prev-page">
                        <button
                            className={`visualization-pager ${hidePrevious}`}
                            title="Show previous ten"
                            aria-label="Show previous ten"
                            onClick={this.clickedPrev}
                            disabled={this.props.loading || this.props.page === 1}>
                            <div className="pager-content">
                                <div className="icon">
                                    <AngleLeft alt="Show previous ten" />
                                </div>
                                <div className="pager-label">
                                    Show previous ten
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="next-page">
                        <button
                            className={`visualization-pager ${hideNext}`}
                            title="Show next ten"
                            aria-label="Show next ten"
                            onClick={this.clickedNext}
                            disabled={this.props.loading || this.props.isLastPage}>
                            <div className="pager-content">
                                <div className="pager-label next">
                                    Show next ten
                                </div>
                                <div className="icon">
                                    <AngleRight alt="Show next ten" />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className={`tooltip-wrapper ${hideTooltip}`}>
                    <FederalAccountTooltip
                        {...this.state.tooltip} />
                </div>
            </div>
        );
    }
}

FederalAccountChart.propTypes = propTypes;
