/**
  * TimeVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import _ from 'lodash';

import TimeVisualization from './TimeVisualization';
import TimeVisualizationPeriodButton from './TimeVisualizationPeriodButton';

export default class TimeVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationPeriod: 'year'
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.changePeriod = this.changePeriod.bind(this);
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

    changePeriod(period) {

    }

    render() {
        return (
            <div
                className="results-visualization-time-section"
                id="results-section-time">
                <h3>Spending Over Time</h3>
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
                            down your results by years, quarters, or months.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="year"
                                        label="Years"
                                        active={this.state.visualizationPeriod === 'year'}
                                        changePeriod={this.changePeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="quarter"
                                        label="Quarters"
                                        active={this.state.visualizationPeriod === 'quarter'}
                                        changePeriod={this.changePeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="month"
                                        label="Months"
                                        active={this.state.visualizationPeriod === 'month'}
                                        changePeriod={this.changePeriod} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <TimeVisualization width={this.state.visualizationWidth} />
            </div>
        );
    }
}
