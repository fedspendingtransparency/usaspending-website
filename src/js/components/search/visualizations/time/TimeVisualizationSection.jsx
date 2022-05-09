/**
  * TimeVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, capitalize } from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TooltipWrapper } from 'data-transparency-ui';
import { fullMonthFromAbbr } from 'helpers/monthHelper';
import { isIe } from 'helpers/browser';
import TimeVisualization from './TimeVisualization';
import TimeVisualizationPeriodButton from './TimeVisualizationPeriodButton';

const propTypes = {
    data: PropTypes.object,
    updateVisualizationPeriod: PropTypes.func,
    visualizationPeriod: PropTypes.string
};

export default class TimeVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    getDownloadData = () => {
        const headers = [];
        headers.fiscal_year = 'fiscal_year,total_obligations\n';
        headers.quarter = 'fiscal_year,fiscal_quarter,total_obligations\n';
        headers.month = 'fiscal_year,month,total_obligations\n';
        const data = this.props.data;

        return headers[data.visualizationPeriod].concat(
            data.rawLabels.map((label, i) => {
                if (data.visualizationPeriod === 'fiscal_year') {
                    return `${label.year},${data.ySeries[i][0]}`;
                }
                if (!label.period) { // API still updating data
                    return null;
                }
                if (data.visualizationPeriod === 'quarter') {
                    return `${label.year},${label.period[1]},${data.ySeries[i][0]}`;
                }
                const month = fullMonthFromAbbr(label.period);
                return `${['Oct', 'Nov', 'Dec'].indexOf(label.period) > -1 ? parseInt(label.year, 10) + 1 : label.year},${month},${data.ySeries[i][0]}`;
            })
                .join('\n')
        );
    };

    downloadTooltip = () => (
        <>
            <div className="tooltip__title">Download data by {capitalize(this.props.data.visualizationPeriod === 'fiscal_year' ? 'year' : this.props.data.visualizationPeriod)}</div>
            <div className="tooltip__text">
                Download a CSV of award spending data that matches your search criteria, broken down by {this.props.data.visualizationPeriod === 'fiscal_year' ? 'year' : this.props.data.visualizationPeriod}. For complete download results, click on the &quot;Download&quot; button on the top right of this page.
            </div>
        </>
    );

    handleWindowResize() {
    // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            this.setState({
                windowWidth,
                visualizationWidth: this.sectionHr.offsetWidth
            });
        }
    }

    // eslint-disable-next-line no-undef
    downloadBlob = () => new Blob([this.getDownloadData()], { type: 'text/csv;charset=utf-8;' });

    renderDownloadLink = () => (isIe() ?
        (
            <button onClick={() => {
                window.navigator.msSaveOrOpenBlob(this.downloadBlob(), 'spending-over-time.csv');
            }}>
                <FontAwesomeIcon icon="download" size="lg" />
                <span className="text">
                    Download data by {capitalize(this.props.data.visualizationPeriod === 'fiscal_year' ? 'year' : this.props.data.visualizationPeriod)}
                </span>
            </button>
        ) : (
            <a
                href={URL.createObjectURL(this.downloadBlob())}
                download="spending-over-time.csv" >
                <FontAwesomeIcon icon="download" size="lg" />
                <span className="text">
                Download data by {capitalize(this.props.data.visualizationPeriod === 'fiscal_year' ? 'year' : this.props.data.visualizationPeriod)}
                </span>
            </a>
        )
    );

    render() {
        return (
            <section
                className="results-visualization-time-section"
                id="results-section-time"
                aria-label="Spending Over Time">
                <h2 className="visualization-title">
                    Spending Over Time
                </h2>
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />

                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            Spot trends in spending over your chosen time period. Break down your results by years, quarters, or months, and hover over the bars for more detailed information.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="fiscal_year"
                                        label="Years"
                                        active={this.props.data.visualizationPeriod === 'fiscal_year'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="quarter"
                                        label="Quarters"
                                        active={this.props.data.visualizationPeriod === 'quarter'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="month"
                                        label="Months"
                                        active={this.props.data.visualizationPeriod === 'month'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                            </ul>
                        </div>
                        <div className="download">
                            {!this.props.data.loading && this.renderDownloadLink()}
                            {!this.props.data.loading && <TooltipWrapper className="tooltip-wrapper" icon="info" tooltipPosition="left" tooltipComponent={this.downloadTooltip()} />}
                        </div>
                    </div>
                </div>
                <TimeVisualization
                    {...this.props.data}
                    width={this.state.visualizationWidth} />
            </section>
        );
    }
}

TimeVisualizationSection.propTypes = propTypes;
