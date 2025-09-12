/**
 * IdvActivityVisualization.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash-es';
import { Pagination, NewPicker } from 'data-transparency-ui';
import { formatNumberWithPrecision } from 'helpers/moneyFormatter';
import { calculatePageRange } from 'helpers/paginationHelper';
import Note from 'components/sharedComponents/Note';
import ActivityChart from './chart/ActivityChart';
import ActivityChartTooltip from './ActivityChartTooltip';

export default class IdvActivityVisualization extends React.Component {
    static propTypes = {
        page: PropTypes.number,
        total: PropTypes.number,
        limit: PropTypes.number,
        changePage: PropTypes.func,
        awards: PropTypes.array,
        xSeries: PropTypes.array,
        ySeries: PropTypes.array,
        selectedItemFunc: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            isShowingTooltip: false,
            isHoveringInTooltip: false,
            toolTipData: null,
            awards: props.awards,
            showTooltipStroke: false,
            awardIndexForTooltip: null,
            isOverspent: false
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    setOverspent = () => {
        this.setState({ isOverspent: true });
    };

    handleWindowResize() {
    // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            this.setState({
                windowWidth,
                visualizationWidth: this.sectionRef.offsetWidth
            });
        }
    }

    showTooltip = (data) => {
        if (!this.state.isShowingTooltip) {
            this.setState({
                isShowingTooltip: true,
                toolTipData: data,
                showTooltipStroke: true,
                awardIndexForTooltip: data.index
            });
        }
    };

    hideTooltip = () => {
        if (!this.state.isHoveringInTooltip) {
            this.setState({
                isShowingTooltip: false,
                showTooltipStroke: false,
                awardIndexForTooltip: null
            });
        }
    };

    mouseIsInTooltipDiv = (data) => {
        this.setState({
            isShowingTooltip: true,
            isHoveringInTooltip: true,
            showTooltipStroke: true,
            awardIndexForTooltip: data.index
        });
    };

    mouseOutOfTooltipDiv = () => {
        this.setState(
            {
                isShowingTooltip: false,
                isHoveringInTooltip: false,
                showTooltipStroke: false,
                awardIndexForTooltip: null
            },
            () => this.hideTooltip()
        );
    };

    createMenuData = () => [
        {
            name: "10",
            value: 10,
            key: "10",
            onClick: this.props.selectedItemFunc
        },
        {
            name: "50",
            value: 50,
            key: "50",
            onClick: this.props.selectedItemFunc
        },
        {
            name: "100",
            value: 100,
            key: "100",
            onClick: this.props.selectedItemFunc
        }
    ];

    render() {
        const height = 360;
        const message = `if an award has a zero or negative obligated amount,
        or is missing a start and/or end date, it is not displayed in this chart.`;
        const chart = (
            <ActivityChart
                awards={this.state.awards}
                showTooltipStroke={this.state.showTooltipStroke}
                awardIndexForTooltip={this.state.awardIndexForTooltip}
                xSeries={this.props.xSeries}
                ySeries={this.props.ySeries}
                height={height}
                width={this.state.visualizationWidth}
                showTooltip={this.showTooltip}
                hideTooltip={this.hideTooltip}
                setOverspent={this.setOverspent} />
        );
        let tt = null;
        if (this.state.isShowingTooltip) {
            tt = (
                <ActivityChartTooltip
                    data={this.state.toolTipData}
                    mouseIsInTooltipDiv={this.mouseIsInTooltipDiv}
                    mouseOutOfTooltipDiv={this.mouseOutOfTooltipDiv} />
            );
        }
        const pageRange = calculatePageRange(this.props.page, this.props.limit, this.props.total);
        const start = formatNumberWithPrecision(pageRange.start, 0);
        const end = formatNumberWithPrecision(pageRange.end, 0);
        const menuData = this.createMenuData();
        const resultsText = (
            <div className="pagination__totals">
                Displaying award orders{" "}
                <span className="current-page-numbers">
                    {start}-{end}
                </span>{" "}
                of {formatNumberWithPrecision(this.props.total, 0)}
            </div>
        );
        return (
            <div
                ref={(widthRef) => {
                    this.sectionRef = widthRef;
                }}
                className="activity-visualization">
                <div className="activity-visualization-title">Award Amounts and Periods of Performance of Award Orders</div>
                {chart}
                {tt}
                <div className="activity-x-label">Period of Performance</div>
                <div className="visualization-legend">
                    <div className="visualization-legend__item">
                        <div
                            className="visualization-legend__circle
                            visualization-legend__circle_obligated" />
                        <div className="visualization-legend__label">% Obligated of Potential Award Amount</div>
                    </div>
                    <div className="visualization-legend__item">
                        <div className="visualization-legend__circle visualization-legend__circle" />
                        <div className="visualization-legend__label">% of Potential Funding Remaining</div>
                    </div>
                    {this.state.isOverspent && (
                        <div className="visualization-legend__item">
                            <div
                                className="visualization-legend__circle
                                visualization-legend__circle_overspent" />
                            <div className="visualization-legend__label">Over Obligated</div>
                        </div>
                    )}
                </div>
                <Pagination
                    changePage={this.props.changePage}
                    currentPage={this.props.page}
                    totalItems={this.props.total}
                    pageSize={this.props.limit}
                    resultsText={resultsText} />
                <div className="idv__picker-wrapper">
                    <NewPicker
                        label="Show"
                        size="sm"
                        classname="default-picker"
                        dropdownClassname="default-picker__list"
                        buttonClassname="default-picker__button"
                        enabled
                        selectedOption={menuData.length ? menuData.find((option) => option.value === this.props.limit).name : this.props.limit}
                        options={menuData}
                        sortFn={(a, b) => a - b} /><span className="default-picker__append">per page</span>
                </div>
                <div className="activity-visualization-note">
                    <Note message={message} />
                </div>
            </div>
        );
    }
}
