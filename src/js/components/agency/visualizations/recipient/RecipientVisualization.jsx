/**
 * RecipientVisualization.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';

import HorizontalChart from 'components/search/visualizations/rank/chart/HorizontalChart';
import ScopeList from './ScopeList';

const propTypes = {
    scope: React.PropTypes.string,
    changeScope: React.PropTypes.func,
    labelSeries: React.PropTypes.array,
    dataSeries: React.PropTypes.array,
    descriptions: React.PropTypes.array
};

const rowHeight = 60;
const axisHeight = 30;
const maxRows = 10;

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
        return (
            <div
                className="agency-section-wrapper"
                id="agency-recipients">
                <div className="agency-callout-description">
                    {`A primary way agencies implement their programs is by awarding money to \
companies, organizations, individuals, or government entities (i.e. state, local, tribal, federal, \
or foreign). Here is a look at who these recipients are and how they rank by award type.`}
                </div>
                <div className="agency-section-title">
                    <h4>Recipients</h4>
                    <hr
                        className="results-divider"
                        ref={(hr) => {
                            this.sectionHr = hr;
                        }} />
                </div>
                <div className="agency-section-content">
                    <ScopeList
                        scope={this.props.scope}
                        changeScope={this.props.changeScope} />

                    <div className="chart-wrapper">
                        <HorizontalChart
                            labelSeries={this.props.labelSeries}
                            dataSeries={this.props.dataSeries}
                            descriptions={this.props.descriptions}
                            height={(maxRows * rowHeight) + axisHeight}
                            width={this.state.visualizationWidth}
                            labelWidth={this.state.labelWidth} />
                    </div>
                </div>
            </div>
        );
    }
}

RecipientVisualization.propTypes = propTypes;
