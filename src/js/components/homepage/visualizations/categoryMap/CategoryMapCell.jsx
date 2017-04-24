/**
 * CategoryMapCell.jsx
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
    toggleTooltip: React.PropTypes.func
};

export default class CategoryMapCell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            label: '',
            didProcess: false,
            color: this.props.color
        };

        this.mouseIn = this.mouseIn.bind(this);
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

    mouseIn(label, value, bgColor, xStart, yStart, width, height) {
        this.props.toggleTooltip(label, value, xStart, yStart, width, height);
        this.setState({
            color: bgColor
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
        if (window.innerWidth < 480 && height < 60) {
            labelY = (height / 3) + 5;
            percentY = (height / 3) + 23;
        }
        return (
            <g
                transform={`translate(${this.props.x0},${this.props.y0})`}
                onMouseOver={() => {
                    this.mouseIn(
                        this.props.label,
                        this.props.value,
                        "#F2B733",
                        this.props.x0,
                        this.props.y0,
                        width,
                        height
                    );
                }}
                onMouseLeave={() => {
                    this.mouseIn(
                        'none',
                        '',
                        this.props.color,
                        this.props.x0,
                        this.props.y0,
                        width,
                        height
                    );
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
                        display: labelView
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
                        display: percentView
                    }}>
                    {parseFloat((this.props.value / this.props.total) * 100).toFixed(1)}%
                </text>
            </g>
        );
    }
}
CategoryMapCell.propTypes = propTypes;
