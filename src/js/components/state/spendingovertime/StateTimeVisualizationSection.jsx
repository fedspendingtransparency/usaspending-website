/**
 * StateTimeVisualizationSection.jsx
 * Created by David Trinh 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import StateTimeVisualizationPeriodButton from './StateTimeVisualizationPeriodButton';

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
                className="state-visualization-time-section">
                <h3 className="state-visualization__title">Awards Over Time</h3>
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />
                <div className="state-visualization-top">
                    <div className="state-visualization__description">
                        <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh nisi, vulputate vitae eros vel, egestas ultricies justo. Nullam et lacus sapien. Fusce accumsan velit eget mauris suscipit ornare. Praesent eget efficitur orci, quis tincidunt leo. Fusce vestibulum luctus interdum. Suspendisse libero nisl, blandit eget lobortis pharetra, vulputate id purus. Etiam molestie fringilla odio semper luctus.
                        </div>
                    </div>
                    <div className="state-visualization-period__wrapper">
                        <div className="visualization-period">
                            <div className="content">
                                <ul>
                                    <li>
                                        <StateTimeVisualizationPeriodButton
                                            value="fiscal_year"
                                            label="Years"
                                            active={this.props.data.visualizationPeriod === 'fiscal_year'}
                                            updateVisualizationPeriod={this.props.updateVisualizationPeriod} />
                                    </li>
                                    <li>
                                        <StateTimeVisualizationPeriodButton
                                            value="quarter"
                                            label="Quarters"
                                            active={this.props.data.visualizationPeriod === 'quarter'}
                                            updateVisualizationPeriod={this.props.updateVisualizationPeriod} />
                                    </li>
                                    <li>
                                        <StateTimeVisualizationPeriodButton
                                            value="month"
                                            label="Months"
                                            active={this.props.data.visualizationPeriod === 'month'}
                                            updateVisualizationPeriod={this.props.updateVisualizationPeriod} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <StateTimeVisualization
                    visualizationPeriod={this.props.visualizationPeriod}
                    loading={this.props.loading}
                    data={this.props.data}
                    width={this.state.visualizationWidth} />
            </section>
        );
    }
}

StateTimeVisualizationSection.propTypes = propTypes;
