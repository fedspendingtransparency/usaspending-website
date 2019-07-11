/**
 * IdvActivityVisualization.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { formatNumberWithPrecision } from 'helpers/moneyFormatter';
import { calculatePageRange } from 'helpers/paginationHelper';
import Pagination from 'components/sharedComponents/Pagination';
import Note from 'components/sharedComponents/Note';
import ActivityChart from './chart/ActivityChart';
import ActivityChartTooltip from './ActivityChartTooltip';


const propTypes = {
    page: PropTypes.number,
    total: PropTypes.number,
    limit: PropTypes.number,
    changePage: PropTypes.func,
    awards: PropTypes.array,
    xSeries: PropTypes.array,
    ySeries: PropTypes.array
};

export default class IdvActivityVisualization extends React.Component {
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
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.mouseIsInTooltipDiv = this.mouseIsInTooltipDiv.bind(this);
        this.mouseOutOfTooltipDiv = this.mouseOutOfTooltipDiv.bind(this);
        this.isOverspent = this.isOverspent.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

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

    isOverspent() {
        this.setState({ isOverspent: true });
    }

    showTooltip(data) {
        if (!this.state.isShowingTooltip) {
            this.setState({
                isShowingTooltip: true,
                toolTipData: data,
                showTooltipStroke: true,
                awardIndexForTooltip: data.index
            });
        }
    }

    hideTooltip() {
        if (!this.state.isHoveringInTooltip) {
            this.setState({
                isShowingTooltip: false,
                showTooltipStroke: false,
                awardIndexForTooltip: null
            });
        }
    }

    mouseIsInTooltipDiv(data) {
        this.setState({
            isShowingTooltip: true,
            isHoveringInTooltip: true,
            showTooltipStroke: true,
            awardIndexForTooltip: data.index
        });
    }

    mouseOutOfTooltipDiv() {
        this.setState({
            isShowingTooltip: false,
            isHoveringInTooltip: false,
            showTooltipStroke: false,
            awardIndexForTooltip: null
        }, () => this.hideTooltip());
    }

    render() {
        const height = 360;
        const message = `if an award has a zero or negative obligated amount,
        or is missing an end date, it is not displayed in this chart.`;
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
                isOverspent={this.isOverspent} />
        );
        let tt = null;
        if (this.state.isShowingTooltip) {
            tt = (<ActivityChartTooltip
                data={this.state.toolTipData}
                mouseIsInTooltipDiv={this.mouseIsInTooltipDiv}
                mouseOutOfTooltipDiv={this.mouseOutOfTooltipDiv} />);
        }
        const pageRange = calculatePageRange(this.props.page, this.props.limit, this.props.total);
        const start = formatNumberWithPrecision(pageRange.start, 0);
        const end = formatNumberWithPrecision(pageRange.end, 0);
        const resultsText = (
            <div className="pagination__totals">
                Displaying award orders <strong>{start}-{end}</strong> of {
                    formatNumberWithPrecision(this.props.total, 0)}
            </div>
        );
        return (
            <div
                ref={(widthRef) => {
                    this.sectionRef = widthRef;
                }}
                className="activity-visualization">
                <Pagination
                    onChangePage={this.props.changePage}
                    pageNumber={this.props.page}
                    totalItems={this.props.total}
                    pageSize={this.props.limit}
                    resultsText={resultsText} />
                {chart}
                {tt}
                <div className="visualization-legend">
                    <div
                        className="visualization-legend__circle
                        visualization-legend__circle_obligated" />
                    <div className="visualization-legend__label">
                        Obligated
                    </div>
                    <div className="visualization-legend__circle visualization-legend__circle" />
                    <div className="visualization-legend__label">
                        Funding Remaining
                    </div>
                    {this.state.isOverspent && <div
                        className="visualization-legend__circle
                        visualization-legend__circle_overspent" />}
                    {
                        this.state.isOverspent &&
                        <div className="visualization-legend__label">
                            Over Obligated
                        </div>
                    }
                </div>
                <div className="activity-visualization-note">
                    <Note message={message} />
                </div>
            </div>
        );
    }
}

IdvActivityVisualization.propTypes = propTypes;
