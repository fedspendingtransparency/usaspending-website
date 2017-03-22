/**
 * TreeMap.jsx
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
    color: React.PropTypes.string
};

export default class Cell extends React.Component {

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
            // the label changed and needs to be reprocessed
            this.truncateText();
        }
    }

    initialRender(label) {
        // We can only access the label width after we have rendered the full text due to the
        // variable widths of characters in non-monospaced fonts.
        // In this function, we trigger an initial render of the full text, then we perform the
        // calculations to test if truncation is necessary; if so, we'll re-render (this is
        // automatically triggered when we change the label state value).
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

        // there's a 12px margin on both sides of the label space
        const maxWidth = labelWidth / 1.5;
        let maxChars = 0;

        let truncatedLabel = this.props.label;

        // make sure that the max width is positive
        if (fullWidth > maxWidth && maxWidth > 0) {
            // the label is going to exceed the available space, truncate it
            // determine how much of the text we can keep

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
        const width = (this.props.x1 - this.props.x0);
        const height = (this.props.y1 - this.props.y0);
        return (
            <g
                transform={`translate(${this.props.x0},${this.props.y0})`}>
                <rect
                    className="tile"
                    width={width}
                    height={height}
                    style={{
                        fill: this.props.color
                    }} />
                <text
                    className="category"
                    x={(width / 2)}
                    y={height / 2}
                    width={width}
                    textAnchor="middle"
                    ref={(text) => {
                        this.svgText = text;
                    }}>
                    {this.state.label}
                </text>
                <text
                    className="value"
                    x={(width / 2) - 2}
                    y={(height / 2) + 20}
                    width={width}
                    textAnchor="middle">
                    {Math.round((this.props.value / this.props.total) * 100)}%
                </text>
            </g>
        );
    }
}
Cell.propTypes = propTypes;
