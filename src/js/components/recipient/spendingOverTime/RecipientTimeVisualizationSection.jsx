/**
 * RecipientTimeVisualizationSection.jsx
 * Created by Lizzie Salita 7/6/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionHeader } from "data-transparency-ui";

import TimeVisualizationPeriodButton from 'components/search/visualizations/time/TimeVisualizationPeriodButton';
import RecipientTimeVisualization from './RecipientTimeVisualization';

const propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    visualizationPeriod: PropTypes.string,
    updateVisualizationPeriod: PropTypes.func
};

export default class RecipientTimeVisualizationSection extends React.Component {
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
                id="recipient-transactions-over-time"
                className="recipient-section transactions-over-time">
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
                <div className="recipient-section__description">
                    This graph shows trends over time for all transactions to this recipient.
                    Hover over the bars for more detailed information.
                </div>
                <div className="recipient-visualization-period">
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="fiscal_year"
                                        label="Years"
                                        active={this.props.visualizationPeriod === 'fiscal_year'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="quarter"
                                        label="Quarter"
                                        active={this.props.visualizationPeriod === 'quarter'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="month"
                                        label="Month"
                                        active={this.props.visualizationPeriod === 'month'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <RecipientTimeVisualization
                    visualizationPeriod={this.props.visualizationPeriod}
                    loading={this.props.loading}
                    error={this.props.error}
                    data={this.props.data}
                    width={this.state.visualizationWidth}
                    color="#141D3B" />
            </section>
        );
    }
}

RecipientTimeVisualizationSection.propTypes = propTypes;
