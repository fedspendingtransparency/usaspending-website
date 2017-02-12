/**
 * RankVisualizationChartMessage.jsx
 * Created by Kevin Li 2/9/17
 */

import React from 'react';

const propTypes = {
    message: React.PropTypes.string
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
