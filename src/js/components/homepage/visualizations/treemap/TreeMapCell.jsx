/**
 * TreeMapCell.jsx
 * Created by Emily Gullo 03/15/2017
 **/

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
    color: React.PropTypes.string,
    toggleTooltip: React.PropTypes.func,
    showOverlay: React.PropTypes.bool,
    toggleSubfunction: React.PropTypes.func,
    clickable: React.PropTypes.bool,
    chosen: React.PropTypes.string,
    chosenColor: React.PropTypes.string
};

export default class TreeMapCell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            label: '',
            didProcess: false,
            color: this.props.color,
            textClass: ''
        };

        this.mouseEvent = this.mouseEvent.bind(this);
        this.toggleBorders = this.toggleBorders.bind(this);
    }

    componentDidMount() {
        this.initialRender(this.props.label);
    }

    componentWillReceiveProps(props) {
        this.initialRender(props.label, props.color);
    }

    componentDidUpdate() {
        if (!this.state.didProcess) {
            this.truncateText();
        }
    }

    initialRender(label, color, hoverColor) {
        let c = this.props.color;
        let d = '';
        if (color) {
            c = color;
        }
        if (hoverColor) {
            d = hoverColor;
        }
        this.setState({
            label,
            color: c,
            hoverColor: d,
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

    mouseEvent(set) {
        let newSet = {};
        const width = (this.props.x1 - this.props.x0);
        const height = (this.props.y1 - this.props.y0);
        let hoverColor = "#F2B733";
        if (this.props.chosen !== null && this.props.clickable) {
            hoverColor = this.props.chosenColor;
        }
        if (set === 'mouseIn') {
            newSet = {
                cat: this.props.label,
                value: this.props.value,
                bgColor: hoverColor,
                textClass: 'chosen',
                xStart: this.props.x0,
                yStart: this.props.y0,
                width,
                height,
                total: this.props.total
            };
        }
        else {
            newSet = {
                cat: 'none',
                value: '',
                bgColor: this.props.color,
                textClass: '',
                xStart: this.props.x0,
                yStart: this.props.y0,
                width,
                height,
                total: this.props.total
            };
        }

        this.props.toggleTooltip(newSet);
        this.setState({
            color: newSet.bgColor,
            textClass: newSet.textClass
        });
    }

    toggleBorders() {
        const strokeArray = [];
        let strokeColor = "white";
        let strokeOpacity = 0.5;
        if (this.props.showOverlay === true) {
            if (this.props.label === "Social Security" ||
                this.props.label === "National Defense" ||
                this.props.label === "Medicare") {
                strokeColor = "#F2B733";
                strokeOpacity = 1;
            }
        }
        strokeArray.push(strokeColor);
        strokeArray.push(strokeOpacity);
        return strokeArray;
    }


    render() {
        let labelView = 'block';
        let percentView = 'block';
        let bgColor = this.state.color;
        if (this.props.chosen === this.state.label) {
            bgColor = this.props.chosenColor;
        }
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
                    this.mouseEvent('mouseIn');
                }}
                onMouseLeave={() => {
                    this.mouseEvent('mouseOut');
                }}
                onClick={() => {
                    if (this.props.clickable === true) {
                        this.props.toggleSubfunction(
                            this.props.label, this.props.value, this.props.total);
                    }
                }}>
                <rect
                    className="tile"
                    width={width}
                    height={height}
                    style={{
                        fill: bgColor,
                        stroke: this.toggleBorders()[0],
                        strokeOpacity: this.toggleBorders()[1],
                        strokeWidth: "2px",
                        padding: "10px"
                    }} />
                <text
                    className={`category ${this.state.textClass}`}
                    x={(width / 2)}
                    y={height / 2}
                    width={width}
                    textAnchor="middle"
                    ref={(text) => {
                        this.svgText = text;
                    }}
                    style={{
                        display: labelView
                    }}>
                    {this.state.label}
                </text>
                <text
                    className={`value ${this.state.textClass}`}
                    x={(width / 2) - 2}
                    y={(height / 2) + 20}
                    width={width}
                    textAnchor="middle"
                    style={{
                        display: percentView
                    }}>
                    {parseFloat((this.props.value / this.props.total) * 100).toFixed(1)}%
                </text>
            </g>
        );
    }
}
TreeMapCell.propTypes = propTypes;
