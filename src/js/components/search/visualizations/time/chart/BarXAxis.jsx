/**
 * BarXAxis.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import BarXAxisItem from './BarXAxisItem';

const defaultProps = {
    padding: {
        left: 0,
        bottom: 0,
        top: 0,
        right: 0
    },
    width: 0
};

const propTypes = {
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    padding: PropTypes.object,
    axisPos: PropTypes.number
};

export default class BarXAxis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            labels: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps, this.props)) {
            this.drawAxis(nextProps);
        }
    }

    parseLabels(props) {
        if (!props.data || props.data.length === 0) {
            return props.data;
        }

        const ref = props.data[0].split(" ");

        if (props.activeLabel) {
            return (
                props.data.map((item) => {
                    // offset the D3 calculated position by the left padding
                    // and put the label in the middle
                    // of the each tick's width to center the text
                    if (item !== props.activeLabel.xValue) {
                        return null;
                    }
                    const xPos = props.scale(item) + (props.scale.bandwidth() / 2);
                    return (<BarXAxisItem
                        x={xPos}
                        y={15}
                        label={item}
                        key={`label-x-${item}`} />);
                })
            );
        }
        else if (ref.length === 1) {
            return (
                props.data.map((item) => {
                    // offset the D3 calculated position by the left padding and put the label in
                    // the middle
                    // of the each tick's width to center the text
                    const xPos = props.scale(item) + (props.scale.bandwidth() / 2);
                    return (<BarXAxisItem
                        x={xPos}
                        y={15}
                        label={item}
                        key={`label-x-${item}`} />);
                })
            );
        }
        else if (ref[0][0] === 'Q') {
            // Quarterly
            return (
                props.data.map((item, index) => {
                    // offset the D3 calculated position by the left padding and put the label in the middle
                    // of the each tick's width to center the text
                    if (index % 4 !== 0) {
                        return null;
                    }

                    const endIndex = index + 3 > props.data.length ? props.data.length - 1 : index + 3;

                    const xPos = (props.scale(item) + props.scale(props.data[endIndex]) + props.scale.bandwidth()) / 2;

                    return (<BarXAxisItem
                        x={xPos}
                        y={15}
                        label={item.split(" ")[1]}
                        key={`label-x-${item}`} />);
                })
            );
        }
        // Monthly View
        return (
            props.data.map((item, index) => {
                // offset the D3 calculated position by the left padding and put the label in the middle
                // of the each tick's width to center the text
                if (index % 12 !== 0) {
                    return null;
                }

                const endIndex = index + 11 > props.data.length ? props.data.length - 1 : index + 11;

                const xPos = (props.scale(item) + props.scale(props.data[endIndex]) + props.scale.bandwidth()) / 2;

                const label = (parseInt(item.split(" ")[1], 10) + 1).toString();

                return (<BarXAxisItem
                    x={xPos}
                    y={15}
                    label={label}
                    key={`label-x-${item}`} />);
            })
        );
    }

    drawAxis(props) {
        if (!props.scale) {
            return;
        }

        // generate the X axis labels
        const labels = this.parseLabels(props);

        let description = '';
        if (props.data.length > 0) {
            description = `The X-axis of the chart, showing a range of time periods from `;
            description += `${props.data[0]} to ${props.data[props.data.length - 1]}`;
        }

        this.setState({
            labels,
            description
        });
    }

    render() {
        // draw the X axis at the zero Y-axis position (multiply by negative to account for the
        // fact that the bar axis group is shifted downward)
        return (
            <g
                className="bar-axis"
                transform={`translate(${this.props.padding.left},${this.props.top})`}>
                <title>X-Axis</title>
                <desc>
                    {this.state.description}
                </desc>
                <line
                    className="x-axis"
                    x1={0}
                    y1={-1 * this.props.axisPos}
                    x2={this.props.width}
                    y2={-1 * this.props.axisPos} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

BarXAxis.propTypes = propTypes;
BarXAxis.defaultProps = defaultProps;
