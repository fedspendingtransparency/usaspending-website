/**
 * StateTimeVisualizationSection.jsx
 * Created by David Trinh 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionHeader } from 'data-transparency-ui';

import TimeVisualizationPeriodButton from 'components/search/visualizations/time/TimeVisualizationPeriodButton';
import StateTimeVisualization from './StateTimeVisualization';

const propTypes = {
    data: PropTypes.object,
    xSeries: PropTypes.array,
    loading: PropTypes.bool,
    visualizationPeriod: PropTypes.string,
    updateVisualizationPeriod: PropTypes.func
};

export default class StateTimeVisualizationSection extends React.Component {
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

    render() {
        return (
            <section
                id="state-transactions-over-time"
                className="state-section transactions-over-time">
                <SectionHeader
                    icon={<FontAwesomeIcon icon="chart-bar" size="2x" />}
                    title="Transactions Over Time"
                    titleTooltip={{ component: false }}
                    descTooltip={{ component: false }} />
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />
                <div className="state-section__description">
                    The graph below shows trends over time for amounts awarded to this state. Break down the amounts by years, quarters, or months, and hover over the bars for more detailed information.
                </div>
                <div className="state-visualization-period">
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
                                        label="Quarter"
                                        active={this.props.data.visualizationPeriod === 'quarter'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="month"
                                        label="Month"
                                        active={this.props.data.visualizationPeriod === 'month'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <StateTimeVisualization
                    visualizationPeriod={this.props.visualizationPeriod}
                    loading={this.props.loading}
                    data={this.props.data}
                    width={this.state.visualizationWidth}
                    color="#708893" />
            </section>
        );
    }
}

StateTimeVisualizationSection.propTypes = propTypes;
