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

    componentWillReceiveProps() {
        this.generatePoly();
    }

    generatePoly() {
        const leftLabelPos = this.props.labelWidth - this.props.labelPadding;
        // calculate the label paths
        let currentLabelPath = '';

        // start at the top left edge of the bar
        currentLabelPath += `${this.props.currentX},${leftLabelPos}`;
        // move up the specified amount
        currentLabelPath += ` ${this.props.currentX},${leftLabelPos -
        this.props.labelDistance}`;
        // go to the right of the bar
        currentLabelPath += ` ${this.props.graphWidth},${leftLabelPos -
        this.props.labelDistance}`;
        // go down to top right edge
        currentLabelPath += ` ${this.props.graphWidth},${leftLabelPos}`;

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
