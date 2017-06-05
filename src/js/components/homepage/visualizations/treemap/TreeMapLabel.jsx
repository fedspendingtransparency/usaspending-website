/**
 * TreeMapLabel.jsx
 * Created by michaelbray on 6/2/17.
 */

import React from 'react';

const propTypes = {
    labelWidth: React.PropTypes.number,
    labelPadding: React.PropTypes.number,
    labelDistance: React.PropTypes.number,
    currentX: React.PropTypes.number,
    graphWidth: React.PropTypes.number
};

const defaultProps = {
    labelWidth: 0,
    labelPadding: 0,
    labelDistance: 0,
    currentY: 0,
    currentX: 0,
    graphHeight: 0,
    graphWidth: 0,
    size: 'small'
};

export default class TreeMapLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: null
        };

        this.generatePoly = this.generatePoly.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.generatePoly(nextProps);
    }

    generatePoly(props) {
        const leftLabelPos = props.labelWidth - props.labelPadding;
        // calculate the label paths
        let currentLabelPath = '';

        // Add and subtract 1 from left / right edges for edges to be visible on non-retina screens
        // start at the top left edge of the bar
        currentLabelPath += `${props.currentX + 1},${leftLabelPos}`;
        // move up the specified amount
        currentLabelPath += ` ${props.currentX + 1},${leftLabelPos -
        props.labelDistance}`;
        // go to the right of the bar
        currentLabelPath += ` ${props.graphWidth - 1},${leftLabelPos -
        props.labelDistance}`;
        // go down to top right edge
        currentLabelPath += ` ${props.graphWidth - 1},${leftLabelPos}`;

        this.setState({
            current: currentLabelPath
        });
    }

    render() {
        return (<polyline
            fill="none"
            stroke="rgba(174,176,181,0.8)"
            strokeWidth="1"
            className="label-line"
            points={this.state.current} />);
    }
}

TreeMapLabel.propTypes = propTypes;
TreeMapLabel.defaultProps = defaultProps;
