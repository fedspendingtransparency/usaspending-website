/**
 * BudgetFunctionCell.jsx
 * Created by michaelbray on 5/25/17.
 */

import React from 'react';
import _ from 'lodash';

const propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.number,
    total: React.PropTypes.number,
    x0: React.PropTypes.number,
    x1: React.PropTypes.number,
    y0: React.PropTypes.number,
    y1: React.PropTypes.number,
    functionID: React.PropTypes.number,
    color: React.PropTypes.string,
    strokeColor: React.PropTypes.string,
    strokeOpacity: React.PropTypes.number,
    toggleSubfunction: React.PropTypes.func,
    toggleTooltipIn: React.PropTypes.func,
    toggleTooltipOut: React.PropTypes.func,
    textColor: React.PropTypes.string,
    textShadow: React.PropTypes.string,
    textClass: React.PropTypes.string
};

export default class BudgetFunctionCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            didProcess: false
        };
    }

    componentDidMount() {
        this.initialRender(this.props.label);
    }

    componentWillReceiveProps(props) {
        this.initialRender(props.label);
    }

    componentDidUpdate() {
        if (!this.state.didProcess) {
            this.truncateText();
        }
    }

    initialRender(label) {
        this.setState({
            label,
            didProcess: false
        });
    }

    truncateText() {
        const labelWidth = this.props.x1 - this.props.x0;

        // determine if the text needs to be truncated
        // get the current label width
        const fullWidth = this.svgText.getBBox().width;

        // accounting for 15px margin
        const maxWidth = labelWidth / 1.5;
        let maxChars = 0;

        let truncatedLabel = this.props.label;

        // make sure that the max width is positive
        if (fullWidth > maxWidth && maxWidth > 0) {
            // the label is going to exceed the available space, truncate it
            // calculate the averge character width
            const avgCharWidth = (fullWidth / this.props.label.length);

            // determine how many characters can fit in the available space
            maxChars = Math.floor((maxWidth) / avgCharWidth);

            // truncate the label
            truncatedLabel = _.truncate(this.props.label, {
                length: maxChars
            });
        }

        this.setState({
            label: truncatedLabel,
            didProcess: true
        });
    }

    render() {
        let labelView = 'block';
        let percentView = 'block';

        const width = (this.props.x1 - this.props.x0);
        const height = (this.props.y1 - this.props.y0);
        if (height < 26 || width < 50) {
            labelView = 'none';
        }
        if (height < 40 || width < 60) {
            percentView = 'none';
        }

        return (
            <g
                transform={`translate(${this.props.x0},${this.props.y0})`}
                onMouseEnter={() => {
                    this.props.toggleTooltipIn(this.props.functionID);
                }}
                onMouseLeave={() => {
                    this.props.toggleTooltipOut();
                }}
                onClick={() => {
                    this.props.toggleSubfunction(this.props.functionID);
                }}>
                <rect
                    className="tile"
                    width={width}
                    height={height}
                    style={{
                        fill: this.props.color,
                        stroke: this.props.strokeColor,
                        strokeOpacity: this.props.strokeOpacity,
                        strokeWidth: "2px",
                        padding: "10px"
                    }} />
                <text
                    className={`category ${this.props.textClass}`}
                    x={(width / 2)}
                    y={height / 2}
                    width={width}
                    textAnchor="middle"
                    ref={(text) => {
                        this.svgText = text;
                    }}
                    style={{
                        display: labelView,
                        fill: this.props.textColor,
                        textShadow: this.props.textShadow
                    }}>
                    {this.state.label}
                </text>
                <text
                    className={`value ${this.props.textClass}`}
                    x={(width / 2) - 2}
                    y={(height / 2) + 20}
                    width={width}
                    textAnchor="middle"
                    style={{
                        display: percentView,
                        fill: this.props.textColor,
                        textShadow: this.props.textShadow
                    }}>
                    {parseFloat((this.props.value / this.props.total) * 100).toFixed(1)}%
                </text>
            </g>
        );
    }
}

BudgetFunctionCell.propTypes = propTypes;
