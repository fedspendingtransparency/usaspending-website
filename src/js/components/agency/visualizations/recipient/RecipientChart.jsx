/**
 * RecipientChart.jsx
 * Created by Kevin Li 6/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleLeft, AngleRight } from 'components/sharedComponents/icons/Icons';
import HorizontalChart from 'components/search/visualizations/rank/chart/HorizontalChart';

import RecipientTooltip from './RecipientTooltip';

const propTypes = {
    loading: PropTypes.bool,
    labelSeries: PropTypes.array,
    dataSeries: PropTypes.array,
    descriptions: PropTypes.array,
    width: PropTypes.number,
    labelWidth: PropTypes.number,
    page: PropTypes.number,
    changePage: PropTypes.func,
    isLastPage: PropTypes.bool
};

const rowHeight = 60;
const axisHeight = 30;
const maxRows = 10;

export default class RecipientChart extends React.Component {
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

        return (
            <div className={`${isLoading}`}>
                <HorizontalChart
                    labelSeries={this.props.labelSeries}
                    dataSeries={this.props.dataSeries}
                    descriptions={this.props.descriptions}
                    height={(maxRows * rowHeight) + axisHeight}
                    minRows={maxRows}
                    width={this.props.width}
                    labelWidth={this.props.labelWidth}
                    selectItem={this.showTooltip}
                    deselectItem={this.hideTooltip} />

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
                    <RecipientTooltip
                        {...this.state.tooltip} />
                </div>
            </div>
        );
    }
}

RecipientChart.propTypes = propTypes;
