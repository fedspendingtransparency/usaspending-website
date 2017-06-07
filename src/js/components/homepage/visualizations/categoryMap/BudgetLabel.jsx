/**
 * BudgetLabel.jsx
 * Created by Emily Gullo 03/09/2017
 **/

import React from 'react';

const propTypes = {
    labelWidth: React.PropTypes.number,
    labelPadding: React.PropTypes.number,
    labelDistance: React.PropTypes.number,
    currentY: React.PropTypes.number,
    currentX: React.PropTypes.number,
    graphHeight: React.PropTypes.number,
    graphWidth: React.PropTypes.number,
    size: React.PropTypes.string
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

export default class BudgetLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: null
        };

        this.generatePoly = this.generatePoly.bind(this);
    }
    componentWillReceiveProps(props) {
        this.generatePoly(props.size);
    }

    generatePoly(size) {
        const leftLabelPos = this.props.labelWidth - this.props.labelPadding;
        // calculate the label paths
        let currentLabelPath = '';
        if (size === 'small') {
            // start at the top of the bar
            currentLabelPath += `${leftLabelPos} ,${this.props.currentY}`;
            // move left the specified amount
            currentLabelPath += ` ${leftLabelPos -
                this.props.labelDistance},${this.props.currentY}`;
            // go to the bottom of the bar
            currentLabelPath += ` ${leftLabelPos -
                this.props.labelDistance},${this.props.graphHeight}`;
            // go to the edge of the bar
            currentLabelPath += ` ${leftLabelPos},${this.props.graphHeight}`;
            // come back
            currentLabelPath += ` ${leftLabelPos -
                this.props.labelDistance},${this.props.graphHeight}`;
        }
        if (size === 'large') {
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
        }

        this.setState({
            current: currentLabelPath
        });
    }

    render() {
        return (<polyline
            fill="none"
            stroke="#8C9097"
            strokeWidth="1"
            className="label-line"
            points={this.state.current} />);
    }
}
BudgetLabel.propTypes = propTypes;
BudgetLabel.defaultProps = defaultProps;
