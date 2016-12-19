/**
 * BarXAxis.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';
import * as d3 from 'd3';

import BarXAxisItem from './BarXAxisItem';

const defaultProps = {
    paddingX: 0,
    paddingY: 0,
    paddingTop: 0,
    paddingRight: 0
};

const propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    paddingX: React.PropTypes.number,
    paddingY: React.PropTypes.number
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
        // calculate the ticks
        const axisWidth = this.props.width - this.props.paddingX - this.props.paddingRight;
        const labels = this.props.data.map((item, i) => {
            const xPos = this.props.paddingX + ((axisWidth / (this.props.data.length - 1)) * i);
            return (<BarXAxisItem
                x={xPos}
                y={this.props.height + this.props.paddingTop - 30}
                label={item.x}
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
                    x1={this.props.paddingX}
                    y1={this.props.height - this.props.paddingY + this.props.paddingTop}
                    x2={this.props.width - this.props.paddingRight}
                    y2={this.props.height - this.props.paddingY + this.props.paddingTop} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

BarYAxis.propTypes = propTypes;
BarYAxis.defaultProps = defaultProps;
