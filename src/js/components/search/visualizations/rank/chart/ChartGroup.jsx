/**
 * ChartGroup.jsx
 * Created by Kevin Li 2/7/17
 */

import React from 'react';

export default class ChartGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: ''
        };
    }

    componentDidMount() {
        this.setState({
            label: this.props.label
        }, () => {
            console.log(this.svgText.getBBox().width);
        });
    }

    componentDidUpdate() {

    }

    render() {
        let backgroundClass = 'odd';
        if (this.props.index % 2 === 0) {
            backgroundClass = 'even';
        }

        return (
            <g
                className="chart-group"
                transform={`translate(0,${this.props.index * this.props.height})`}>

                <rect
                    className={`group-background ${backgroundClass}`}
                    x={0}
                    y={0}
                    width={this.props.width}
                    height={this.props.height} />

                <g transform="translate(12,34)">
                    <text
                        className="group-label"
                        ref={(text) => {
                            this.svgText = text;
                        }}>
                        {this.state.label}
                    </text>
                </g>
            </g>
        );
    }
}
