/**
 * BudgetLineHorizontal.jsx
 * Created by Emily Gullo 03/02/2017
 **/

import React from 'react';

const propTypes = {
    width: React.PropTypes.number
};

export default class BudgetLineHorizontal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pathLeft: '',
            pathRight: '',
            textPos: 0,
            textWidth: 125
        };
    }
    componentWillReceiveProps(nextProps) {
        this.generatePath(nextProps);
    }

    generatePath(props) {
        const textPos = props.width / 2;

        // add 15 px padding on each side
        const textLeft = textPos - (this.state.textWidth / 2) - 15;
        const textRight = textPos + (this.state.textWidth / 2) + 15;

        const pathLeft = `1,30 1,15 ${textLeft},15`;
        const pathRight = `${textRight},15 ${props.width},15 ${props.width},30`;

        this.setState({
            pathLeft,
            pathRight,
            textPos
        });
    }
    render() {
        return (<svg className="budget-line horizontal">
            <g
                className="budget-label-group"
                transform="translate(0, 0)">
                <polyline
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    className="label-line"
                    points={this.state.pathLeft} />
                <polyline
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    className="label-line"
                    points={this.state.pathRight} />
                <g
                    className="budget-label"
                    transform="translate(0, 20)">
                    <text
                        className="horizontal-budget-label"
                        transform="translate(0, 0)"
                        fill="white"
                        x={this.state.textPos}
                        y={0}
                        textAnchor="middle">
                        $2.74 trillion
                    </text>
                </g>
            </g>
        </svg>);
    }
}

BudgetLineHorizontal.propTypes = propTypes;
