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
    alternateColor: React.PropTypes.string,
    showOverlay: React.PropTypes.bool,
    showSub: React.PropTypes.bool,
    changeActiveSubfunction: React.PropTypes.func,
    clickable: React.PropTypes.bool,
    chosen: React.PropTypes.string,
    chosenColor: React.PropTypes.string,
    tooltipStyles: React.PropTypes.object,
    toggleTooltipIn: React.PropTypes.func,
    toggleTooltipOut: React.PropTypes.func,
    categoryID: React.PropTypes.number
};

const defaultProps = {
    alternateColor: '',
    chosenColor: ''
};

export default class TreeMapCell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            label: '',
            didProcess: false,
            color: this.props.color,
            textClass: '',
            textColor: this.props.tooltipStyles.defaultStyle.textColor,
            textShadow: this.props.tooltipStyles.defaultStyle.textShadow
        };
        this.mouseIn = this.mouseIn.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.toggleBorders = this.toggleBorders.bind(this);
        this.defaultStyle = this.props.tooltipStyles.defaultStyle;
        this.highlightedStyle = this.props.tooltipStyles.highlightedStyle;
    }

    componentDidMount() {
        this.initialRender(this.props.label, this.props.color, this.props.alternateColor);
    }

    componentWillReceiveProps(props) {
        if (props !== this.props) {
            this.initialRender(props.label, props.color, props.alternateColor);
        }
    }

    componentDidUpdate() {
        if (!this.state.didProcess) {
            this.truncateText();
        }
    }

    initialRender(label, color, altColor) {
        let initialColor = color;
        const top3 = ["Social Security", "National Defense", "Medicare"];
        if (!_.includes(top3, label) && this.props.showOverlay) {
            initialColor = altColor;
        }

        if (this.props.showOverlay === false) {
            initialColor = color;
        }

        this.setState({
            label,
            color: initialColor,
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

    mouseIn(height, width) {
        this.props.toggleTooltipIn(this.props.categoryID, height, width);
        let hoverColor = this.highlightedStyle.color;
        if (this.props.chosen !== null && this.props.clickable && this.props.showSub === true) {
            hoverColor = this.props.chosenColor;
        }
        this.setState({
            textClass: 'chosen',
            color: hoverColor,
            textColor: this.highlightedStyle.textColor,
            textShadow: this.highlightedStyle.textShadow
        });
    }

    mouseOut(height, width) {
        this.props.toggleTooltipOut(height, width);

        this.setState({
            textClass: 'chosen',
            color: this.props.color,
            textColor: this.defaultStyle.textColor,
            textShadow: this.defaultStyle.textShadow
        });
    }

    toggleBorders() {
        const strokeArray = [];
        let strokeColor = "white";
        let strokeOpacity = 0.5;
        if (this.props.showOverlay) {
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
        if (this.props.chosen === this.state.label && this.props.showSub === true) {
            bgColor = this.props.color;
        }
        const width = (this.props.x1 - this.props.x0);
        const height = (this.props.y1 - this.props.y0);
        if (height < 26 || width < 50) {
            labelView = 'none';
        }
        if (height < 40 || width < 60) {
            percentView = 'none';
        }
        const set = {
            selected: this.props.label,
            selectedValue: this.props.value,
            selectedTotal: this.props.total,
            next: null,
            prev: null,
            showSub: true };
        return (
            <g
                transform={`translate(${this.props.x0},${this.props.y0})`}
                onMouseEnter={() => {
                    this.mouseIn(height, width);
                }}
                onMouseLeave={() => {
                    this.mouseOut(height, width);
                }}
                onClick={() => {
                    if (this.props.clickable === true) {
                        this.props.changeActiveSubfunction(set);
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
                        display: labelView,
                        fill: this.state.textColor,
                        textShadow: this.state.textShadow
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
                        display: percentView,
                        fill: this.state.textColor,
                        textShadow: this.state.textShadow
                    }}>
                    {parseFloat((this.props.value / this.props.total) * 100).toFixed(1)}%
                </text>
            </g>
        );
    }
}
TreeMapCell.propTypes = propTypes;
TreeMapCell.defaultProps = defaultProps;
