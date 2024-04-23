/**
 * AccountTimeVisualizationSection.jsx
 * Created by Kevin Li 3/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { SectionHeader } from "data-transparency-ui";
import AccountTimeVisualizationPeriodButton from './AccountTimeVisualizationPeriodButton';

import TimeVisualization from './TimeVisualization';

const propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    visualizationPeriod: PropTypes.string,
    changePeriod: PropTypes.func,
    hasFilteredObligated: PropTypes.bool
};

export default class AccountTimeVisualizationSection extends React.Component {
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
            <div
                className="results-visualization-time-section"
                id="results-section-time">
                <SectionHeader
                    title="Spending Over Time"
                    titleTooltip={{ component: false }}
                    descTooltip={{ component: false }} />
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />

                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            Spot trends in spending over your chosen time period. Filter your
                            results more (at left) and watch this graph update automatically. Break
                            down your results by years or quarters.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <AccountTimeVisualizationPeriodButton
                                        value="year"
                                        label="Years"
                                        active={this.props.visualizationPeriod === 'year'}
                                        changePeriod={this.props.changePeriod} />
                                </li>
                                <li>
                                    <AccountTimeVisualizationPeriodButton
                                        value="quarter"
                                        label="Quarters"
                                        active={this.props.visualizationPeriod === 'quarter'}
                                        changePeriod={this.props.changePeriod} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <TimeVisualization
                    loading={this.props.loading}
                    data={this.props.data}
                    width={this.state.visualizationWidth}
                    hasFilteredObligated={this.props.hasFilteredObligated} />
            </div>
        );
    }
}

AccountTimeVisualizationSection.propTypes = propTypes;
