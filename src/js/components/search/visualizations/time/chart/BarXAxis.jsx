/**
 * BarXAxis.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';
import * as d3 from 'd3';

import BarXAxisItem from './BarXAxisItem';

const defaultProps = {
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 0
};

const propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    paddingLeft: React.PropTypes.number,
    paddingRight: React.PropTypes.number,
    paddingBottom: React.PropTypes.number
};

export default class BarYAxis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: []
        };
    }
    componentDidMount() {
        this.drawAxis();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.drawAxis();
        }
    }

    drawAxis() {
        if (!this.props.scale) {
            return;
        }

        // calculate the ticks
        const yPos = this.props.height + this.props.paddingTop - 30;

        const labels = this.props.data.map((item) => {
            // offset the D3 calculated position by the left padding and put the label in the middle
            // of the each tick's width to center the text
            const xPos = this.props.scale(item.x) + this.props.paddingLeft + (this.props.scale.bandwidth() / 2);

            return (<BarXAxisItem
                x={xPos}
                y={yPos}
                label={`FY ${item.x}`}
                key={`label-x-${item.x}`} />);
        });

        this.setState({
            labels
        });
    }

    render() {
        return (
            <g className="bar-axis">
                <title>X-Axis</title>
                <desc>
                    The X-axis of the chart, showing a range of time periods from XXX to XXX
                </desc>
                <line
                    className="x-axis"
                    x1={this.props.paddingLeft}
                    y1={this.props.height - this.props.paddingBottom + this.props.paddingTop}
                    x2={this.props.width - this.props.paddingRight}
                    y2={this.props.height - this.props.paddingBottom + this.props.paddingTop} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

BarYAxis.propTypes = propTypes;
BarYAxis.defaultProps = defaultProps;
