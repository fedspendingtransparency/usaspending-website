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
    graphHeight: React.PropTypes.number
};

export default class BudgetLabel extends React.Component {
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
        // start at the top of the current bar
        currentLabelPath += `${leftLabelPos} ,${this.props.currentY}`;
        // move left the specified amount
        currentLabelPath += ` ${leftLabelPos - this.props.labelDistance},${this.props.currentY}`;
        // go to the bottom of the current bar
        currentLabelPath += ` ${leftLabelPos - this.props.labelDistance},${this.props.graphHeight}`;
        // go to the edge of the bar
        currentLabelPath += ` ${leftLabelPos},${this.props.graphHeight}`;
        // come back
        currentLabelPath += ` ${leftLabelPos - this.props.labelDistance},${this.props.graphHeight}`;

        this.setState({
            current: currentLabelPath
        });
    }

    render() {
        return (<polyline
            fill="none"
            stroke="white"
            strokeWidth="1"
            className="label-line"
            points={this.state.current} />);
    }
}
BudgetLabel.propTypes = propTypes;
