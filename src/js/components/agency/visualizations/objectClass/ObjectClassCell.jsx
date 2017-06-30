/**
 * ObjectClassCell.jsx
 * Created by michaelbray on 6/8/17.
 */

import React from 'react';
import { truncate } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.number,
    total: React.PropTypes.number,
    x0: React.PropTypes.number,
    x1: React.PropTypes.number,
    y0: React.PropTypes.number,
    objectClassID: React.PropTypes.string,
    color: React.PropTypes.string,
    strokeColor: React.PropTypes.string,
    strokeOpacity: React.PropTypes.number,
    toggleMinorObjectClass: React.PropTypes.func,
    toggleTooltipIn: React.PropTypes.func,
    toggleTooltipOut: React.PropTypes.func,
    opacity: React.PropTypes.number,
    textColor: React.PropTypes.string,
    textClass: React.PropTypes.string,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    labelView: React.PropTypes.string,
    percentView: React.PropTypes.string,
    clickable: React.PropTypes.bool
};

const defaultProps = {
    clickable: true
};

export default class ObjectClassCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            didProcess: false
        };

        this.toggleTooltipIn = this.toggleTooltipIn.bind(this);
        this.toggleTooltipOut = this.props.toggleTooltipOut.bind(this);
        this.toggleMinorObjectClass = this.toggleMinorObjectClass.bind(this);
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

    toggleTooltipIn() {
        this.props.toggleTooltipIn(this.props.objectClassID);
    }

    toggleMinorObjectClass() {
        if (this.props.clickable) {
            this.props.toggleMinorObjectClass(this.props.objectClassID);
        }
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
                onMouseLeave={this.toggleTooltipOut}
                onClick={this.toggleMinorObjectClass}>
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
                <text
                    className={`value ${this.props.textClass}`}
                    x={(this.props.width / 2) - 2}
                    y={(this.props.height / 2) + 20}
                    width={this.props.width}
                    textAnchor="middle"
                    style={{
                        display: this.props.percentView,
                        fill: this.props.textColor,
                        opacity: this.props.opacity
                    }}>
                    {MoneyFormatter.calculateTreemapPercentage(this.props.value, this.props.total)}
                </text>
            </g>
        );
    }
}

ObjectClassCell.propTypes = propTypes;
ObjectClassCell.defaultProps = defaultProps;
