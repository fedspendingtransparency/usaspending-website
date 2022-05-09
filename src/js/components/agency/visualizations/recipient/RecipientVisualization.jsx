/**
 * RecipientVisualization.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ChartMessage from 'components/search/visualizations/rank/RankVisualizationChartMessage';

import ScopeList from './ScopeList';
import RecipientChart from './RecipientChart';

const propTypes = {
    activeFY: PropTypes.string,
    loading: PropTypes.bool,
    isInitialLoad: PropTypes.bool,
    error: PropTypes.bool,
    scope: PropTypes.string,
    changeScope: PropTypes.func,
    labelSeries: PropTypes.array,
    dataSeries: PropTypes.array,
    descriptions: PropTypes.array,
    page: PropTypes.number,
    isLastPage: PropTypes.bool,
    changePage: PropTypes.func,
    lastUpdate: PropTypes.string
};


export default class RecipientVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            labelWidth: 0
        };

        this.handleWindowResize = this.handleWindowResize.bind(this);
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
                visualizationWidth: this.sectionHr.offsetWidth,
                labelWidth: Math.min(this.sectionHr.offsetWidth / 3, 270)
            });
        }
    }

    render() {
        let chart = null;
        if (this.props.loading && this.props.isInitialLoad) {
            // initial load
            chart = (<ChartMessage message="Loading data..." />);
        }
        else if (this.props.error) {
            // error
            chart = (<ChartMessage message="An error occurred." />);
        }
        else if (this.props.dataSeries.length === 0) {
            // no data
            chart = (<ChartMessage message="No data to display." />);
        }
        else {
            chart = (<RecipientChart
                loading={this.props.loading}
                labelSeries={this.props.labelSeries}
                dataSeries={this.props.dataSeries}
                descriptions={this.props.descriptions}
                width={this.state.visualizationWidth}
                labelWidth={this.state.labelWidth}
                page={this.props.page}
                isLastPage={this.props.isLastPage}
                changePage={this.props.changePage} />);
        }

        return (
            <div
                className="agency-section-wrapper"
                id="agency-recipients">
                <div className="agency-section-title">
                    <h4>Recipients</h4>
                    <hr
                        className="results-divider"
                        ref={(hr) => {
                            this.sectionHr = hr;
                        }} />
                    <em>FY {this.props.activeFY} data reported through {this.props.lastUpdate}</em>
                </div>
                <div className="agency-callout-description">
                    {`A primary way agencies implement their programs is by awarding money to \
companies, organizations, individuals, or government entities (i.e. state, local, tribal, federal, \
or foreign). Here is a look at who these recipients are and how they rank by award type.`}
                </div>
                <div className="agency-section-content">
                    <ScopeList
                        scope={this.props.scope}
                        changeScope={this.props.changeScope} />
                    <div className="chart-wrapper">
                        {chart}
                    </div>
                </div>
            </div>
        );
    }
}

RecipientVisualization.propTypes = propTypes;
