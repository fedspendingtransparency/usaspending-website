/**
 * IdvActivityVisualization.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import Pagination from 'components/sharedComponents/Pagination';
import ActivityChart from './chart/ActivityChart';
import ActivityChartTooltip from './ActivityChartTooltip';


const propTypes = {
    page: PropTypes.number,
    total: PropTypes.number,
    count: PropTypes.number,
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
            toolTipData: null
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
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

    showTooltip(position, data) {
        this.setState({
            isShowingTooltip: true,
            toolTipData: data
        });
    }

    hideTooltip() {
        this.setState({
            isShowingTooltip: false
        });
    }

    render() {
        const height = 360;
        const chart = (
            <ActivityChart
                awards={this.props.awards}
                xSeries={this.props.xSeries}
                ySeries={this.props.ySeries}
                height={height}
                width={this.state.visualizationWidth}
                showTooltip={this.showTooltip}
                hideTooltip={this.hideTooltip} />
        );
        let tt = null;
        if (this.state.isShowingTooltip) {
            tt = (<ActivityChartTooltip data={this.state.toolTipData} />);
        }
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
                    pageSize={this.props.count} />
                {chart}
                <div className="visualization-legend">
                    <div className="visualization-legend__circle visualization-legend__circle_obligated" />
                    <div className="visualization-legend__label">
                        Obligated
                    </div>
                    <div className="visualization-legend__circle visualization-legend__circle" />
                    <div className="visualization-legend__label">
                        Funding Remaining
                    </div>
                </div>
                {tt}
            </div>
        );
    }
}

IdvActivityVisualization.propTypes = propTypes;
