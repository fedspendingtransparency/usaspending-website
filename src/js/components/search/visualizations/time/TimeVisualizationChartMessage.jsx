/**
 * TimeVisualizationChartMessage.jsx
 * Created by Kevin Li 1/26/17
 */

import React from 'react';

const propTypes = {
    message: React.PropTypes.string
};

export default class TimeVisualizationChartMessage extends React.Component {
    render() {
        return (
            <div className="results-visualization-message">
                {this.props.message}
            </div>
        );
    }
}

TimeVisualizationChartMessage.propTypes = propTypes;
