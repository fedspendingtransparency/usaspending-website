/**
 * SankeyVisualization.jsx
 * Created by Kevin Li 4/18/17
 */

import React from 'react';

import SankeyMessage from './components/SankeyMessage';
import SankeyVisualizationHorizontal from './SankeyVisualizationHorizontal';

const propTypes = {
    fyAvailable: React.PropTypes.bool
};

export default class SankeyVisualization extends React.Component {
    determineOutput() {
        if (!this.props.fyAvailable) {
            // data is not available, don't show the Sankey
            return (<SankeyMessage
                message="No data available for the current fiscal year." />);
        }

        return (<SankeyVisualizationHorizontal {...this.props} />);
    }
    render() {
        const output = this.determineOutput();
        return output;
    }
}

SankeyVisualization.propTypes = propTypes;
