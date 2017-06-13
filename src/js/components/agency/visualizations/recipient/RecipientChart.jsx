/**
 * RecipientChart.jsx
 * Created by Kevin Li 6/13/17
 */

import React from 'react';

import HorizontalChart from 'components/search/visualizations/rank/chart/HorizontalChart';

const propTypes = {
    labelSeries: React.PropTypes.array,
    dataSeries: React.PropTypes.array,
    descriptions: React.PropTypes.array,
    width: React.PropTypes.number,
    labelWidth: React.PropTypes.number
};

const rowHeight = 60;
const axisHeight = 30;
const maxRows = 10;

export default class RecipientChart extends React.Component {
    render() {
        return (
            <div>
                <HorizontalChart
                    labelSeries={this.props.labelSeries}
                    dataSeries={this.props.dataSeries}
                    descriptions={this.props.descriptions}
                    height={(maxRows * rowHeight) + axisHeight}
                    width={this.props.width}
                    labelWidth={this.props.labelWidth} />
            </div>
        );
    }
}

RecipientChart.propTypes = propTypes;
