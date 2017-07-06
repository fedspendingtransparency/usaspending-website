/**
 * SankeyVisualization.jsx
 * Created by Kevin Li 4/18/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import SankeyMessage from './components/SankeyMessage';
import SankeyVisualizationHorizontal from './SankeyVisualizationHorizontal';
import SankeyVisualizationVertical from './SankeyVisualizationVertical';

const propTypes = {
    width: PropTypes.number,
    fyAvailable: PropTypes.bool
};

export default class SankeyVisualization extends React.Component {
    determineOutput() {
        if (!this.props.fyAvailable) {
            // data is not available, don't show the Sankey
            return (<SankeyMessage
                message="No data available for the current fiscal year." />);
        }

        if (this.props.width < 720) {
            return (<SankeyVisualizationVertical {...this.props} />);
        }
        return (<SankeyVisualizationHorizontal {...this.props} />);
    }
    render() {
        const output = this.determineOutput();
        return output;
    }
}

SankeyVisualization.propTypes = propTypes;
