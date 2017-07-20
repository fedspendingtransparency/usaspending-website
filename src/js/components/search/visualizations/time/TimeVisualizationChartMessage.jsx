/**
 * TimeVisualizationChartMessage.jsx
 * Created by Kevin Li 1/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    message: PropTypes.string
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
