/**
 * AwardTypeCell.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, truncate } from 'lodash';

const propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    total: PropTypes.number,
    x0: PropTypes.number,
    x1: PropTypes.number,
    y0: PropTypes.number,
    awardType: PropTypes.string,
    color: PropTypes.string,
    strokeColor: PropTypes.string,
    strokeOpacity: PropTypes.number,
    toggleTooltipIn: PropTypes.func,
    toggleTooltipOut: PropTypes.func,
    opacity: PropTypes.number,
    textColor: PropTypes.string,
    textClass: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    labelView: PropTypes.string,
    percentView: PropTypes.string
};

export default class AwardTypeCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            didProcess: false
        };

        this.toggleTooltipIn = this.toggleTooltipIn.bind(this);
        this.toggleTooltipOut = this.props.toggleTooltipOut.bind(this);
    }

    componentDidMount() {
        this.initialRender(this.props.label);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.initialRender(this.props.label);
        }
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

    toggleTooltipIn() {
        this.props.toggleTooltipIn(this.props.awardType);
    }

    truncateText() {
        const labelWidth = this.props.x1 - this.props.x0;

        // determine if the text needs to be truncated
        // get the current label width

        // We have to wrap this in a try/catch to prevent Firefox from dying when trying
        // to compute the bounded box of small SVG elements
        let fullWidth = 0;
        try {
            fullWidth = this.svgText.getBBox().width;
        }
        catch (e) {
            // Firefox can't compute bbox
        }

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
            truncatedLabel = truncate(this.props.label, {
                length: maxChars
            });
        }

        this.setState({
            label: truncatedLabel,
            didProcess: true
        });
    }

    render() {
        return (
            <g
                transform={`translate(${this.props.x0},${this.props.y0})`}
                onMouseEnter={this.toggleTooltipIn}
                onMouseLeave={this.toggleTooltipOut}>
                <rect
                    className="tile"
                    width={this.props.width}
                    height={this.props.height}
                    style={{
                        fill: this.props.color,
                        stroke: this.props.strokeColor,
                        strokeOpacity: this.props.strokeOpacity,
                        strokeWidth: "2px",
                        padding: "10px"
                    }} />
                <text
                    className={`category ${this.props.textClass}`}
                    x={(this.props.width / 2)}
                    y={this.props.height / 2}
                    width={this.props.width}
                    textAnchor="middle"
                    ref={(text) => {
                        this.svgText = text;
                    }}
                    style={{
                        display: this.props.labelView,
                        fill: this.props.textColor,
                        opacity: this.props.opacity
                    }}>
                    {this.state.label}
                </text>
            </g>
        );
    }
}

AwardTypeCell.propTypes = propTypes;
