/**
  * TimeVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import TimeVisualization from './TimeVisualization';
import TimeVisualizationPeriodButton from './TimeVisualizationPeriodButton';
import { capitalize } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import { TooltipWrapper } from 'data-transparency-ui';

const propTypes = {
    data: PropTypes.object,
    updateVisualizationPeriod: PropTypes.func,
    visualizationPeriod: PropTypes.string
};

const downloadTooltip = (
    <div>
        <div className='tooltip__text'>title?</div>
        <div className='tooltip__text'>words</div>
    </div>
);

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

    downloadLabel() {
        let periodLabel;
        if (this.props.data.visualizationPeriod === 'fiscal_year') {
            periodLabel = 'Year';
        } else {
            periodLabel = capitalize(this.props.data.visualizationPeriod);
        }
        return `Download data by ${periodLabel}`;
    }

    downloadData() {
        let data = this.props.data;
        if (!data.rawLabels) {
            return []; // no data
        } else {
            let ret = [];

    console.log(data);

            if (data.visualizationPeriod === 'fiscal_year') {
                ret[0] = ['fiscal_year', 'total_obligations'];
            } else {


// timing issue here                


                if (!data.rawLabels.period) {
                    return []; // data still settling; wait
                } else {
                    if (data.visualizationPeriod === 'quarter') {
                        ret[0] = ['fiscal_year', 'fiscal_quarter', 'total_obligations'];
                    } else {
                        ret[0] = ['fiscal_year', 'month', 'total_obligations'];
                    }
                }
            }

console.log(ret);

            for (let i = 0; i < data.rawLabels.length; i++) {
                if (data.visualizationPeriod === 'fiscal_year') {
                    ret[i + 1] = [data.rawLabels[i].year, data.ySeries[i]];
                } else if (data.visualizationPeriod === 'quarter') {
                    ret[i + 1] = [data.rawLabels[i].year, data.rawLabels[i].period, data.ySeries[i]];
                } else {
                    ret[i + 1] = [data.rawLabels[i].year, data.rawLabels[i].period, data.ySeries[i]];
                }
            }

            console.log(ret);
                        
            return ret;
        }
    }

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
                        <div className='download'>
                            <button>
                                <FontAwesomeIcon icon='download' size='lg' />
                                <CSVLink data={this.downloadData()} filename='my-file.csv' className='text'>{this.downloadLabel()}</CSVLink>
                            </button>
                            <TooltipWrapper className='tooltip-wrapper' icon='info' tooltipPosition='left' tooltipComponent={downloadTooltip} />
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
