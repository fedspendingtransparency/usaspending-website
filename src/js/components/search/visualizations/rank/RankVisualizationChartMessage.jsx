/**
 * RankVisualizationChartMessage.jsx
 * Created by Kevin Li 2/9/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    message: PropTypes.string
};

export default class RankVisualizationChartMessage extends React.Component {
    render() {
        return (
            <div className="results-visualization-message">
                {this.props.message}
            </div>
        );
    }
}

RankVisualizationChartMessage.propTypes = propTypes;
