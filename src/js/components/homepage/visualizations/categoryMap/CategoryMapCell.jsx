/**
 * CategoryMapCell.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import _ from 'lodash';

const propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.number,
    x0: React.PropTypes.number,
    x1: React.PropTypes.number,
    y0: React.PropTypes.number,
    y1: React.PropTypes.number,
    categoryID: React.PropTypes.number,
    color: React.PropTypes.string,
    tooltipStyles: React.PropTypes.object,
    toggleTooltipIn: React.PropTypes.func,
    toggleTooltipOut: React.PropTypes.func
};

export default class CategoryMapCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            didProcess: false,
            color: this.props.color,
            textColor: this.props.tooltipStyles.defaultStyle.textColor,
        };

        this.mouseIn = this.mouseIn.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.defaultStyle = this.props.tooltipStyles.defaultStyle;
        this.highlightedStyle = this.props.tooltipStyles.highlightedStyle;
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
        }, () => {
            this.forceUpdate();
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
        this.setState({
            color: this.highlightedStyle.color,
            textColor: this.highlightedStyle.textColor
        });
    }

    mouseOut(height, width) {
        this.props.toggleTooltipOut(this.props.categoryID, height, width);
        this.setState({
            color: this.props.color,
            textColor: this.defaultStyle.textColor
        });
    }

    render() {
        const width = (this.props.x1 - this.props.x0);
        const height = (this.props.y1 - this.props.y0);
        let labelView = 'block';
        let percentView = 'block';
        if (height < 20 || width < 50) {
            labelView = 'none';
        }
        if (height < 40 || width < 60) {
            percentView = 'none';
        }
        let labelY = height / 2;
        let percentY = (height / 2) + 20;
        if (window.innerWidth < 768 && height < 60) {
            labelY = (height / 3) + 5;
            percentY = (height / 3) + 23;
        }
        return (
            <g
                transform={`translate(${this.props.x0},${this.props.y0})`}
                onMouseOver={() => {
                    this.mouseIn(height, width);
                }}
                onMouseLeave={() => {
                    this.mouseOut(height, width);
                }}>
                <rect
                    className="tile"
                    width={width}
                    height={height}
                    style={{
                        fill: this.state.color,
                        stroke: "#5b616b",
                        strokeWidth: "2px",
                        padding: "10px"
                    }} />
                <text
                    className="category"
                    x={width / 2}
                    y={labelY}
                    width={width}
                    textAnchor="middle"
                    ref={(text) => {
                        this.svgText = text;
                    }}
                    style={{
                        display: labelView,
                        fill: this.state.textColor
                    }}>
                    {this.state.label}
                </text>
                <text
                    className="value"
                    x={(width / 2)}
                    y={percentY}
                    width={width}
                    textAnchor="middle"
                    style={{
                        display: percentView,
                        fill: this.state.textColor
                    }}>
                    {this.props.value}%
                </text>
            </g>
        );
    }
}
CategoryMapCell.propTypes = propTypes;
